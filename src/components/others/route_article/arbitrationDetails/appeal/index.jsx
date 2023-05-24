import { useCallback, useContext, useState } from "react";
import { constants, utils } from "ethers";
import { Radio } from "antd";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";
import CrowdfundingCard from "./croudfundingCard";

import { EthereumContext, getAllContributors } from "/src/data/ethereumProvider";
import useGraphFetcher from "/src/hooks/useGraphFetcher";
import { formatToEther } from "/src/components/presentational/EtherValue";

const RULING_OPTIONS = ["Refused to Rule", "Challenge Failed", "Debunked"];
const ETH_DECIMALS = 18;

export default function AppealPeriod({ currentRound }) {
  const { chainId, accounts, invokeTransaction, metaEvidenceContents } = useContext(EthereumContext);

  const [supportedRuling, setSupportedRuling] = useState(1);
  const { totalToBeRaised, raisedSoFar } = currentRound;
  const remainingFunding = totalToBeRaised[supportedRuling] - raisedSoFar[supportedRuling];

  const formattedRemainingFunding = formatToEther(remainingFunding.toString());
  const actualRemainingFunding = formatToEther(remainingFunding.toString(), ETH_DECIMALS);

  const [amount, setAmount] = useState(formattedRemainingFunding);
  const [actualAmount, setActualAmount] = useState(actualRemainingFunding);

  const fetchData = useCallback(() => {
    return getAllContributors(chainId);
  }, [chainId]);

  const { data: contributors } = useGraphFetcher(fetchData);
  const connectedAccount = contributors && contributors.find((c) => c.id === accounts[0]);

  const handleRulingOptionChange = (e) => {
    const ruling = e.target.value;
    setSupportedRuling(ruling);

    const remained = totalToBeRaised[ruling] - raisedSoFar[ruling];
    setAmount(formatToEther(remained.toString()));
  };

  const handleInputChange = (e) => {
    setAmount(e.target.value);
    setActualAmount(
      Number(e.target.value) === Number(formattedRemainingFunding) ? actualRemainingFunding : e.target.value
    );
  };

  const handleFundAppeal = async () => {
    console.log("handleFundAppeal/actualAmount", actualAmount);
    try {
      await invokeTransaction(
        "fundAppeal",
        [currentRound?.dispute?.id, supportedRuling],
        utils.parseEther(actualAmount?.toString())
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.appealPeriod}>
      <div className={styles.crowdFundingPanel}>
        <h3 className={styles.title}>Appeal Crowdfunding Status</h3>
        <Radio.Group name="radiogroup" onChange={handleRulingOptionChange} value={supportedRuling}>
          <div className={styles.appealOptions}>
            {metaEvidenceContents[0]?.rulingOptions?.titles?.map((title, index) => {
              const rulingOption = index + 1;
              const contributedByAccount = getContributionByRuling(connectedAccount, currentRound?.id, rulingOption);
              return (
                <CrowdfundingCard
                  key={rulingOption}
                  title={title}
                  rulingOption={rulingOption}
                  amount={contributedByAccount}
                  raisedSoFar={raisedSoFar[rulingOption]}
                  totalToBeRaised={totalToBeRaised[rulingOption]}
                  appealDeadline={currentRound?.appealDeadline[rulingOption]}
                />
              );
            })}
          </div>
        </Radio.Group>
        <div className={styles.footer}>
          <div className={styles.label}>
            <div className={styles.colorBox} /> Your contribution
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <div>
              <label htmlFor="contribution">{`Fund amount ( ${constants.EtherSymbol} ) `}</label>
              <input
                type="number"
                id="contribution"
                name="contribution"
                min="0.001"
                max={formattedRemainingFunding}
                step="0.001"
                onChange={handleInputChange}
                value={amount}
                style={{ marginLeft: "10px" }}
              />
            </div>
            <CustomButton modifiers="small" onClick={handleFundAppeal}>
              Fund Appeal
            </CustomButton>
          </div>
        </div>
      </div>
      <div className={styles.juryDecision}>
        Jury decision: <span>{RULING_OPTIONS[currentRound?.dispute?.ruling]}</span>
      </div>
    </div>
  );
}

const getContributionByRuling = (contributor, roundID, ruling) => {
  if (!contributor || !roundID || !ruling) return 0;

  const contributionId = `${roundID}-${contributor?.id}-${ruling}`;
  const contribution = contributor?.contributions?.find((contribution) => contribution.id === contributionId);
  return contribution?.amount ?? 0;
};
