import styled from "@emotion/styled";
import { useAccount } from "wagmi";
import { Card } from "~/components/Card";
import { ConnectWalletCard } from "~/components/ConnectWalletCard";
import { Layout } from "~/components/Layout";
import { useIsDefMember } from "~/hooks/useIsDefMember";
import { useIsMounted } from "~/hooks/useIsMounted";
import { ProposalCard } from "~components/ProposalCard";

const Page = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
`;

export default function HomePage() {
  const isMounted = useIsMounted();
  const { address } = useAccount();
  const { isDefMember, isLoading } = useIsDefMember({
    address,
  });

  return (
    <Layout>
      <Page>
        {isMounted && !address && <ConnectWalletCard />}
        {isMounted && address && isLoading && (
          <Card title="Checking membership status" isLoading />
        )}

        {isMounted && address && <ProposalCard />}
      </Page>
    </Layout>
  );
}
