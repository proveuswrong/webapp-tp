import React, { useContext } from "react";
import * as styles from "./index.module.scss";

import Interval from "react-interval-rerender";
import { Tooltip } from "antd";
import { constants, utils } from "ethers";

import getTimePastSinceLastBountyUpdate from "/src/businessLogic/getTimePastSinceLastBountyUpdate";
import getTrustScore from "/src/businessLogic/getTrustScore";
import { EthereumContext } from "/src/data/ethereumProvider";

export default function KeyMetrics({ article }) {
  const { graphMetadata, blockNumber } = useContext(EthereumContext);
  let reRenderInMs = 1000;

  const currentBlockNumber = graphMetadata?.block?.number || blockNumber;
  return (
    <div className={styles.containerKeyMetrics}>
      {article && (
        <>
          <div className={styles.trustScore}>
            Trust Score:{" "}
            <Interval delay={reRenderInMs}>
              {() =>
                getTrustScore(article, getTimePastSinceLastBountyUpdate(article.lastBalanceUpdate, currentBlockNumber))
              }
            </Interval>
            <Tooltip placement="top" title="Etherblock = Deposited Ethers x Elapsed Blocks">
              <span className={styles.unit}>Etherblocks</span>
            </Tooltip>
          </div>
        </>
      )}
      <Tooltip
        placement="topLeft"
        title={`Last changed ${getTimePastSinceLastBountyUpdate(
          article.lastBalanceUpdate,
          currentBlockNumber
        )} blocks ago.`}
      >
        <span className={styles.bountyAmount}>
          Bounty: {parseFloat(utils.formatUnits(article.bounty)).toFixed(3)} {constants.EtherSymbol}
        </span>
      </Tooltip>
    </div>
  );
}
