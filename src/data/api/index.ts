import { Address } from "viem";
import { networkMap } from "../../connectors/networks";

const queryTemplate = (endpoint: string, query: any) =>
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

export const getGraphMetadata = async (chainID: string, contractAddress: Address) => {
  try {
    const data = await queryTemplate(
      networkMap[chainID].deployments[contractAddress].subgraph.endpoint,
      networkMap[chainID].deployments[contractAddress].subgraph.queries.getGraphMetadata
    );
    return data._meta;
  } catch (error) {
    return console.error(error);
  }
};

export const getAllArticles = (chainID: string) => {
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

export const getArticleByID = (chainID: string, contractAddress: string, id: string) => {
  return queryTemplate(
    networkMap[chainID].deployments[contractAddress].subgraph.endpoint,
    networkMap[chainID].deployments[contractAddress].subgraph.queries.getArticleByID(id)
  )
    .then((data) => {
      if (data && data?.articles[0]) {
        data.articles[0].storageAddress = data?.articleStorages?.[0]?.id;
      }
      return data.articles[0];
    })
    .catch(console.error);
};

export const getArticlesByAuthor = (chainID: string, walletAddress: Address) => {
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

export const getAllContributors = (chainID: string) => {
  return Promise.allSettled(
    Object.entries(networkMap[chainID].deployments || {}).map(([_, value]) => {
      return queryTemplate(value.subgraph.endpoint, value.subgraph.queries.getAllContributors).then((data) => {
        console.log("contributors", data);
        return data.users;
      });
    })
  )
    .then((r) => r[0]?.value)
    .catch(console.error);
};

export const getAllMetaEvidences = (chainID: string) => {
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

export const getCourtById = async (chainId: string, contractAddress: Address, id: string) => {
  return queryTemplate(
    networkMap[chainId].deployments[contractAddress].subgraph.endpoint,
    networkMap[chainId].deployments[contractAddress].subgraph.queries.getCourtByID(id)
  ).then((data) => {
    console.log({ data });
    return data?.courtEntity;
  });
};

export const getLastArticleByAuthor = (chainID: string, walletAddress: Address) => {
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

export const getRewardsByID = (chainID: string, id: string) => {
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

export const getContributorByID = (chainID: string, walletAddress: Address) => {
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
