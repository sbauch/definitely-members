import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";
import { GOVERNANCE_CONTRACT } from "../utils/contracts";

export function useHasVoted(proposalId: string, address: `0x${string}`) {
  const { data, ...query } = useContractRead({
    ...GOVERNANCE_CONTRACT,
    functionName: "hasVoted",
    args: [BigNumber.from(proposalId || 0), address],
    enabled: Boolean(proposalId),
    chainId: 7700,
  });

  const { data: receipt, ...receiptQuery } = useContractRead({
    ...GOVERNANCE_CONTRACT,
    functionName: "getReceipt",
    args: [BigNumber.from(proposalId || 0), address],
    enabled: Boolean(proposalId),
    chainId: 7700,
  });

  return {
    data,
    receipt,
    ...query,
    ...receiptQuery,
  };
}
