import { BigNumber } from "ethers";
import { useContractRead } from "wagmi";
import { GOVERNANCE_CONTRACT } from "../utils/contracts";

export function useHasVoted(proposalId: string, address: `0x${string}`) {
  return useContractRead({
    ...GOVERNANCE_CONTRACT,
    functionName: "hasVoted",
    args: [BigNumber.from(proposalId || 0), address],
    enabled: Boolean(proposalId),
    chainId: 7700,
  });
}
