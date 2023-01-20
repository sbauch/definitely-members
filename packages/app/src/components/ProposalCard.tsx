import styled from "@emotion/styled";
import { useAccount } from "wagmi";
import { useBlockExplorer } from "~hooks/useEtherscan";
import { useIsDefMember } from "~hooks/useIsDefMember";
import { useIsMounted } from "~hooks/useIsMounted";
import { Button } from "~components/Button";
import { ButtonConnect } from "~components/ButtonConnect";
import { Card } from "~components/Card";
import { Mono } from "~components/Typography";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { VoteType, useCastVote } from "~hooks/useCastVote";
import RadioButtonGroup from "./Radio/RadioButtonGroup";
import { useProposal } from "~hooks/useProposal";
import { useENS } from "~hooks/useENS";

const Form = styled.form`
  display: grid;
  grid-template-columns: 1;
  grid-gap: 1em;

  @media (min-width: 40rem) {
    align-items: center;
    grid-gap: 2em;
  }
`;

const VotesContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 200;
  font-size: 0.8em;
  grid-gap: 0.5rem;
  justify-content: end;

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

export function ProposalCard() {
  const isMounted = useIsMounted();
  const router = useRouter();
  const { proposalId } = router.query as { proposalId: string };

  const [vote, setVote] = useState<VoteType>(VoteType.Abstain);

  const { address } = useAccount();

  const { isDefMember } = useIsDefMember({
    address,
  });



  const { data: proposal, isLoading, refetch } = useProposal(proposalId);
  const { displayName: proposer } = useENS(proposal?.proposer);
  
  const { castVote, castVoteTx, hasVoted, receipt } = useCastVote({
    proposalId: proposalId || "0",
    vote,
    onTxSuccess: () => refetch,
  });

  useEffect(() => {
    if (!receipt?.hasVoted) return;

    setVote(receipt.support)
  }, [receipt])

  return (
    <Card
      title={proposal?.description || "—"}
      addendum={
        <VotesContainer>
          <Mono id="for">{proposal?.forVotes} for</Mono>
          <Mono id="against">{proposal?.againstVotes} against</Mono>
          <Mono subdued id="abstain">
            {proposal?.abstainVotes} abstain
          </Mono>
        </VotesContainer>
      }
    >
      <Mono margin="0 0 1">Proposed by {proposer} </Mono>

      <Mono margin="0 0 1">Cast your vote</Mono>

      {isMounted && address ? (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            castVote.write?.();
          }}
        >
          <RadioButtonGroup
            options={[
              { name: "vote", label: "For" },
              { name: "vote", label: "Against" },
              { name: "vote", label: "Abstain" },
            ]}
            value={VoteType[vote]}
            onChange={(label) =>{
              if (hasVoted) return;
              setVote(VoteType[label as keyof typeof VoteType])
            }}
          />

          <>
            <Button
              disabled={Boolean(hasVoted || !isDefMember || !castVote.write || castVoteTx.error)}
              type="submit"
              isLoading={castVote.isLoading || castVoteTx.isLoading}
            >
              {castVoteTx.isLoading ? (
                <Mono as="span">Voting &hellip;</Mono>
              ) : isDefMember ? (
                hasVoted ? "Already Voted" : "Cast Vote"
              ) : (
                "Not a Member"
              )}
            </Button>
          </>
        </Form>
      ) : (
        <ButtonConnect notConnectedText="Connect to claim" />
      )}

      {castVote.data && (
        <Mono margin="0.5 0 0" subdued>
          <a
            href={useBlockExplorer({
              hash: castVote.data.hash,
              chainId: "7700",
            })}
            target="_blank"
          >
            View transaction on explorer
          </a>
        </Mono>
      )}
    </Card>
  );
}
