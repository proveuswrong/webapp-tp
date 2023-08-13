import { Address, EIP1193Provider } from "viem";
import { IConnector } from "./types";
import METAMASK_ICON from "/src/assets/wallets/metamask-icon.svg";

const ethereum = (window as any as { ethereum?: InjectedProvider }).ethereum;

type InjectedProvider = EIP1193Provider & {
  isMetaMask?: boolean;
  isCoinbaseWallet?: boolean;
  isConnected?: () => boolean;
  providers?: InjectedProvider[];
  enable: () => Promise<void>;
  close(): Promise<void>;
};

type ConnectionInfo = {
  chainId: string;
  account: Address;
};

export class MetaMaskConnector implements IConnector<InjectedProvider> {
  readonly name: string = "metamask";
  icon: string = METAMASK_ICON;
  private _provider: Omit<InjectedProvider, "providers"> | null = null;

  constructor() {
    if (ethereum?.providers) {
      this._provider = ethereum.providers.find((provider) => provider.isMetaMask) || null;
    } else if (ethereum?.isMetaMask) {
      this._provider = ethereum;
    }
  }

  isActivated(): boolean {
    return Boolean(this._provider?.isMetaMask);
  }

  public getProvider(): InjectedProvider | null {
    return this._provider as InjectedProvider;
  }

  async connect(): Promise<ConnectionInfo> {
    if (!this._provider) throw { message: "Metamask not detected. Please install Metamask extension." };
    const [accounts, chainId] = await Promise.all([
      this._provider.request({ method: "eth_requestAccounts" }),
      this._provider.request({ method: "eth_chainId" }),
    ]);
    return { chainId, account: accounts[0] };
  }
}
