const articleFragment = `
    id
    articleID
    owner
    bounty
    category
    status
    lastBalanceUpdate
    createdAtBlock
    createdAtTimestamp
    events (orderBy: timestamp, orderDirection: asc) {
       id
       name
       details
       timestamp
       from
    }
    disputes(orderBy: id, orderDirection: asc) {
        id
        ruled
        ruling
        period
        lastPeriodChange
        court{
            id
            policyURI
            hiddenVotes
            timesPerPeriod
        }
        rounds {
            id
            jurySize
            raisedSoFar
            appealDeadline
            hasPaid
        }

    }
    withdrawalPermittedAt
    lastCalculatedScore
    arbitrator{
        id
    }
    arbitratorExtraData
    
`


const environments = {
  prod: {
    networkMap: {
      "0x5": {
        contractInstances: {
          "0xAA51402316075798040c2322D0361383577707ba": {
            subgraph: {
              endpoint: "https://api.thegraph.com/subgraphs/name/proveuswrong/thetruthpost",
              queries: {
                getArticleByID: (id) => `{
                    articles(where: {id: "${id}"}) {
                        ${articleFragment}
                        
                    }
                    articleStorages(where: {articleEntityID: "${id}"}) {
                        id
                        articleEntityID
                      }
                    }`,
                getArticlesByAuthor:(address) => `{
                  articles(where: {owner: "${address}"}){
                    ${articleFragment}
                  }
                }`,
                getAllArticles: `{
                    articles(orderBy: id, orderDirection: asc) {
                        ${articleFragment}
                    }}`,
                getAllMetaevidences: `{
                    metaEvidenceEntities(orderBy: id, orderDirection:asc){
                        id
                        uri
                    }
                }`,
                getGraphMetadata: `{
                    _meta {
                        deployment
                        hasIndexingErrors
                        block {
                            hash
                            number
                        }
                    }
                }`
              }
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
          "0xAA51402316075798040c2322D0361383577707ba": {
            subgraph: {
              endpoint: "https://api.thegraph.com/subgraphs/name/gratestas/thetruthpost-test-goerli",
              queries: {
                getArticleByID: (id) => `{
                    articles(where: {id: "${id}"}) {
                        ${articleFragment}
                    }
                    articleStorages(where: {articleEntityID: "${id}"}) {
                        id
                        articleEntityID
                      }
                    }`,
                getArticlesByAuthor: (address) => `{
                  articles(where: {owner: "${address}"}){
                    ${articleFragment}
                  }
                }`,
                getAllArticles: `{
                    articles(orderBy: id, orderDirection: asc) {
                        ${articleFragment}
                    }}`,
                getAllMetaevidences: `{
                    metaEvidenceEntities(orderBy: id, orderDirection:asc){
                        id
                        uri
                    }
                }`,
                getGraphMetadata: `{
                    _meta {
                        deployment
                        hasIndexingErrors
                        block {
                            hash
                            number
                        }
                    }
                }`
              }
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
