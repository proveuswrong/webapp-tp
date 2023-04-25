import { useCallback, useContext, useState } from "react";
import { BigNumber, constants, utils } from "ethers";
import { Radio } from "antd";
import * as styles from "./index.module.scss";

import ProgressBar from "/src/components/presentational/progressBar";
import { EthereumContext, getAllContributors } from "/src/data/ethereumProvider";
import useGraphFetcher from "/src/hooks/useGraphFetcher";

export default function AppealPeriod({ currentRound }) {
  const [value, setValue] = useState(1);
  const { chainId, accounts } = useContext(EthereumContext);
  const onChange = (e) => setValue(e.target.value);
  const { totalToBeRaised, raisedSoFar } = currentRound;

  const fetchData = useCallback(async () => {
    return getAllContributors(chainId);
  }, [chainId]);
  const { data: contributors, isFetching } = useGraphFetcher(fetchData);
  console.log({ contributors, isFetching });

  const yourContributions = contributors && contributors[accounts[0]]?.contributions;
  console.log({ currentRound });

  return (
    <>
      <div className={styles.appealPeriod}>
        <h1 className={styles.title}>Appeal Crowdfunding Status</h1>
        <Radio.Group name="radiogroup" onChange={onChange} value={value}>
          <div className={styles.appealOptions}>
            <div className={styles.option}>
              <div className={styles.topRow}>
                <Radio value={1}>Yes</Radio>
                <EtherValue value={totalToBeRaised[1]} />
              </div>
              <ProgressBar
                percent={getContributionByRuling(yourContributions, currentRound?.id, accounts[0], 1)}
                success={{ percent: getRaisedSoFarPercent(raisedSoFar[1], totalToBeRaised[1]) }}
              />
            </div>
            <div className={styles.option}>
              <div className={styles.topRow}>
                <Radio value={0}>No</Radio>
                <EtherValue value={totalToBeRaised[2]} />
              </div>
              <ProgressBar
                percent={getContributionByRuling(yourContributions, currentRound?.id, accounts[0], 2)}
                success={{ percent: getRaisedSoFarPercent(raisedSoFar[2], totalToBeRaised[2]) }}
              />
            </div>
          </div>
        </Radio.Group>
        <div className={styles.label}>
          <div className={styles.colorBox} /> Your contribution
        </div>
      </div>
      <div>Appel</div>
    </>
  );
}

function EtherValue(props) {
  return <h2>{`${parseFloat(utils.formatUnits(props.value)).toFixed(3)} ${constants.EtherSymbol}`}</h2>;
}

const getRaisedSoFarPercent = (soFar, total) => BigNumber.from(soFar).div(BigNumber.from(total)).toNumber() * 100;

const getContributionByRuling = (contributions, roundID, contributor, ruling) => {
  const contributionId = `${roundID}-${contributor}-${ruling}`;
  const contribution = contributions?.filter((contribution) => contribution.id === contributionId);
  if (!contribution) return 0;
  return contribution.amount;
};
