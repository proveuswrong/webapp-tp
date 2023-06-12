import React, { useEffect, useState } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";

import ABI from "./ABI.json";
import { environment } from "./environments";

import notifyWithToast, { MESSAGE_TYPE } from "../utils/notifyWithTost";
import { ipfsGateway } from "../utils/addToIPFS";

export const networkMap = {
  "0x5": {
    name: "Ethereum Testnet Görli",
    shortname: "Görli",
    default: environment.networkMap["0x5"].default,
    explorerURL: (address) => `https://goerli.etherscan.io/address/${address}`,
    deployments: environment.networkMap["0x5"].deployments,
  },
  "0x1": {
    name: "Ethereum Mainnet",
    shortname: "Mainnet",
    default: environment.networkMap["0x1"].default,
    explorerURL: (address) => `https://etherscan.io/address/${address}`,
    deployments: environment.networkMap["0x1"].deployments,
  },
};

const LONGPOLLING_PERIOD_MS = 20000;

const initializeContract = (chainId) => new ethers.Contract(Object.keys(networkMap[chainId].deployments)[0], ABI);
const getDefaultNetwork = () => {
  const defaultNetworkKeys = Object.keys(networkMap).filter((key) => networkMap[key].default);

  if (defaultNetworkKeys.length !== 1)
    throw new Error("There must be exactly one default network defined in the network map.");

  return defaultNetworkKeys[0];
};

const EthereumProvider = ({ children }) => {
  const [metamaskChainId, setMetamaskChainId] = useState(null);
  const [chainId, setChainId] = useState(getDefaultNetwork());
  const [accounts, setAccounts] = useState([]);
  const [isProviderDetected, setProviderDetected] = useState(false);
  const [isDeployedOnThisChain, setDeployedOnThisChain] = useState();
  const [awaitingUserPermission, setAwaitingUserPermission] = useState(false);
  const [graphMetadata, setGraphMetadata] = useState({});
  const [blockNumber, setBlockNumber] = useState(0);
  const [ethersProvider, setEthersProvider] = useState(null);
  const [contractInstance, setContractInstance] = useState();
  const [metaEvidenceContents, setMetaEvidenceContents] = useState([]);

  useEffect(() => {
    const initializeProvider = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        setProviderDetected(true);
        handleChainChange(await provider.request({ method: "eth_chainId" }));
        handleAccountsChange(await provider.request({ method: "eth_accounts" }));
        setBlockNumber(await provider.request({ method: "eth_blockNumber" }));
        setEthersProvider(new ethers.providers.Web3Provider(window.ethereum));

        provider.request({ method: "eth_subscribe", params: ["newHeads"] });
        provider.on("chainChanged", handleChainChange);
        provider.on("accountsChanged", handleAccountsChange);
        provider.on("message", handleMessage);
      } else {
        console.error("No Ethereum provider found.");
      }
    };

    initializeProvider();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("chainChanged", handleChainChange);
        window.ethereum.removeListener("accountsChanged", handleAccountsChange);
        window.ethereum.removeListener("message", handleMessage);
      }
    };
  }, []);

  useEffect(() => {
    if (!chainId) return;

    const isDeployed = networkMap[chainId].deployments !== null;
    setDeployedOnThisChain(isDeployed);
    if (isDeployed) setContractInstance(initializeContract(chainId));

    const fetchGraphMetadata = async (targetChainId) => {
      const res = await getGraphMetadata(targetChainId, Object.keys(networkMap[targetChainId].deployments)[0]);
      setGraphMetadata(res);
    };

    fetchMetaEvidenceContents(chainId);
    fetchGraphMetadata(chainId);
    const pollingInterval = setInterval(() => fetchGraphMetadata(chainId), LONGPOLLING_PERIOD_MS);

    return () => {
      clearInterval(pollingInterval);
    };
  }, [chainId]);

  const handleMessage = (message) => setBlockNumber(message.data.result.number);
  const handleAccountsChange = (newAccounts) => setAccounts(newAccounts);

  const handleChainChange = (targetChainId) => {
    setMetamaskChainId(targetChainId);
    if (!chainId) switchAppChain(targetChainId);
    if (Object.keys(networkMap).includes(targetChainId))
      setEthersProvider(new ethers.providers.Web3Provider(window.ethereum));
  };

  const switchAppChain = (targetChainId) => {
    setChainId(targetChainId);
  };

  const requestAccounts = async () => {
    setAwaitingUserPermission(true);
    await ethereum.request({ method: "eth_requestAccounts" }).catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log("User rejected connecting to Ethereum.");
        setAwaitingUserPermission(false);
      } else if (error.code === -32002) {
        // Handle it
      }
    });
    setAwaitingUserPermission(false);
  };

  const fetchMetaEvidenceContents = async (chainId) => {
    const rawMetaEvidenceList = (await getAllMetaEvidences(chainId))?.map((item) => item.uri);
    if (!rawMetaEvidenceList) return;
    const result = await Promise.allSettled(
      rawMetaEvidenceList?.map((metaEvidenceURI) => fetch(ipfsGateway + metaEvidenceURI).then((r) => r.json()))
    );
    setMetaEvidenceContents(result.map((item) => item.value));
  };

  const sendTransaction = async (unsignedTx) => {
    console.log({ ethersProvider });
    await notifyWithToast(
      ethersProvider
        .getSigner()
        .sendTransaction(unsignedTx)
        .then((tx) => tx.wait()),
      MESSAGE_TYPE.transaction
    );
  };

  const invokeCall = async (methodName, args) => {
    if (chainId !== metamaskChainId) {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
      return null;
    } else {
      return await contractInstance.connect(ethersProvider)[methodName](...args);
    }
  };

  const invokeTransaction = async (methodName, args, value) => {
    if (!accounts[0]) await requestAccounts();

    if (chainId !== metamaskChainId) {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    } else {
      const unsignedTx = await contractInstance.populateTransaction[methodName](...args, { value });
      await sendTransaction(unsignedTx);
    }
  };

  return (
    <EthereumContext.Provider
      value={{
        accounts,
        awaitingUserPermission,
        blockNumber,
        chainId,
        ethersProvider,
        graphMetadata,
        invokeCall,
        invokeTransaction,
        metaEvidenceContents,
        isDeployedOnThisChain,
        isProviderDetected,
        metamaskChainId,
        requestAccounts,
        switchAppChain,
      }}
    >
      {children}
    </EthereumContext.Provider>
  );
};

export default EthereumProvider;
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

export const getCourtById = async (chainId, contractAddress, id) => {
  return queryTemplate(
    networkMap[chainId].deployments[contractAddress].subgraph.endpoint,
    networkMap[chainId].deployments[contractAddress].subgraph.queries.getCourtByID(id)
  ).then((data) => {
    console.log({ data });
    return data?.courtEntity;
  });
};

export const getArticleByID = (chainID, contractAddress, id) => {
  return queryTemplate(
    networkMap[chainID].deployments[contractAddress].subgraph.endpoint,
    networkMap[chainID].deployments[contractAddress].subgraph.queries.getArticleByID(id)
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
  // if(!chainID || !contractAddress) return;
  return queryTemplate(
    networkMap[chainID].deployments[contractAddress].subgraph.endpoint,
    networkMap[chainID].deployments[contractAddress].subgraph.queries.getGraphMetadata
  )
    .then((r) => r._meta)
    .catch(console.error);
};

export const getAllArticles = (chainID) => {
  return Promise.allSettled(
    Object.entries(networkMap[chainID].deployments || {}).map(([key, value]) => {
      return queryTemplate(value.subgraph.endpoint, value.subgraph.queries.getAllArticles).then((data) => {
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
    .then((r) => r[0]?.value ?? [])
    .catch(console.error);
};

export const getArticlesByAuthor = (chainID, walletAddress) => {
  return Promise.allSettled(
    Object.entries(networkMap[chainID].deployments || {}).map(([key, value]) => {
      return queryTemplate(value.subgraph.endpoint, value.subgraph.queries.getArticlesByAuthor(walletAddress)).then(
        (data) => {
          console.log("articles by author", data);
          if (data && data.articles && data.articles.length > 0) {
            data.articles.map((article) => {
              article.contractAddress = key;
              return article;
            });

            return data.articles;
          }
        }
      );
    })
  )
    .then((r) => r[0]?.value ?? [])
    .catch(console.error);
};

export const getLastArticleByAuthor = (chainID, walletAddress) => {
  return Promise.allSettled(
    Object.entries(networkMap[chainID].deployments || {}).map(([key, value]) => {
      return queryTemplate(value.subgraph.endpoint, value.subgraph.queries.getLastArticleByAuthor(walletAddress)).then(
        (data) => {
          console.log("last article by author", data);
          if (data && data.articles && data.articles.length > 0) {
            data.articles.map((article) => {
              article.contractAddress = key;
              return article;
            });

            return data.articles;
          }
        }
      );
    })
  )
    .then((r) => r[0]?.value[0])
    .catch(console.error);
};

export const getAllContributors = (chainID) => {
  return Promise.allSettled(
    Object.entries(networkMap[chainID].deployments || {}).map(([key, value]) => {
      return queryTemplate(value.subgraph.endpoint, value.subgraph.queries.getAllContributors).then((data) => {
        console.log("contributors", data);
        return data.users;
      });
    })
  )
    .then((r) => r[0]?.value)
    .catch(console.error);
};

export const getRewardsByID = (chainID, id) => {
  return Promise.allSettled(
    Object.entries(networkMap[chainID].deployments || {}).map(([_, value]) => {
      return queryTemplate(value.subgraph.endpoint, value.subgraph.queries.getRewardsByID(id)).then((data) => {
        console.log("rewards by ID", data);
        return data.rewardEntity;
      });
    })
  )
    .then((r) => r[0]?.value)
    .catch(console.error);
};

export const getContributorByID = (chainID, walletAddress) => {
  return Promise.allSettled(
    Object.entries(networkMap[chainID].deployments || {}).map(([key, value]) => {
      return queryTemplate(value.subgraph.endpoint, value.subgraph.queries.getContributorByID(walletAddress)).then(
        (data) => {
          console.log("contributor by ID", data);
          return data.user;
        }
      );
    })
  )
    .then((r) => r[0]?.value)
    .catch(console.error);
};

export const getAllMetaEvidences = (chainID) => {
  return Promise.allSettled(
    Object.entries(networkMap[chainID]?.deployments || {}).map(([, value]) => {
      return queryTemplate(value.subgraph.endpoint, value.subgraph.queries.getAllMetaevidences).then(
        (data) => data.metaEvidenceEntities
      );
    })
  )
    .then((r) => r[0]?.value)
    .catch(console.error);
};
