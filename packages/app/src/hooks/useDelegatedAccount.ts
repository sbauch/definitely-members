import { DelegateCash } from "delegatecash";
import { providers } from "ethers";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export function useDelegatedAccount() {
  const [vaultAddress, setVaultAddress] = useState<`0x${string}` | string>();
  const { address, isConnected, ...account } = useAccount();

  useEffect(() => {
    if (!isConnected || !address) return;

    const checkDelegation = async () => {
      const provider = new providers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_MATIC_RPC_URL,
        process.env.NEXT_PUBLIC_MATIC_CHAIN_ID
      );
      const dc = new DelegateCash(provider);

      const delegationsByDelegate = await dc.getDelegationsByDelegate(address);
      const delegation = delegationsByDelegate.find(
        (_delegation) => _delegation.type === "ALL"
      );
      delegation && setVaultAddress(delegation.vault);
    };

    checkDelegation();
  }, [address, isConnected]);

  return {
    address,
    ...account,
    isConnected,
    vaultAddress,
  };
}
