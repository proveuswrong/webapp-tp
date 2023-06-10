import { commonQueries } from "./graphql/queries";

const environments = {
  prod: {
    networkMap: {
      "0x1": {
        deployments: {
          "0x87aade1067ed0276ec9bef6db8e17abe27a6b454": {
            subgraph: {
              endpoint: "https://api.thegraph.com/subgraphs/name/proveuswrong/thetruthpost-ethereum",
              queries: commonQueries
            }
          },
        },
      },
      "0x5": {
        deployments: {
          "0x1B6B1381781fB6BA1ee271CCD9Fad9a1bb70fA24": {
            subgraph: {
              endpoint: "https://api.thegraph.com/subgraphs/name/proveuswrong/thetruthpost-goerli",
              queries: commonQueries
            }
          },
        },
      },
    }
  },
  dev: {
    networkMap: {
      "0x1": {
        deployments: {
          "0x87aade1067ed0276ec9bef6db8e17abe27a6b454": {
            subgraph: {
              endpoint: "https://api.thegraph.com/subgraphs/name/proveuswrong/thetruthpost-ethereum",
              queries: commonQueries
            }
          },
        },
      },
      "0x5": {
        deployments: {
          "0x1B6B1381781fB6BA1ee271CCD9Fad9a1bb70fA24": {
            subgraph: {
              endpoint: "https://api.thegraph.com/subgraphs/name/proveuswrong/thetruthpost-goerli",
              queries: commonQueries
            }
          },
        },
      },
    }
  },
};

const isProd = (branchName, isPullRequest) => {
  if (!branchName || typeof isPullRequest == 'undefined') return false;
  return branchName === 'main'
    || branchName.startsWith('hotfix/')
    || branchName.startsWith('release/')
    || (branchName === 'develop' && process.env.PULL_REQUEST === 'true');
}


const selectedEnvironment = isProd(process.env.HEAD, process.env.PULL_REQUEST) ? "prod" : "dev";
export let environment = environments[selectedEnvironment];


console.debug(`Environment: ${selectedEnvironment}`);
console.debug(`Head: ${process.env.HEAD}`);
console.debug(`Pull Request: ${process.env.PULL_REQUEST}`);
console.debug(`Commit Ref: ${process.env.COMMIT_REF?.substring(0, 7)}`);
console.debug(`Review ID: ${process.env.REVIEW_ID}`);

