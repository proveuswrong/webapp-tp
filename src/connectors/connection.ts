import { Address, EIP1193Provider } from "viem";
import Observable, { NotificationType } from "./observer";
import { IConnector } from "./types";
import { ConnectionStateUpdate } from "../data/ethereumContext";

type EIP1193Connector = IConnector<EIP1193Provider>;

interface Message {
  type: string; // apply stronger type
  data: {
    subscription: string;
    result: {
      number: string;
    };
  };
}
export interface ConnectionConfig {
  connectors: EIP1193Connector[];
}

export class Connection extends Observable<ConnectionStateUpdate> {
  availableConnectors: EIP1193Connector[];
  private _selectedConnector: EIP1193Connector;
  private _blockSubscriptionId: string;
  private static instance: Connection | null = null;

  constructor(private readonly config: ConnectionConfig) {
    super();
    this.availableConnectors = this.config.connectors;

    // detect active connector and establish connection
    console.log("Constructing connection");
    this.detectActiveConnector();
    this.listenBlockNumber().then(({ subscriptionId }) => (this._blockSubscriptionId = subscriptionId));
  }

  static getInstance(config: ConnectionConfig): Connection {
    if (!Connection.instance) {
      Connection.instance = new Connection(config);
    }
    return Connection.instance;
  }

  detectActiveConnector(): void {
    const activeConnectors: EIP1193Connector[] = [];

    for (const connector of this.availableConnectors) {
      if (connector.isActivated()) activeConnectors.push(connector);
    }

    if (activeConnectors.length > 1) {
      // handle options to choose a connector or pritorization
      this._selectedConnector = activeConnectors[0];
    } else if (activeConnectors.length === 1) {
      this._selectedConnector = activeConnectors[0];
    } else {
      console.log("No active connectors detected");
      // use public connector.
    }
  }

  selectConnector(name: string): void {
    console.log("selectConnector/availableC", this.availableConnectors);
    this._selectedConnector = this.availableConnectors.find((c) => c.name === name) as EIP1193Connector;
    console.log(this._selectedConnector);
    localStorage.setItem("lastUsedConnector", name);
  }

  public get currentConnector(): EIP1193Connector {
    return this._selectedConnector;
  }

  async enableEagerly(): Promise<(() => void) | void> {
    if (!this._selectedConnector.isActivated) return;

    this.notify({ status: "connecting" }); // use some sort of notification logic
    const accounts = (await this._selectedConnector.getProvider()?.request({ method: "eth_accounts" })) as Address[];

    if (accounts.length === 0) {
      this.notify({ status: "disconnected" });
      return;
    }
    const chainId = await this._selectedConnector.getProvider()?.request({ method: "eth_chainId" });
    this.notify({ chainId, account: accounts[0], status: "connected" });

    return this.subscribeToEvents();
  }

  async enable(name?: string): Promise<void> {
    if (name) this.selectConnector(name);
    this.notify({ status: "connecting" }); // use some sort of notification logic

    try {
      const { chainId, account } = await this._selectedConnector.connect();
      console.log("connection/enable", { chainId, account });
      this.notify({ chainId, account, status: "connected" });

      this.listenAccountChanged();
      this.listenChainChanged();
    } catch (error) {
      console.log({ error });
      return Promise.reject(new Error("No connector selected."));
    }
  }

  disable(): Promise<void> | void {
    if (!this._selectedConnector) return Promise.reject(new Error("No connector selected."));

    this.notify({}, NotificationType.ResetState);
    if (this._selectedConnector.disconnect) return this._selectedConnector.disconnect();
    //TODO: remove event listeners
  }

  subscribeToEvents() {
    this.listenAccountChanged();
    this.listenChainChanged();
    return () => {
      this.unwatchAccountChanged();
      this.unwatchChainChanged();
      this.unwatchBlockNumber(this._blockSubscriptionId);
    };
  }

  listenChainChanged(): void {
    const provider = this._selectedConnector.getProvider();
    provider?.on("chainChanged", (chainId: string) => {
      this.notify({ chainId });
    });
  }

  listenAccountChanged(): void {
    const provider = this._selectedConnector.getProvider();
    provider?.on("accountsChanged", (accounts: Address[]) => {
      !!accounts[0] ? this.notify({ account: accounts[0] }) : this.notify({}, NotificationType.ResetState);
    });
  }

  async listenBlockNumber(
    callback?: (_blockNumber: string) => void
  ): Promise<{ subscriptionId: string; unwatch: () => Promise<Boolean> }> {
    const provider = this._selectedConnector.getProvider();

    const subscriptionId = await (provider as any).request({ method: "eth_subscribe", params: ["newHeads"] });

    const listener = (message: Message) => {
      if (message.type === "eth_subscription") {
        const lastBlockNumber = message.data.result.number;
        if (message.data.subscription === subscriptionId && lastBlockNumber) {
          this.notify({ blockNumber: lastBlockNumber });
          if (callback) callback(lastBlockNumber);
        }
      }
    };
    provider?.on("message", listener);

    return {
      subscriptionId,
      unwatch: async (): Promise<Boolean> => {
        //refactor provider type
        return await (provider as any).request({ method: "eth_unsubscribe", params: [subscriptionId] });
      },
    };
  }

  unwatchBlockNumber(subscriptionId: string): Promise<Boolean> {
    const provider = this._selectedConnector.getProvider();
    return (provider as any).request({ method: "eth_unsubscribe", params: [subscriptionId] });
  }

  unwatchAccountChanged() {
    const provider = this._selectedConnector.getProvider();
    provider?.removeListener("accountsChanged", (accounts: Address[]) => {
      this.notify({ account: accounts[0] });
    });
  }

  unwatchChainChanged() {
    const provider = this._selectedConnector.getProvider();
    provider?.removeListener("chainChanged", (chainId: string) => {
      this.notify({ chainId });
    });
  }

  async switchChain(targetChainId: string): Promise<void> {
    const provider = this._selectedConnector.getProvider();
    const chainId = await provider?.request({ method: "eth_chainId" });
    if (!provider || targetChainId === chainId) return;
    try {
      await provider.request({ method: "wallet_switchEthereumChain", params: [{ chainId: targetChainId }] });
      this.notify({ chainId: targetChainId });
    } catch (error) {
      console.log(error);
    }
  }

  switchAppChain(targetChainId: string): void {
    return this.notify({ appChainId: targetChainId });
  }

  removeListeners(): void {
    this._selectedConnector.getProvider()?.removeListener("accountsChanged", (accounts: Address[]) => {
      this.notify({ account: accounts[0] });
    });
    this._selectedConnector.getProvider()?.removeListener("chainChanged", (chainId: string) => {
      this.notify({ chainId });
    });
    // this._selectedConnector.getProvider()?.removeListener("")
  }

  async switchConnector(name: string): Promise<void> {
    await this.disable();
    this.selectConnector(name);
    await this.enable(name);
  }
}
