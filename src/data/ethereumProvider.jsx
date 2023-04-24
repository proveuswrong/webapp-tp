import React, {Component} from "react";
import {Navigate} from "react-router-dom";
import detectEthereumProvider from "@metamask/detect-provider";
import {ipfsGateway} from "../utils/addToIPFS";
import {ethers} from "ethers";
import ABI from "./ABI.json";
import { environment } from './environments';

export const networkMap = {
  "0x5": {
    name: "Ethereum Testnet Görli",
    shortname: "Görli",
    explorerURL(address) {
      return `https://goerli.etherscan.io/address/${address}`;
    },
    contractInstances: environment.networkMap["0x5"].contractInstances
  },
};

export default class EthereumProvider extends Component {
  static constants = {
    LONGPOLLING_PERIOD_MS: 60000,
  };

  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      chainId: "",
      metamaskChainId: "",
      isConnected: false,
      isProviderDetected: false,
      isDeployedOnThisChain: false,
      metaEvidenceContents: [],
      blockNumber: 0,
      ethersProvider: null,
      awaitingUserPermission: false,
    };

    this.changeChain = this.changeChain.bind(this);
    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.handleConnected = this.handleConnected.bind(this);
    this.handleDisconnected = this.handleDisconnected.bind(this);
    this.fetchMetaEvidenceContents = this.fetchMetaEvidenceContents.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.requestAccounts = this.requestAccounts.bind(this);

    this.setState = this.setState.bind(this);
  }

  componentDidMount() {
    detectEthereumProvider({silent: true}).then((provider) => {
      if (provider) this.initializeProvider();
    });
    getGraphMetadata(
      Object.keys(networkMap)[0],
      Object.keys(networkMap[Object.keys(networkMap)[0]].contractInstances)[0]
    ).then((r) => this.setState({graphMetadata: r}));
    this.setState({
      interval: setInterval(() => {
        console.log(this.state);
        getGraphMetadata(
          Object.keys(networkMap)[0],
          Object.keys(networkMap[Object.keys(networkMap)[0]].contractInstances)[0]
        ).then((r) => this.setState({graphMetadata: r}));
      }, EthereumProvider.constants.LONGPOLLING_PERIOD_MS),
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  initializeProvider() {
    this.setState({isProviderDetected: true});
    ethereum.request({method: "eth_chainId"}).then(this.handleChainChanged);
    ethereum.request({method: "eth_accounts"}).then(this.handleAccountsChanged);
    ethereum.request({method: "eth_subscribe", params: ["newHeads"]});
    ethereum.request({method: "eth_blockNumber"}).then((result) => this.setState({blockNumber: result}));

    ethereum.on("accountsChanged", this.handleAccountsChanged);
    ethereum.on("chainChanged", this.handleChainChanged);
    ethereum.on("connect", this.handleConnected);
    ethereum.on("disconnect", this.handleDisconnected);
    ethereum.on("message", this.handleMessage);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    this.setState({ethersProvider: provider});
  }

  // Public Functions //
  async requestAccounts() {
    await this.setState({awaitingUserPermission: true});
    console.debug("Asking users permission to connect.");
    await ethereum.request({method: "eth_requestAccounts"}).catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log("User rejected connecting to Ethereum.");
        this.setState({awaitingUserPermission: false});
      } else if (error.code === -32002) {
        // Handle it
      }
    });
  }

  changeChain(chainId) {
    this.setState({
      chainId: chainId,
      isDeployedOnThisChain: networkMap[chainId]?.contractInstances != null,
    });

    this.fetchMetaEvidenceContents(chainId);
  }

  handleChainChanged(chainId) {
    const {ethersProvider} = this.state;

    this.setState({
      metamaskChainId: chainId,
      contractInstance: networkMap[chainId]?.contractInstances
        ? new ethers.Contract(Object.keys(networkMap[chainId].contractInstances)[0], ABI, ethersProvider.getSigner())
        : null,
    });
  }

  handleAccountsChanged(accounts) {
    if (accounts.length == 0) {
      console.log("Wallet locked.");
    } else {
      console.log("Accounts changed.");
      this.setState({awaitingUserPermission: false});
    }
    this.setState({accounts: accounts});
  }

  handleConnected() {
    console.log("Connected to Ethereum.");
    this.setState({isConnected: true});
  }

  handleDisconnected() {
    console.log("Disconnect to Ethereum.");
    this.setState({isConnected: false});
  }

  handleMessage(message) {
    this.setState({blockNumber: message.data.result.number, timestamp: message.data.result.timestamp});
  }

  async fetchMetaEvidenceContents(chainId) {
    const rawMetaEvidenceList = (await getAllMetaEvidences(chainId))?.map((item) => item.uri);
    if (!rawMetaEvidenceList) return;
    const result = await Promise.allSettled(
      rawMetaEvidenceList?.map((metaEvidenceURI) => fetch(ipfsGateway + metaEvidenceURI).then((r) => r.json()))
    );
    this.setState({metaEvidenceContents: result.map((item) => item.value)});
  }

  render = () => (
    <EthereumContext.Provider
      value={{...this.state, requestAccounts: this.requestAccounts, changeChain: this.changeChain}}
    >
      {" "}
      {this.props.children}
    </EthereumContext.Provider>
  );
}
export const EthereumContext = React.createContext();

const queryTemplate = (endpoint, query) =>
  fetch(endpoint, {
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: query,
    }),
    method: "POST",
    mode: "cors",
  })
    .then((r) => r.json())
    .then((json) => json.data);

export const getArticleByID = (chainID, contractAddress, id) => {
  return queryTemplate(
    networkMap[chainID].contractInstances[contractAddress].subgraph.endpoint,
    networkMap[chainID].contractInstances[contractAddress].subgraph.queries.getArticleByID(id)
  )
    .then((data) => {
      console.log(data);
      if (data && data?.articles[0]) {
        data.articles[0].storageAddress = data?.articleStorages?.[0]?.id;
      }
      return data.articles[0];
    })
    .catch(console.error);
};

export const getGraphMetadata = (chainID, contractAddress) => {
  return queryTemplate(
    networkMap[chainID].contractInstances[contractAddress].subgraph.endpoint,
    networkMap[chainID].contractInstances[contractAddress].subgraph.queries.getGraphMetadata
  )
    .then((r) => r._meta)
    .catch(console.error);
};

export const getAllArticles = (chainID) => {
  return Promise.allSettled(
    Object.entries(networkMap[chainID].contractInstances || {}).map(([key, value]) => {
      return queryTemplate(
        value.subgraph.endpoint,
        value.subgraph.queries.getAllArticles
      ).then((data) => {
        console.log(data);
        if (data && data.articles && data.articles.length > 0) {
          data.articles.map((article) => {
            article.contractAddress = key;
            return article;
          });
          return data.articles;
        }
      });
    })
  )
    .then((r) => r[0]?.value)
    .catch(console.error);
};

export const getArticlesByAuthor = (chainID, walletAddress) => {
  return Promise.allSettled(
    Object.entries(networkMap[chainID].contractInstances || {}).map(([key, value]) => {
      return queryTemplate(
        value.subgraph.endpoint,
        value.subgraph.queries.getArticlesByAuthor(walletAddress)
      ).then((data) => {
        console.log("articles by author",data);
        if (data && data.articles && data.articles.length > 0) {
          data.articles.map((article) => {
            article.contractAddress = key;
            return article;
          });

          return data.articles;
        }
      });
    })
  )
  .then((r) => r[0]?.value)
  .catch(console.error);
}

export const getAllMetaEvidences = (chainID) => {
  return Promise.allSettled(
    Object.entries(networkMap[chainID]?.contractInstances || {}).map(([, value]) => {
      return queryTemplate(
        value.subgraph.endpoint,
        value.subgraph.queries.getAllMetaevidences
      ).then((data) => data.metaEvidenceEntities);
    })
  )
    .then((r) => r[0]?.value)
    .catch(console.error);
};
