import React, { useContext } from "react";
import * as styles from "./index.module.scss";

import Interval from "react-interval-rerender";
import { Tooltip } from "antd";
import { constants, utils } from "ethers";

import getTimePastSinceLastBountyUpdate from "/src/businessLogic/getTimePastSinceLastBountyUpdate";
import getTrustScore from "/src/businessLogic/getTrustScore";
import { EthereumContext } from "/src/data/ethereumProvider";

export default function KeyMetrics(props) {
  const { article, fetchingArticle } = props;
  const ethereumContext = useContext(EthereumContext);
  let reRenderInMs = 1000;

  return (
    <div className={styles.containerKeyMetrics}>
      {article && (
        <span className={styles.trustScore}>
          {" "}
          Trust Score:{" "}
          {fetchingArticle ? (
            "Fetching article"
          ) : (
            <Interval delay={reRenderInMs}>
              {() =>
                getTrustScore(
                  article,
                  getTimePastSinceLastBountyUpdate(
                    article?.lastBalanceUpdate,
                    ethereumContext?.graphMetadata?.block?.number || ethereumContext?.blockNumber
                  )
                )
              }
            </Interval>
          )}
        </span>
      )}
      <Tooltip
        placement="topLeft"
        title={`Last changed ${getTimePastSinceLastBountyUpdate(
          article?.lastBalanceUpdate,
          ethereumContext?.blockNumber
        )} blocks ago.`}
      >
        <span className={styles.bountyAmount}>
          Bounty:{" "}
          {fetchingArticle
            ? "fetching"
            : `${parseFloat(utils.formatUnits(article?.bounty)).toFixed(3)} ${constants.EtherSymbol}`}{" "}
        </span>
      </Tooltip>
    </div>
  );
}
