import type WalletConnectProvider from "@walletconnect/ethereum-provider";
import { Address, EIP1193Provider } from "viem";

export interface IConnector<Provider extends EIP1193Provider | WalletConnectProvider> {
  name: string;
  icon: string;
  getProvider(): Provider | null;
  connect(targetChainId?: string): Promise<Partial<ConnectionInfo>>;
  disconnect?(): Promise<void>;
  isActivated(): boolean;
}

export type ConnectionInfo = {
  chainId: string;
  account: Address;
};
