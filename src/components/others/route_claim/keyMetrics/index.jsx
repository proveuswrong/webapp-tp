import React, { useContext } from "react";
import * as styles from "./index.module.scss";

import Interval from "react-interval-rerender";
import { Tooltip } from "antd";
import { constants, utils } from "ethers";

import getTimePastSinceLastBountyUpdate from "/src/businessLogic/getTimePastSinceLastBountyUpdate";
import getTrustScore from "/src/businessLogic/getTrustScore";
import { EthereumContext } from "/src/data/ethereumProvider";

export default function KeyMetrics(props) {
  const { claim, fetchingClaim } = props;
  const ethereumContext = useContext(EthereumContext);
  let reRenderInMs = 1000;

  return (
    <div className={styles.containerKeyMetrics}>
      {claim && (
        <span className={styles.trustScore}>
          {" "}
          Trust Score:{" "}
          {fetchingClaim ? (
            "Fetching claim"
          ) : (
            <Interval delay={reRenderInMs}>
              {() =>
                getTrustScore(
                  claim,
                  getTimePastSinceLastBountyUpdate(
                    claim?.lastBalanceUpdate,
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
        title={`Last changed ${getTimePastSinceLastBountyUpdate(claim, ethereumContext?.blockNumber)} blocks ago.`}
      >
        <span className={styles.bountyAmount}>
          Bounty:{" "}
          {fetchingClaim
            ? "fetching"
            : `${parseFloat(utils.formatUnits(claim?.bounty)).toFixed(3)} ${constants.EtherSymbol}`}{" "}
        </span>
      </Tooltip>
    </div>
  );
}
