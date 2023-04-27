import { useCallback, useContext, useState } from "react";
import { BigNumber, constants, utils } from "ethers";
import { Radio, Tooltip } from "antd";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";
import ProgressBar from "/src/components/presentational/progressBar";
import { EthereumContext, getAllContributors } from "/src/data/ethereumProvider";
import useGraphFetcher from "/src/hooks/useGraphFetcher";

export default function AppealPeriod({ currentRound }) {
  const [supportedRuling, setSupportedRuling] = useState(1);
  const { chainId, accounts, contractInstance, ethersProvider, metaEvidenceContents } = useContext(EthereumContext);
  const { totalToBeRaised, raisedSoFar } = currentRound;

  console.log({ metaEvidenceContents });
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
        <h3 className={styles.title}>Appeal Crowdfunding Status</h3>
        <Radio.Group name="radiogroup" onChange={onChange} value={supportedRuling}>
          <div className={styles.appealOptions}>
            {metaEvidenceContents[0]?.rulingOptions?.titles?.map((title, index) => {
              const rulingOption = index + 1;
              const contributedByAccount = getContributionByRuling(connectedAccount, currentRound?.id, rulingOption);
              return (
                <div key={rulingOption} className={styles.option}>
                  <div className={styles.topRow}>
                    <Radio value={rulingOption}>{title}</Radio>
                    <EtherValue value={totalToBeRaised[rulingOption]} />
                  </div>
                  <Tooltip
                    placement="top"
                    title={`Raised so far: ${formatToEther(raisedSoFar[rulingOption])} ${
                      constants.EtherSymbol
                    } / Your contribution: ${formatToEther(contributedByAccount)} ${constants.EtherSymbol}`}
                  >
                    <ProgressBar
                      percent={getPercentage(raisedSoFar[rulingOption], totalToBeRaised[rulingOption])}
                      // success={{ percent: getPercentage(raisedSoFar[rulingOption], totalToBeRaised[rulingOption]) }}
                      success={{
                        percent: getPercentage(contributedByAccount, totalToBeRaised[rulingOption]),
                      }}
                    />
                  </Tooltip>
                </div>
              );
            })}
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

const formatToEther = (value) => parseFloat(utils.formatUnits(value)).toFixed(3);

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
