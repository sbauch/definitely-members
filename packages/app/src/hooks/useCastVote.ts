import { TransactionReceipt } from "@ethersproject/providers";
import { BigNumber } from "ethers";

import { useAccount, useWaitForTransaction } from "wagmi";
import { GOVERNANCE_CONTRACT, MEMBERSHIPS_CONTRACT } from "../utils/contracts";

import { useGlobalEntryContractWrite } from "./useGlobalEntryContractWrite";
import { useGlobalEntryPrepareContractWrite } from "./useGlobalEntryPrepareContractWrite";
import { useHasVoted } from "./useHasVoted";
import { useMemberQuery } from "./useMemberQuery";

export enum VoteType {
  Against,
  For,
  Abstain,
}

type Options = {
  vote: VoteType;
  proposalId: string;
  onPrepareError?: (error: Error) => void;
  onTxSuccess?: (data: TransactionReceipt) => void;
  onTxError?: (error: Error) => void;
};

export function useCastVote({
  onPrepareError,
  onTxSuccess,
  onTxError,
  proposalId,
  vote,
}: Options) {
  const { address } = useAccount();
  const { data: hasVoted, refetch } = useHasVoted(
    proposalId,
    address as `0x${string}`
  );
  const { data: membership } = useMemberQuery(address || "0x");

  const { config } = useGlobalEntryPrepareContractWrite({
    ...GOVERNANCE_CONTRACT,
    functionName: "castVote",
    args: [BigNumber.from(proposalId), vote],
    overrides: {
      customData: {
        authorizer: address,
        nftContract: MEMBERSHIPS_CONTRACT.address,
        nftTokenId: membership?.tokenId,
        nftChainId: process.env.NEXT_PUBLIC_CHAIN_ID,
      },
    },
    enabled: Boolean(
      vote && proposalId && membership?.tokenId && hasVoted !== true
    ),
    onError: (error) => {
      if (onPrepareError) {
        onPrepareError(error);
      }
    },
    onSuccess: (data) => {},
  });

  const castVote = useGlobalEntryContractWrite(config as any);
  const castVoteTx = useWaitForTransaction({
    confirmations: 10,
    hash: castVote.data?.hash as `0x${string}`,
    enabled: !!castVote?.data?.hash,
    chainId: 7700,
    onSuccess: (data) => {
      refetch();
      onTxSuccess?.(data);
    },
    onError: (error) => {
      if (onTxError) {
        onTxError(error);
      }
    },
  });

  return {
    hasVoted,
    castVote,
    castVoteTx,
  };
}
