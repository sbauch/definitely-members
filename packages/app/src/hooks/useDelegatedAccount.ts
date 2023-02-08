import { useAccount, useBalance, useContractRead } from "wagmi";

import { abi, address as delegateCashAddress } from "~abis/DelegateCash";

export function useDelegatedAccount() {
  const { address, isConnected, ...account } = useAccount();

  const txConfig = {
    address: delegateCashAddress,
    abi,
    // chainId: process.env.NEXT_PUBLIC_MATIC_CHAIN_ID,
    enabled: isConnected,
  };

  const { data: delegationsByDelegate } = useContractRead({
    ...txConfig,
    functionName: "getDelegationsByDelegate",
    args: [address as `0x${string}`],
  });

  const { data: delegatesForAll } = useContractRead({
    ...txConfig,
    functionName: "getDelegatesForAll",
    args: [address as `0x${string}`],
  });

  const { data: connectedBalance } = useBalance({
    address,
    chainId: parseInt(process.env.NEXT_PUBLIC_MATIC_CHAIN_ID!, 10),
  });

  const delegatedAddress = delegatesForAll?.[0];
  const vaultAddress = delegationsByDelegate?.[0]?.vault;

  const { data: delegateBalance } = useBalance({
    address,
    chainId: parseInt(process.env.NEXT_PUBLIC_MATIC_CHAIN_ID!, 10),
    enabled: Boolean(delegatedAddress),
  });

  return {
    address,
    ...account,
    isConnected,
    vaultAddress,
    delegatedAddress,
    connectedBalance,
    delegateBalance,
    isEmpty: connectedBalance ? connectedBalance.decimals !== 0 : true,
  };
}
