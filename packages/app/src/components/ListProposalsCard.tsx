import styled from "@emotion/styled";
import { BigNumber } from "ethers";
import Link from "next/link";
import { useProposals } from "~hooks/useProposals";
import { ButtonClear } from "./ButtonClear";
import { Card } from "./Card";
import { LoadingIndicator } from "./LoadingIndicator";
import { ProposalListItem } from "./ProposalListItem";
import { Mono } from "./Typography";

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

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

export function ListProposalsCard() {
  const { data, isLoading } = useProposals();
 

  return (
    <Card title="Proposals">
      {isLoading && <LoadingIndicator margin="1 0 0" />}
      {!isLoading && (
        <List>
          <ListItem>
            <DescriptionArea uppercase subdued>
              Ask
            </DescriptionArea>
            <VotesArea uppercase subdued>
              Votes
            </VotesArea>
          </ListItem>
          {data &&
            data.map((proposalId: BigNumber) => (
              <ProposalListItem proposalId={proposalId.toString()} />
            ))}
        </List>
      )}
      <Link href="/proposals/new">
        <ButtonClear>Create Proposal</ButtonClear>
      </Link>
    </Card>
  );
}
