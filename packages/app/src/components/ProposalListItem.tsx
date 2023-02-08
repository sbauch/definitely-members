import styled from "@emotion/styled";
import { useDelegatedAccount } from "~hooks/useDelegatedAccount";
import { useBlockExplorer } from "~hooks/useEtherscan";
import { useIsDefMember } from "~hooks/useIsDefMember";
import { useIsMounted } from "~hooks/useIsMounted";
import { Button } from "~components/Button";
import { ButtonConnect } from "~components/ButtonConnect";
import { Card } from "~components/Card";
import { Mono } from "~components/Typography";
import { useState } from "react";
import { useRouter } from "next/router";
import { VoteType, useCastVote } from "~hooks/useCastVote";
import RadioButtonGroup from "./Radio/RadioButtonGroup";
import { useProposal } from "~hooks/useProposal";
import { useENS } from "~hooks/useENS";
import Link from "next/link";
import { BigNumber } from "ethers";

const ListItem = styled.li`
  display: grid;
  grid-template-areas: "description votes";
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 0.25rem;
  grid-column-gap: 0.5rem;

  & + & {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px dotted rgba(var(--foreground-alpha), 0.1);
  }

  @media (min-width: 32rem) {
    grid-template-areas: "description votes";
    grid-template-columns: 1fr 3rem;
  }
`;

const DescriptionArea = styled(Mono)`
  grid-area: description;
`;

const VotesArea = styled(Mono)`
  grid-area: votes;
  text-align: right;
`;

const VotesContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  font-weight: 200;
  font-size: 0.8em;
  grid-gap: 0.5rem;
  font-variant-numeric: tabular-nums;
  
  #for {
    color: var(--green);
  }

  #against {
    color: var(--red);
  }

  #abstain {
    color: var(--muted);
  }
`;

export function ProposalListItem({ proposalId }: { proposalId: string }) {
  const { data: proposal, isLoading } = useProposal(proposalId);
  const { displayName: proposer } = useENS(proposal?.proposer);

  return (
    <ListItem>
      <DescriptionArea>
        <Link href={`/proposals/${proposalId}`}>
          {proposal?.description || "—"}
        </Link>
        <Mono subdued>Proposed by {proposer}</Mono>
      </DescriptionArea>
      <VotesArea>
        <VotesContainer>
          <Mono id="for">{proposal?.forVotes}</Mono>
          <Mono id="against">{proposal?.againstVotes}</Mono>
          <Mono subdued id="abstain">
            {proposal?.abstainVotes}
          </Mono>
        </VotesContainer>
      </VotesArea>
    </ListItem>
  );
}
