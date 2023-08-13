import WalletConnectProvider from "@walletconnect/ethereum-provider";
import { Address } from "viem";
import { EthereumProviderOptions } from "@walletconnect/ethereum-provider/dist/types/EthereumProvider";
import { ConnectionInfo, IConnector } from "./types";

import WALLET_CONNECT_ICON from "/src/assets/wallets/walletconnect-icon.svg";

export default class WalletConnectConnector implements IConnector<WalletConnectProvider> {
  name: string = "walletConnect";
  icon: string = WALLET_CONNECT_ICON;
  private _provider: WalletConnectProvider | null;
  private _options: EthereumProviderOptions;

  constructor(options: EthereumProviderOptions) {
    this._options = options;
    this.#initProvider();
  }

  getProvider(): WalletConnectProvider | null {
    return this._provider;
  }

  async connect(targetChainId: string): Promise<ConnectionInfo> {
    if (!this._provider) throw { message: "WalletConnect is not created" };

    if (!targetChainId && this._options.chains) {
      targetChainId = this._options.chains[0].toString();
    }
    this._provider.connect({ chains: [Number(targetChainId)] });

    const [accounts, chainId] = await Promise.all([this._provider.enable(), this._provider.chainId]);
    return { chainId: chainId.toString(), account: accounts[0] as Address };
  }

  async disconnect?(): Promise<void> {
    if (!this._provider) throw { message: "WalletConnect provider is not connected." };
    await this._provider.disconnect();
    this._provider = null;
  }

  isActivated(): boolean {
    if (!this._provider) return false;
    console.log("isActivated", !!this._provider.accounts);
    return !!this._provider.accounts;
  }

  async #initProvider() {
    const { projectId, showQrModal = true, chains } = this._options;
    this._provider = await WalletConnectProvider.init({
      projectId,
      showQrModal,
      chains,
      optionalChains: [1, 5],
    });
  }
}
