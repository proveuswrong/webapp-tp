import React, { useState, useContext } from "react";
import * as styles from "./index.module.scss";

import ListArticlesItem from "/src/components/presentational/listArticlesItem";
import Pagination from "/src/components/presentational/pagination";
import Pill from "/src/components/presentational/pill";

import { EthereumContext } from "/src/data/ethereumProvider";
import getTrustScore from "/src/businessLogic/getTrustScore";
import getTimePastSinceLastBountyUpdate from "/src/businessLogic/getTimePastSinceLastBountyUpdate";

const ITEMS_PER_PAGE = 8;

export default function ListArticles({ articles }) {
  const [currentPage, setCurrentPage] = useState(1);

  const { blockNumber, graphMetadata } = useContext(EthereumContext);
  const currentBlockNumber = graphMetadata?.block?.number || blockNumber;

  if (articles.length === 0) return <div>No news articles</div>;
  return (
    <>
      <div className={styles.containerItems}>
        {articles
          .sort((item1, item2) => sortAccordingToTrustScore(item1, item2, currentBlockNumber))
          .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
          .map((article, index) => {
            const { id, title, description, contractAddress, status, lastBalanceUpdate } = article;
            const linkTo = `${contractAddress}/${id}`;
            const score = getTrustScore(
              article,
              getTimePastSinceLastBountyUpdate(lastBalanceUpdate, currentBlockNumber)
            );
            const createdAt = article.createdAtTimestamp;
            const excerptSize = index % 2 === 1 ? 3 : 1;
            return (
              <ListArticlesItem {...{ key: id, title, description, linkTo, score, createdAt, excerptSize }}>
                <Pill modifiers="small">{status}</Pill>
              </ListArticlesItem>
            );
          })}
      </div>

      <Pagination
        current={currentPage}
        pageSize={ITEMS_PER_PAGE}
        total={articles.length}
        onChange={(pageIndex) => setCurrentPage(pageIndex)}
      />
    </>
  );
}

const sortAccordingToTrustScore = (item1, item2, currentBlockNumber) =>
  getTrustScore(item2, getTimePastSinceLastBountyUpdate(item2.lastBalanceUpdate, currentBlockNumber)) -
  getTrustScore(item1, getTimePastSinceLastBountyUpdate(item1.lastBalanceUpdate, currentBlockNumber));
