import { Address } from "viem";

interface AppState {
  appChainId: string;
  chainId: string;
  account: Address;
  blockNumber: string;
  status: ConnectionStatus;
}

// Connection
type ConnectionStatus = "connected" | "disconnected" | "connecting" | "failed";
export type ConnectionStateUpdate = Partial<AppState>;

// Session

//
