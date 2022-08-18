import React, {Component} from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import {ipfsGateway} from "../utils/addToIPFS";
import {ethers} from "ethers";
import ABI from "./abi.js";

export default class EthereumProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      chainId: "",
      isConnected: false,
      isProviderDetected: false,
      isDeployedOnThisChain: false,
      metaEvidenceContents: [],
      blockNumber: 0,
      ethersProvider: null,
      awaitingUserPermission: false,
    };

    this.handleChainChanged = this.handleChainChanged.bind(this);
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this);
    this.handleConnected = this.handleConnected.bind(this);
    this.handleDisconnected = this.handleDisconnected.bind(this);
    this.fetchMetaEvidenceContents = this.fetchMetaEvidenceContents.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.requestAccounts = this.requestAccounts.bind(this);

    this.setState = this.setState.bind(this);
  }

  static constants = {
    LONGPOLLING_PERIOD_MS: 10000,
  };

  componentDidMount() {
    detectEthereumProvider({silent: true}).then((provider,) => {
      if (provider) this.initializeProvider();
    });
    getGraphMetadata(Object.keys(contractInstances)[0], Object.keys(contractInstances[Object.keys(contractInstances)[0]])[0]).then(r => this.setState({graphMetadata: r}))
    this.setState({
      interval: setInterval(() => {
        getGraphMetadata(Object.keys(contractInstances)[0], Object.keys(contractInstances[Object.keys(contractInstances)[0]])[0]).then(r => this.setState({graphMetadata: r}))
      }, EthereumProvider.constants.LONGPOLLING_PERIOD_MS)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
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
    ethereum.request({method: "eth_requestAccounts"}).catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log("User rejected connecting to Ethereum.");
        this.setState({awaitingUserPermission: false});
      } else if (error.code === -32002) {
        // Handle it
      } else {
        this.setState({awaitingUserPermission: true});
      }
    });
  }

  handleChainChanged(chainId) {
    console.log("Chain changed.");
    console.log(this.state)
    const {ethersProvider, isProviderDetected} = this.state;

    this.setState({
      chainId: chainId,
      isDeployedOnThisChain: contractInstances[chainId] != null,
    });

    if (isProviderDetected)
      this.setState({
        contractInstance: contractInstances[chainId]
          ? new ethers.Contract(Object.keys(contractInstances[chainId])[0], ABI, ethersProvider.getSigner())
          : null,
      })

    this.fetchMetaEvidenceContents(chainId);
  }

  // End of Public Functions

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
    console.log(this.state)
    console.log(`Block number: ${message.data.result.number}`);
    this.setState({blockNumber: message.data.result.number, timestamp: message.data.result.timestamp});

    console.log(message)
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
    <EthereumContext.Provider value={{...this.state, requestAccounts: this.requestAccounts, changeChain: this.handleChainChanged}}>
      {" "}
      {this.props.children}
    </EthereumContext.Provider>
  );
}
export const EthereumContext = React.createContext();

// Merge these two objects
export const chains = {"0x5": {name: "Ethereum Testnet Görli", shortname: "Görli"}};
export const contractInstances = {
  "0x5": {
    "0x0136ed2132Ec1e99046889058F67c9C2fd5FD578": {
      subgraphEndpoint: "https://api.studio.thegraph.com/query/16016/thetruthpost/1.2.4",
    },
  },
};

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

export const getClaimByID = (chainID, contractAddress, id) => {
  return queryTemplate(
    contractInstances[chainID][contractAddress].subgraphEndpoint,
    `{
  claims(where: {id: "${id}"}) {
    id
    claimID
    owner
    category
    bounty
    status
    lastBalanceUpdate
    createdAtBlock
    createdAtTimestamp
    disputeID
    withdrawalPermittedAt
    lastCalculatedScore
    arbitrator
    arbitratorExtraData
  }
    claimStorages(where: {claimEntityID: "${id}"}) {
    id
    claimEntityID
  }
  }`
  )
    .then((data) => {
      console.log(data);
      if (data && data?.claims[0]) {
        data.claims[0].storageAddress = data?.claimStorages[0]?.id;
      }
      return data.claims[0];
    })
    .catch(console.error);
};

export const getGraphMetadata = (chainID, contractAddress) => {
  return queryTemplate(contractInstances[chainID][contractAddress].subgraphEndpoint,
    `{
                _meta {
                   deployment
                   hasIndexingErrors
                   block {
                     hash
                     number
                    }
                  }
                }`)
    .then(r => r._meta)
    .catch(console.error);
};

export const getAllClaims = (chainID) => {
  return Promise.allSettled(
    Object.entries(contractInstances[chainID] || {}).map(([key, value]) => {
      return queryTemplate(
        value.subgraphEndpoint,
        `{
  claims(orderBy: id, orderDirection: asc) {
    id
    claimID
    owner
    bounty
    status
    lastBalanceUpdate
    createdAtBlock
    createdAtTimestamp
    disputeID
    withdrawalPermittedAt
    lastCalculatedScore
    arbitrator
    arbitratorExtraData
  }}`
      ).then((data) => {
        console.log(data)
        if (data && data.claims && data.claims.length > 0) {

          data.claims.map((claim) => {
            claim.contractAddress = key;
            return claim;
          });
          return data.claims;
        }
      });
    })
  )
    .then((r) => r[0]?.value)
    .catch(console.error);
};

export const getAllMetaEvidences = (chainID) => {
  return Promise.allSettled(
    Object.entries(contractInstances[chainID] || {}).map(([, value]) => {
      return queryTemplate(
        value.subgraphEndpoint,
        `{
  metaEvidenceEntities(orderBy: id, orderDirection:asc){
    id
    uri
  }
}`
      ).then((data) => data.metaEvidenceEntities);
    })
  )
    .then((r) => r[0]?.value)
    .catch(console.error);
};
