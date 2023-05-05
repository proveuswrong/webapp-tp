import { useCallback, useContext, useState } from "react";
import { constants, utils } from "ethers";
import { Radio } from "antd";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";

import { EthereumContext, getAllContributors } from "/src/data/ethereumProvider";
import useGraphFetcher from "/src/hooks/useGraphFetcher";
import notifyWithToast, { MESSAGE_TYPE } from "/src/utils/notifyWithTost";
import CrowdfundingCard from "./croudfundingCard";

export default function AppealPeriod({ currentRound }) {
  const [amount, setAmount] = useState(0.01);
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
  const onInputeChange = (e) => setAmount(e.target.value);

  const handleFundAppeal = async () => {
    try {
      const unsignedTx = await contractInstance.populateTransaction.fundAppeal(
        currentRound?.dispute?.id,
        supportedRuling,
        {
          value: utils.parseEther(amount?.toString()),
        }
      );
      await notifyWithToast(
        ethersProvider
          .getSigner()
          .sendTransaction(unsignedTx)
          .then((tx) => tx.wait()),
        MESSAGE_TYPE.transaction
      );
    } catch (error) {
      console.error(error);
    }
  };
  console.log({ currentRound });
  return (
    <div className={styles.appealPeriod}>
      <div className={styles.crowdFundingPanel}>
        <h3 className={styles.title}>Appeal Crowdfunding Status</h3>
        <Radio.Group name="radiogroup" onChange={onChange} value={supportedRuling}>
          <div className={styles.appealOptions}>
            {metaEvidenceContents[0]?.rulingOptions?.titles?.map((title, index) => {
              const rulingOption = index + 1;
              const contributedByAccount = getContributionByRuling(connectedAccount, currentRound?.id, rulingOption);
              return (
                <CrowdfundingCard
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
          <div style={{ display: "flex", gap: "10px" }}>
            <div>
              <label htmlFor="contribution">{`Fund amount ( ${constants.EtherSymbol} ): `}</label>
              <input
                type="number"
                id="contribution"
                name="contribution"
                min="0.001"
                max={totalToBeRaised - raisedSoFar}
                step="0.001"
                onChange={onInputeChange}
                value={amount}
              />
            </div>
            <CustomButton modifiers="small" onClick={handleFundAppeal}>
              Fund Appeal
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const getContributionByRuling = (contributor, roundID, ruling) => {
  if (!contributor || !roundID || !ruling) return 0;

  const contributionId = `${roundID}-${contributor?.id}-${ruling}`;
  const contribution = contributor?.contributions?.find((contribution) => contribution.id === contributionId);
  console.log(`amount for ruling ${ruling} is ${contribution?.amount}`);
  return contribution?.amount ?? 0;
};
