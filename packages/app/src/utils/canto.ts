import { Chain } from "wagmi";

export const canto: Chain = {
  id: 7700,
  name: "Canto",
  network: "canto",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "CANTO",
  },
  rpcUrls: {
    default: { http: ["https://canto.slingshot.finance"] },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://evm.explorer.canto.io/" },
  },
};
