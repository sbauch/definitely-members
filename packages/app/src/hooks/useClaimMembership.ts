import { TransactionReceipt } from "@ethersproject/providers";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { CLAIMABLE_CONTRACT } from "../utils/contracts";
import { useDelegatedAccount } from "~hooks/useDelegatedAccount";
import { useMerkleProof } from "./useMerkleProof";

type Options = {
  onPrepareError?: (error: Error) => void;
  onTxSuccess?: (data: TransactionReceipt) => void;
  onTxError?: (error: Error) => void;
};

export function useClaimMembership({
  onPrepareError,
  onTxSuccess,
  onTxError,
}: Options) {
  const { address } = useDelegatedAccount();
  const { data: merkleProof } = useMerkleProof({
    address,
  });

  const claimPrepare = usePrepareContractWrite({
    ...CLAIMABLE_CONTRACT,
    functionName: "claimMembership",
    // TODO: Correctly type the proof to remove ts-ignore
    // @ts-ignore
    args: [merkleProof],
    enabled: Boolean(merkleProof && address),
    onError: (error) => {
      if (onPrepareError) {
        onPrepareError(error);
      }
    },
  });

  const claim = useContractWrite(claimPrepare.config);

  const claimTx = useWaitForTransaction({
    confirmations: 1,
    hash: claim.data?.hash,
    enabled: !!claim.data,
    onSuccess: (data) => {
      if (onTxSuccess) {
        onTxSuccess(data);
      }
    },
    onError: (error) => {
      if (onTxError) {
        onTxError(error);
      }
    },
  });

  return {
    claimPrepare,
    claim,
    claimTx,
  };
}
