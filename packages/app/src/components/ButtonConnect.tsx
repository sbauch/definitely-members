import styled from "@emotion/styled";
import { ConnectKitButton } from "connectkit";
import Image from "next/image";
import { useDelegatedAccount } from "~hooks/useDelegatedAccount";
import { useENS } from "../hooks/useENS";
import { Button } from "./Button";

type Props = {
  connectedText?: string;
  notConnectedText?: string;
};

const NameRow = styled.div`
  display: grid;
  grid-template-columns: 18px 1fr;
  grid-gap: 0.2rem;
  align-items: center;
`;

export function ButtonConnect({
  connectedText,
  notConnectedText = "Connect Wallet",
}: Props) {
  const { address: connectedAddress, vaultAddress } = useDelegatedAccount();
  const { displayName } = useENS(vaultAddress || connectedAddress);

  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show }) => {
        return (
          <Button onClick={show}>
            {isConnected ? 
              connectedText || 
              (
                <NameRow>
                  {vaultAddress ? (
                    <Image
                      style={{paddingTop: 1}}
                      src="/images/dc.svg"
                      width={16}
                      height={16}
                      alt="delegate-cash-icon"
                    />
                  ) : (
                    <span style={{fontFamily: 'system'}} data-title='Consider delegating to a hot wallet'>⚠️</span>
                  )}
                  <span>{displayName}</span>

                </NameRow> 
              ) : 
                notConnectedText
            }
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
