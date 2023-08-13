import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Abi,
  Address,
  BaseError,
  ContractFunctionRevertedError,
  EIP1193Provider,
  GetFunctionArgs,
  PublicClient,
  WalletClient,
  WriteContractParameters,
  createWalletClient,
  custom,
  publicActions,
} from "viem";
import { EthereumContext, useConnection, useEthereum } from "./ethereumContext";
import notifyWithToast, { MESSAGE_TYPE } from "../utils/notifyWithTost";
import { TruthPostAbi } from "./TruthPostABI";
import { goerli, mainnet } from "viem/chains";
import { networkMap } from "../connectors/networks";

type OptionsOverride = {
  value: any;
  contractAddress: string;
  abi: any;
};

/* type InvokeTransactionParams<TAbi extends Abi | readonly unknown[] = Abi, TFunctionName extends string = string> = {
  functionName: TFunctionName;
} & GetFunctionArgs<TAbi, TFunctionName> &
  OptionsOverride;
 */
type Session = {
  invokeCall: (functionName: string, args: any, optionsOverride: Omit<OptionsOverride, "value">) => Promise<unknown>;
  invokeTransaction: (functionName: string, args: any, optionsOverride: Partial<OptionsOverride>) => Promise<void>;
};

interface SessionContextValue {
  session: Session;
}

const SessionContext = createContext<SessionContextValue>({} as SessionContextValue);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { state } = useEthereum();
  const { account, chainId, appChainId, status } = state;
  const connection = useConnection();
  const [client, setClient] = useState<WalletClient & PublicClient>();

  useEffect(() => {
    if (status !== "connected") return;
    setClient(
      createWalletClient({
        transport: custom(connection.currentConnector.getProvider() as EIP1193Provider),
      }).extend(publicActions)
    );
  }, [status]);

  const invokeCall = async (
    functionName: string,
    args: any[],
    optionsOverride: Omit<OptionsOverride, "value"> = {
      abi: TruthPostAbi,
      contractAddress: Object.keys(networkMap[chainId].deployments)[0],
    }
  ): Promise<unknown> => {
    const { contractAddress, abi } = optionsOverride;
    if (appChainId !== chainId) return await connection.switchChain(appChainId);
    return await client?.readContract({
      address: contractAddress as Address,
      abi: abi,
      functionName,
      args,
    });
  };

  //TODO:
  // 1.apply type inference on f arguments based on provided ABI
  // 2, consider returning transaction hash/receipt
  const invokeTransaction = async (
    functionName: string,
    args: any,
    optionsOverride: Partial<OptionsOverride> = {}
  ): Promise<void> => {
    const { value, contractAddress, abi } = {
      abi: TruthPostAbi,
      contractAddress: Object.keys(networkMap[chainId].deployments)[0],
      ...optionsOverride,
    };

    if (status === "disconnected") await connection.enable();
    if (appChainId !== chainId) {
      await connection.switchChain(appChainId);
    } else {
      const { request } = await (client as PublicClient).simulateContract({
        address: contractAddress as Address,
        abi: abi,
        functionName,
        args,
        account,
        chain: goerli, //TODO: adapt to the corect usage : chainId <-> Chain type
        value,
      });
      console.log({ request });

      await notifyWithToast(
        client?.writeContract(request).then((hash) => client.waitForTransactionReceipt({ hash })),
        MESSAGE_TYPE.transaction
      );
    }
  };
  //TODO: add user-related data e.g. ensAddress,address,balance etc.
  const session = { invokeCall, invokeTransaction };
  return <SessionContext.Provider value={{ session }}>{children}</SessionContext.Provider>;
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context.session;
};
