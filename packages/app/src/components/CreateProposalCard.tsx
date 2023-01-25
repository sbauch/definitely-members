import styled from "@emotion/styled";
import { useDelegatedAccount } from "~hooks/useDelegatedAccount";
import { useBlockExplorer } from "~hooks/useEtherscan";
import { useIsDefMember } from "~hooks/useIsDefMember";
import { useIsMounted } from "~hooks/useIsMounted";
import { Button } from "~components/Button";
import { ButtonConnect } from "~components/ButtonConnect";
import { Card } from "~components/Card";
import { Input } from "~components/Input";
import { Mono } from "~components/Typography";
import { ChangeEvent, useState } from "react";
import { useCreateProposal } from "~hooks/useCreateProposal";
import { useRouter } from "next/router";

const Form = styled.form`
  display: grid;
  grid-template-columns: 1;
  grid-gap: 1em;

  @media (min-width: 40rem) {
    align-items: center;
    grid-gap: 2em;
  }
`;

export function CreateProposalCard() {
  const isMounted = useIsMounted();
  const router = useRouter();

  const { address } = useDelegatedAccount();

  const { isDefMember } = useIsDefMember({
    address,
  });

  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const onDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 24) {
      setError("Keep descriptions short, they're stored onchain");
    }
    setDescription(event.target.value);
  };

  const { propose, proposeTx, proposalId } = useCreateProposal({
    description,
    onTxSuccess: () => {
      router.push(`/proposals/${proposalId}`);
    },
  });

  return (
    <Card title="Create Proposal">
      <Mono margin="0 0 1">Create a new Governance Proposal on Canto</Mono>

      {isMounted && address ? (
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            propose.write?.();
          }}
        >
          <Input
            type="textarea"
            className="w-full my-8"
            value={description}
            onChange={onDescriptionChange}
            placeholder="Describe your proposal"
          />
          <>
            <Mono subdued>Each proposal will allow For, Against and Abstain votes and 1 week of voting for DEF members only</Mono>
          </>
          <>
            <Button
              disabled={Boolean(!propose.write || proposeTx.error || !isDefMember)}
              type="submit"
              isLoading={propose.isLoading || proposeTx.isLoading}
            >
              {proposeTx.isLoading ? (
                <Mono as="span">Claiming&hellip;</Mono>
              ) : isDefMember ? (
                "Submit Proposal"
              ) : (
                "Not a Member"
              )}
            </Button>

            {error && <Mono subdued>{error}</Mono>}
          </>
        </Form>
      ) : (
        <ButtonConnect notConnectedText="Connect to claim" />
      )}

      {propose.data && (
        <Mono margin="0.5 0 0" subdued>
          <a
            href={useBlockExplorer({
              hash: propose.data.hash,
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
