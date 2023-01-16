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

export function useProposals() {
  const { data, ...query } = useContractRead({
    ...GOVERNANCE_CONTRACT,
    functionName: "listProposalIds",
    chainId: 7700,
  });

  return {
    data,
    ...query,
  };
}
