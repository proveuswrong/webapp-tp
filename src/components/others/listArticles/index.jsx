import React, { useState, useEffect, useContext } from "react";
import * as styles from "./index.module.scss";

import ListArticlesItem from "/src/components/presentational/listArticlesItem";
import Pill from "/src/components/presentational/pill";

import { EthereumContext } from "/src/data/ethereumProvider";
import getTrustScore from "/src/businessLogic/getTrustScore";
import getTimePastSinceLastBountyUpdate from "/src/businessLogic/getTimePastSinceLastBountyUpdate";
import { ipfsGateway } from "/src/utils/addToIPFS";

export default function ListArticles({ articles, isFetching }) {
  const [articleContents, setArticleContents] = useState();
  const ethereumContext = useContext(EthereumContext);

  const [loadingFetchingContents, setFetchingArticlesContents] = useState(true);

  useEffect(() => {
    let didCancel = false;

    if (!articles) {
      setFetchingArticlesContents(false);
      return;
    }
    const fetchArticleData = async () => {
      try {
        const fetchPromises = articles
          .filter((a) => a != null)
          .map(async (article) => {
            try {
              const response = await fetch(ipfsGateway + article?.articleID);
              if (!response.ok) {
                throw new Error("Network response was not OK");
              }
              const data = await response.json();
              return {
                articleID: article.articleID,
                title: data.title,
                description: data.description,
              };
            } catch (error) {
              console.error(error);
              return null;
            }
          });

        const articleData = await Promise.all(fetchPromises);
        const fetchedArticleContents = articleData.reduce(
          (prevState, data) => ({
            ...prevState,
            [data.articleID]: { title: data.title, description: data.description },
          }),
          {}
        );

        if (!didCancel) {
          setArticleContents(fetchedArticleContents);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!didCancel) {
          setFetchingArticlesContents(false);
        }
      }
    };

    fetchArticleData();
    return () => {
      didCancel = true;
    };
  }, [articles]);

  return (
    <>
      <div className={styles.containerItems}>
        {articles &&
          Object.entries(articles.filter((c) => c != null))
            .sort(([, item1], [, item2]) => sortAccordingToTrustScore(item1, item2, ethereumContext))
            .map(([_key, value], index) => (
              <ListArticlesItem
                key={value?.id}
                title={
                  articleContents?.[value?.articleID]?.title ||
                  (!loadingFetchingContents && `Unable to fetch article data from ${value?.articleID}`)
                }
                description={articleContents?.[value?.articleID]?.description}
                linkTo={`/${ethereumContext?.chainId}/${value?.contractAddress}/${value?.id}/`}
                score={getTrustScore(
                  value,
                  getTimePastSinceLastBountyUpdate(
                    value?.lastBalanceUpdate,
                    ethereumContext?.graphMetadata?.block?.number || ethereumContext?.blockNumber
                  )
                )}
                createdAt={value?.createdAtTimestamp}
                excerptSize={index % 2 == 1 ? 3 : 1}
              >
                <Pill modifiers="small">{value?.status}</Pill>
              </ListArticlesItem>
            ))}
      </div>
      {!isFetching &&
        (articles == null || (articles && articles.filter((a) => a != null).length == 0)) &&
        "No news articles."}
      {articles && loadingFetchingContents && "Fetching article details."}
    </>
  );
}

const sortAccordingToTrustScore = (item1, item2, ethereumContext) =>
  getTrustScore(
    item2,
    getTimePastSinceLastBountyUpdate(
      item2?.lastBalanceUpdate,
      ethereumContext?.graphMetadata?.block?.number || ethereumContext?.blockNumber
    )
  ) -
  getTrustScore(
    item1,
    getTimePastSinceLastBountyUpdate(
      item1?.lastBalanceUpdate,
      ethereumContext?.graphMetadata?.block?.number || ethereumContext?.blockNumber
    )
  );
