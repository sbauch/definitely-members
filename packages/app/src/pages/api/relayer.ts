import { JsonRpcProvider } from "@ethersproject/providers";
import { BigNumber, Contract, utils, Wallet } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

interface ForwardRequest {
  to: string;
  from: string;
  authorizer: string;
  nftContract: string;
  nonce: string;
  nftTokenId: string;
  nftChainId: string;
  targetChainId: string;
  data: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const provider = new JsonRpcProvider("https://canto.slingshot.finance/", {
    name: "canto",
    chainId: 7700,
  });

  let signer = new Wallet(process.env.CANTO_RELAYER_PRIVATE_KEY!, provider);

  return handleNFTRequest(req.body, signer).then((data) => {
    return res.send(JSON.stringify(data));
  });
};

async function handleNFTRequest(
  {
    request,
    signature,
    forwarder,
  }: {
    request: ForwardRequest;
    signature: string;
    forwarder: Record<string, any>;
  },
  signer: Wallet
) {
  const provider = new JsonRpcProvider("https://canto.slingshot.finance/", {
    name: "canto",
    chainId: 7700,
  });

  const _forwarder = new Contract(forwarder.address, forwarder.abi, provider);

  // Preflight transaction
  const { urls, callData, callbackFunction, extraData } =
    (await preflight(_forwarder, request, signature)) || {};

  // Fetch proof from error params
  const proof = await Promise.race(
    urls.map((url: string) => retrieveProof({ url, callData, forwarder }))
  );

  if (!proof)
    throw Error(
      `No proof generated for ${request.nftChainId} ${request.nftContract} ${request.nftTokenId}`
    );

  const abi = new utils.AbiCoder();

  const tx = await signer.sendTransaction({
    to: forwarder.address,
    data: utils.hexConcat([
      callbackFunction,
      abi.encode(["bytes", "bytes"], [proof, extraData]),
    ]),
  });

  console.log(`Sent meta-tx: ${tx.hash}`);
  return { status: "success", result: JSON.stringify({ txHash: tx.hash }) };
}

async function preflight(
  forwarder: Contract,
  request: ForwardRequest,
  signature: string
) {
  // Validate request on the forwarder contract
  try {
    await forwarder.preflight(request, signature);

    console.warn(`Preflight did not revert`);
  } catch (e: any) {
    if (e.code === utils.Logger.errors.CALL_EXCEPTION) {
      if (e.errorName === "OffchainLookup") {
        const { sender, urls, callData, callbackFunction, extraData } =
          e.errorArgs;

        return { sender, urls, callData, callbackFunction, extraData };
      }
    }
    throw Error(e);
  }
}

async function retrieveProof({
  url,
  callData,
  forwarder,
}: Record<string, any>): Promise<string> {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "durin_call",
      params: { callData, to: forwarder.address, abi: forwarder.abi },
    }),
  });

  const body = (await response.json()) as { result: string };
  return body?.result;
}

export default handler;
