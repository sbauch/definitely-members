import styled from "@emotion/styled";
import { useDelegatedAccount } from "~hooks/useDelegatedAccount";
import { Card } from "~/components/Card";
import { CreateProposalCard } from "~components/CreateProposalCard";
import { ConnectWalletCard } from "~/components/ConnectWalletCard";
import { DefLogoCard } from "~/components/DefLogoCard";
import { InfoCard } from "~/components/InfoCard";
import { InviteCard } from "~/components/InviteCard";
import { Layout } from "~/components/Layout";
import { MembersCard } from "~/components/MembersCard";
import { useIsDefMember } from "~/hooks/useIsDefMember";
import { useIsMounted } from "~/hooks/useIsMounted";
import { ListProposalsCard } from "~components/ListProposalsCard";

const Page = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
`;

export default function HomePage() {
  const isMounted = useIsMounted();
  const { address } = useDelegatedAccount();
  const { isDefMember, isLoading } = useIsDefMember({
    address,
  });

  return (
    <Layout>
      <Page>
        {isMounted && !address && <ConnectWalletCard text="Members can create and vote on proposals" />}
        {isMounted && address && isLoading && (
          <Card title="Checking membership status" isLoading />
        )}

        {isMounted && address && <ListProposalsCard />}
      </Page>
    </Layout>
  );
}
