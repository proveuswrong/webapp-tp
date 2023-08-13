import React, { createContext, useContext, useEffect, useState } from "react";
import { Address } from "viem";

import { Connection, ConnectionConfig } from "../connectors/connection";
import { SessionProvider } from "./sessionContext";
import useGraphMetadata from "../hooks/useGraphMetadata";
import useMetaEvidenceContent from "../hooks/useMetaEvidenceContent";
import { IObserver, NotificationType } from "../connectors/observer";

type ConnectionStatus = "connected" | "disconnected" | "connecting" | "failed";

interface AppState {
  appChainId: string;
  chainId: string;
  account: Address;
  blockNumber: string;
  status: ConnectionStatus;
}

export type ConnectionStateUpdate = Partial<AppState>;

interface GraphMetadata {
  block: {
    hash: string;
    number: number;
  };
  deployment: string;
  hasIndexingError: boolean;
}

type MetaEvidenceContent = {
  arbitrableChainID: string;
  arbitrartorChainID: string;
  category: string;
  description: string;
  dynamicScriptRequiredParams: string[];
  dynamicScriptURI: string;
  evidenceDisplayInterfaceRequiredParams: string[];
  fileURI: string;
  question: string;
  rulingOptions: {
    type: string;
    titles: string[];
  };
  title: string;
  _v: string;
};
type MetaEvidenceContents = MetaEvidenceContent[] | undefined;

const initialState: AppState = {
  appChainId: "0x5",
  chainId: "",
  account: "0x0",
  blockNumber: "",
  status: "disconnected",
};
const initialGraphMetadata: GraphMetadata = {
  block: {
    hash: "",
    number: 0,
  },
  deployment: "",
  hasIndexingError: false,
};

export interface EthereumContextValue {
  state: AppState;
  graphMetadata: GraphMetadata;
  metaEvidenceContents: MetaEvidenceContents;
  connection: Connection;
}

export const EthereumContext = createContext<EthereumContextValue>({} as EthereumContextValue);

type ExtendedConfig = ConnectionConfig & { appChainId: string; connection: Connection };

export const EthereumProvider: React.FC<{ children: React.ReactNode; config: ExtendedConfig }> = ({
  config,
  children,
}) => {
  const { connection } = config;
  initialState.appChainId = config.appChainId;

  const [state, setState] = useState<AppState>(initialState);
  const graphMetadata_ = useGraphMetadata(state.appChainId);
  const metaEvidenceContents = useMetaEvidenceContent(state.appChainId);

  const handleConnectionUpdate = (update: ConnectionStateUpdate, type: NotificationType) => {
    if (type === NotificationType.ResetState) {
      setState(initialState);
    } else {
      setState((prevState) => ({
        ...prevState,
        ...update,
      }));
    }
  };

  useEffect(() => {
    let unwatch: () => void | void;
    (async () => {
      unwatch = (await connection.enableEagerly()) as () => void;
    })();

    return () => {
      if (typeof unwatch === "function") unwatch();
    };
  }, []);

  useEffect(() => {
    const observer: IObserver<ConnectionStateUpdate> = {
      update: (update, type) => {
        handleConnectionUpdate(update, type);
      },
    };
    connection.subscribe(observer);
    return () => {
      connection.unsubscribe(observer);
    };
  }, [connection]);

  return (
    <EthereumContext.Provider
      value={{
        state,
        graphMetadata: graphMetadata_ ?? initialGraphMetadata,
        metaEvidenceContents,
        connection,
      }}
    >
      <SessionProvider>{children}</SessionProvider>
    </EthereumContext.Provider>
  );
};

export const useEthereum = (): EthereumContextValue => {
  const context = useContext(EthereumContext);
  if (!context) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }
  return context;
};

export const useConnection = (): Connection => {
  const context = useContext(EthereumContext);
  if (!context) {
    throw new Error("useConnection must be used within a ConnectionProvider");
  }

  return context.connection;
};
