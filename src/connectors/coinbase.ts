import { Address, EIP1193Provider } from "viem";
import { ConnectionInfo, IConnector } from "./types";
import COINBASE_ICON from "/src/assets/wallets/coinbase-icon.svg";

const ethereum = (window as any as { ethereum?: InjectedProvider }).ethereum;

type InjectedProvider = EIP1193Provider & {
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  isConnected?: () => boolean;
  providers?: InjectedProvider[];
  enable: () => Promise<void>;
  close(): Promise<void>;
};

export class CoinbaseConnector implements IConnector<InjectedProvider> {
  readonly name: string = "coinbase";
  icon: string = COINBASE_ICON;
  private _provider: Omit<InjectedProvider, "providers"> | null = null;

  constructor() {
    if (ethereum?.providers) {
      this._provider = ethereum.providers.find((provider) => provider.isCoinbaseWallet) || null;
    } else if (ethereum?.isCoinbaseWallet) {
      this._provider = ethereum;
    }
  }

  isActivated(): boolean {
    return Boolean(this._provider?.isCoinbaseWallet);
  }

  public getProvider(): InjectedProvider | null {
    return this._provider as InjectedProvider;
  }

  async connect(): Promise<ConnectionInfo> {
    if (!this._provider) throw { message: "Coinbase not detected. Please install Coinbase extension." };
    await this._provider.enable();
    const [accounts, chainId] = await Promise.all([
      this._provider.request({ method: "eth_requestAccounts" }),
      this._provider.request({ method: "eth_chainId" }),
    ]);
    return { chainId, account: accounts[0] };
  }

  async disconnect(): Promise<void> {
    if (!this._provider) throw { message: "Coinbase provider is not connected" };
    return await this._provider.close();
  }
}
