import { useCallback, useContext, useState } from "react";
import { BigNumber, constants, utils } from "ethers";
import { Radio } from "antd";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";
import ProgressBar from "/src/components/presentational/progressBar";
import { EthereumContext, getAllContributors } from "/src/data/ethereumProvider";
import useGraphFetcher from "/src/hooks/useGraphFetcher";

const OPTIONS = Object.freeze({
  Yes: 1,
  No: 2,
});

export default function AppealPeriod({ currentRound }) {
  const [supportedRuling, setSupportedRuling] = useState(1);
  const { chainId, accounts, contractInstance, ethersProvider } = useContext(EthereumContext);
  const { totalToBeRaised, raisedSoFar } = currentRound;

  const fetchData = useCallback(() => {
    return getAllContributors(chainId);
  }, [chainId]);

  const { data: contributors, isFetching } = useGraphFetcher(fetchData);

  const connectedAccount = contributors && contributors.find((c) => c.id === accounts[0]);
  console.log({ connectedAccount });
  const onChange = (e) => setSupportedRuling(e.target.value);

  const handleFundAppeal = async (amount) => {
    try {
      const unsignedTx = await contractInstance.populateTransaction.fundAppeal(
        currentRound?.dispute?.id,
        supportedRuling,
        {
          value: utils.parseEther(amount.toString()),
        }
      );
      const tx = await ethersProvider.getSigner().sendTransaction(unsignedTx);
      await tx.wait();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className={styles.appealPeriod}>
        <h1 className={styles.title}>Appeal Crowdfunding Status</h1>
        <Radio.Group name="radiogroup" onChange={onChange} value={supportedRuling}>
          <div className={styles.appealOptions}>
            <div className={styles.option}>
              <div className={styles.topRow}>
                <Radio value={OPTIONS.Yes}>Yes</Radio>
                <EtherValue value={totalToBeRaised[OPTIONS.Yes]} />
              </div>
              <ProgressBar
                percent={getPercentage(raisedSoFar[OPTIONS.Yes], totalToBeRaised[OPTIONS.Yes])}
                // success={{ percent: getPercentage(raisedSoFar[OPTIONS.Yes], totalToBeRaised[OPTIONS.Yes]) }}
                success={{
                  percent: getPercentage(
                    getContributionByRuling(connectedAccount, currentRound?.id, OPTIONS.Yes),
                    totalToBeRaised[OPTIONS.Yes]
                  ),
                }}
              />
            </div>
            <div className={styles.option}>
              <div className={styles.topRow}>
                <Radio value={OPTIONS.No}>No</Radio>
                <EtherValue value={totalToBeRaised[OPTIONS.No]} />
              </div>
              <ProgressBar
                percent={getPercentage(
                  getContributionByRuling(connectedAccount, currentRound?.id, OPTIONS.No),
                  totalToBeRaised[OPTIONS.No]
                )}
                success={{ percent: getPercentage(raisedSoFar[OPTIONS.No], totalToBeRaised[OPTIONS.No]) }}
              />
            </div>
          </div>
        </Radio.Group>
        <div className={styles.label}>
          <div className={styles.colorBox} /> Your contribution
        </div>
      </div>
      <CustomButton>Fund Appeal</CustomButton>
    </>
  );
}

function EtherValue(props) {
  return <h2>{`${parseFloat(utils.formatUnits(props.value)).toFixed(3)} ${constants.EtherSymbol}`}</h2>;
}

const getPercentage = (amount, total) => {
  amount = BigNumber.from(amount);
  total = BigNumber.from(total);
  return amount.mul(100).div(total).toNumber();
};

const getContributionByRuling = (contributor, roundID, ruling) => {
  if (!contributor || !roundID || !ruling) return 0;

  const contributionId = `${roundID}-${contributor?.id}-${ruling}`;
  const contribution = contributor?.contributions?.find((contribution) => contribution.id === contributionId);
  console.log(`amount for ruling ${ruling} is ${contribution?.amount}`);
  return contribution?.amount ?? 0;
};
