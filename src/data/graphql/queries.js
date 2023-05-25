import { articleFragment } from "./fragments";

const gql = (strings, ...values) => {
    let query = '';

    // Interpolate the strings and values
    for (let i = 0; i < strings.length; i++) {
        query += strings[i];
        if (i < values.length) {
            query += values[i];
        }
    }

    return query.trim();
};

export const commonQueries = {
    getArticleByID: (id) => gql`{
      articles(where: {id: "${id}"}) {
        ${articleFragment}
      }
      articleStorages(where: {articleEntityID: "${id}"}) {
        id
        articleEntityID
      }
    }`,
    getArticlesByAuthor: (address) => gql`{
      articles(where: {owner: "${address}"}){
        ${articleFragment}
      }
    }`,
    getLastArticleByAuthor: (address) => gql`{
      articles(first: 1, orderBy: createdAtBlock, orderDirection: desc, where: {owner: "${address}"}){
        id
      }
    }`,
    getAllArticles: gql`{
      articles(orderBy: id, orderDirection: asc) {
        ${articleFragment}
      }
    }`,
    getCourtByID: (id) => gql`{
      courtEntity(id: ${id}){
        policyURI
        timesPerPeriod
        hiddenVotes
      }
    }`,
    getAllMetaevidences: gql`{
      metaEvidenceEntities(orderBy: id, orderDirection: asc){
        id
        uri
      }
    }`,
    getAllContributors: gql`{
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
    getRewardsByID: (id) => gql`{
      rewardEntity(id:"${id}"){
        id
        totalWithdrawableAmount
        withdrew
      }
    }`,
    getContributorByID: (id) => gql`{
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
    getGraphMetadata: gql`{
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

