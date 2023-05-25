import { articleFragment } from "./fragments";

export const commonQueries = {
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
    getLastArticleByAuthor: (address) => `{
      articles(first: 1, orderBy: createdAtBlock, orderDirection: desc, where: {owner: "${address}"}){
        id
      }
    }`,
    getAllArticles: `{
      articles(orderBy: id, orderDirection: asc) {
        ${articleFragment}
      }
    }`,
    getCourtByID: (id) => `{
      courtEntity(id: ${id}){
        policyURI
        timesPerPeriod
        hiddenVotes
      }
    }`,
    getAllMetaevidences: `{
      metaEvidenceEntities(orderBy: id, orderDirection: asc){
        id
        uri
      }
    }`,
    getAllContributors: `{
      users(orderBy: id){
        id
        totalWithdrawableAmount
        withdrew
        contributions{
          id
          amount
        }
      }
    }`,
    getRewardsByID: (id) => `{
      rewardEntity(id:"${id}"){
        id
        totalWithdrawableAmount
        withdrew
      }
    }`,
    getContributorByID: (id) => `{
      user(id:"${id}"){
        id
        totalWithdrawableAmount
        withdrew
        contributions{
          id
          amount
        }
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
    }`,
};

