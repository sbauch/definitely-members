import { useEtherscan } from "../hooks/useEtherscan";
import { ButtonConnect } from "./ButtonConnect";
import { Card } from "./Card";
import { Mono } from "./Typography";

export function ConnectWalletCard({ text }: { text?: string}) {

  return (
    <Card title="Connect Wallet">
      <Mono margin="0 0 1">
        {text || "You'll be able to claim an invite if you have one, or send invites if you're already a member."}
      </Mono>
      <ButtonConnect />
    </Card>
  );
}
