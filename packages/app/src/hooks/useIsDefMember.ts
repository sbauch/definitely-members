import { useContractRead } from "wagmi";
import { useDelegatedAccount } from "./useDelegatedAccount";
import { MEMBERSHIPS_CONTRACT } from "../utils/contracts";

type Options = {
  address: `0x${string}` | undefined;
  onSettled?: (isMember: boolean | undefined, error: Error | null) => void;
  onSuccess?: (isMember: boolean) => void;
};

export function useIsDefMember({ address, onSuccess, onSettled }: Options) {
  const { address: connectedAddress, vaultAddress } = useDelegatedAccount();
  const _address = (address === connectedAddress && vaultAddress) || address;
  console.warn(_address);

  const { data, ...query } = useContractRead({
    ...MEMBERSHIPS_CONTRACT,
    functionName: "balanceOf",
    args: [_address || "0x"],
    enabled: Boolean(_address),
    chainId: 1,
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(Boolean(data.gt(0)));
      }
    },
    onSettled: (data, error) => {
      if (onSettled) {
        onSettled(data && data.gt(0), error);
      }
    },
  });

  return {
    isDefMember: Boolean(data && data.gt(0)),
    ...query,
  };
}
