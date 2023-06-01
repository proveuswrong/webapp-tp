import { commonQueries } from "./graphql/queries";

const environments = {
  prod: {
    networkMap: {
      "0x5": {
        contractInstances: {
          "0xA5002f1f0D0f7c4477d11137f9dDc0F1cEE38Ed3": {
            subgraph: {
              endpoint: "https://api.thegraph.com/subgraphs/name/proveuswrong/thetruthpost",
              queries: commonQueries
            }
          },
        },
      },
    }
  },
  dev: {
    networkMap: {
      "0x5": {
        contractInstances: {
          "0xcA97Bdcca0a07940A4306adc5f8575219293E0dD": {
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

