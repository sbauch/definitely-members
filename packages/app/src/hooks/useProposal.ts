import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";
import { GOVERNANCE_CONTRACT } from "../utils/contracts";

export type Proposal = {
  id: string;
  description: string;
  abstainVotes: number;
  againstVotes: number;
  forVotes: number;
  canceled: boolean;
  executed: boolean;
  startBlock: BigNumber;
  endBlock: BigNumber;
  eta: BigNumber;
  proposer: `0x${string}`;
};

export function useProposal(proposalId: string | undefined) {
  const { data, ...query } = useContractRead({
    ...GOVERNANCE_CONTRACT,
    functionName: "proposals",
    args: [BigNumber.from(proposalId || 0)],
    enabled: Boolean(proposalId),
    chainId: 7700,
  });

  return {
    data: {
      ...data,
      id: data?.id?.toString(),
      abstainVotes: data?.abstainVotes?.toNumber(),
      againstVotes: data?.againstVotes?.toNumber(),
      forVotes: data?.forVotes?.toNumber(),
    } as Proposal,
    ...query,
  };
}
