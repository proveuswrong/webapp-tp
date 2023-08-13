import { Address } from "viem";
import { environment } from "../data/environments";
import { commonQueries } from "../data/graphql/queries";

type Subgraph = {
  endpoint: string;
  queries: typeof commonQueries;
};

export type Deployment = {
  [key: Address]: {
    subgraph: Subgraph;
  };
};

export type NetworkMap = {
  [key: string]: {
    name?: string;
    shortname?: string;
    default: boolean;
    explorerURL?: (address: string) => string;
    deployments: Deployment;
  };
};
export const networkMap: NetworkMap = {
  "0x5": {
    name: "Ethereum Testnet Görli",
    shortname: "Görli",
    default: environment.networkMap["0x5"].default,
    explorerURL: (address: string) => `https://goerli.etherscan.io/address/${address}`,
    deployments: environment.networkMap["0x5"].deployments,
  },
  "0x1": {
    name: "Ethereum Mainnet",
    shortname: "Mainnet",
    default: environment.networkMap["0x1"].default,
    explorerURL: (address: string) => `https://etherscan.io/address/${address}`,
    deployments: environment.networkMap["0x1"].deployments,
  },
};

export const isDeployedOnThisChain = (chainId: string): Boolean => networkMap[chainId].deployments === null;
export const isSupportedNetwork = (chainId: string): Boolean => Object.keys(networkMap).includes(chainId);
export const getDefaultNetwork = (): string => {
  const defaultNetworkKeys = Object.keys(networkMap).filter((key) => networkMap[key].default);

  if (defaultNetworkKeys.length !== 1)
    throw new Error("There must be exactly one default network defined in the network map.");

  return defaultNetworkKeys[0];
};
