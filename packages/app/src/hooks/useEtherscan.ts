import { useCallback } from "react";
import { goerli, mainnet } from "wagmi/chains";
import { targetChainId } from "../utils/contracts";

export function useEtherscan() {
  let explorerURL = mainnet.blockExplorers?.default.url;
  if (targetChainId === 5) {
    explorerURL = goerli.blockExplorers?.default.url;
  }

  const getTransactionUrl = useCallback(
    (hash: string) => explorerURL && `${explorerURL}/tx/${hash}`,
    [explorerURL]
  );

  const getAddressUrl = useCallback(
    (address: string) => explorerURL && `${explorerURL}/address/${address}`,
    [explorerURL]
  );

  return { getTransactionUrl, getAddressUrl };
}

export function useBlockExplorer({
  address,
  chainId,
  hash,
}: {
  address?: string;
  chainId: string;
  hash?: string;
}) {
  let domain;

  switch (chainId) {
    case "1":
      domain = "https://etherscan.io";
      break;
    case "5":
      domain = "https://goerli.etherscan.io";
      break;
    case "137":
      domain = "https://polygonscan.com";
      break;
    case "80001":
      domain = "https://mumbai.polygonscan.com";
      break;
    case "740":
      domain = "https://testnet-explorer.canto.neobase.one";
      break;
    case "7700":
      domain = "https://evm.explorer.canto.io";
      break;
    default:
      break;
  }

  const path = address ? `/address/${address}` : `/tx/${hash}`;

  return domain + path;
}
