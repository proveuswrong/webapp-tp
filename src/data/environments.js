export default {
  prod: {
    networkMap: {
      "0x5": {
        contractInstances: {
          "0x0136ed2132Ec1e99046889058F67c9C2fd5FD578": {
            subgraph: {
              endpoint: "https://api.thegraph.com/subgraphs/name/proveuswrong/thetruthpost",
              queries: {
                getArticleByID: gql`{
                    articles(where: {id: "${id}"}) {
                        id
                        articleID
                        owner
                        category
                        bounty
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
                        withdrawalPermittedAt
                        lastCalculatedScore
                        arbitrator{
                            id
                        }
                        arbitratorExtraData
                    }
                    articleStorages(where: {articleEntityID: "${id}"}) {
                        id
                        articleEntityID
                    }
                }`,
                getAllArticles: gql`{
                    articles(orderBy: id, orderDirection: asc) {
                        id
                        articleID
                        owner
                        bounty
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
                        withdrawalPermittedAt
                        lastCalculatedScore
                        arbitrator{
                            id
                        }
                        arbitratorExtraData
                    }}`,
                getAllMetaevidences: gql`{
                    metaEvidenceEntities(orderBy: id, orderDirection:asc){
                        id
                        uri
                    }
                }`,
                getGraphMetadata: gql`{
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
                getArticleByID: gql`{
                    articles(where: {id: "${id}"}) {
                        id
                        articleID
                        owner
                        category
                        bounty
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
                        withdrawalPermittedAt
                        lastCalculatedScore
                        arbitrator{
                            id
                        }
                        arbitratorExtraData
                    }
                    articleStorages(where: {articleEntityID: "${id}"}) {
                        id
                        articleEntityID
                    }
                }`,
                getAllArticles: gql`{
                    articles(orderBy: id, orderDirection: asc) {
                        id
                        articleID
                        owner
                        bounty
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
                        withdrawalPermittedAt
                        lastCalculatedScore
                        arbitrator{
                            id
                        }
                        arbitratorExtraData
                    }}`,
                getAllMetaevidences: gql`{
                    metaEvidenceEntities(orderBy: id, orderDirection:asc){
                        id
                        uri
                    }
                }`,
                getGraphMetadata: gql`{
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