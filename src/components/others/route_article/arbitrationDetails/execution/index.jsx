import { useCallback, useContext } from "react";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";
import EtherValue from "../../../../presentational/EtherValue";

import { EthereumContext, getRewardsByID } from "/src/data/ethereumProvider";
import useGraphFetcher from "/src/hooks/useGraphFetcher";
import notifyWithToast, { MESSAGE_TYPE } from "../../../../../utils/notifyWithTost";
import InformationBox from "../../../../presentational/informationBox";

export default function ExecutionPeriod({ currentRound, executed, arbitratorInstance }) {
  const { chainId, accounts, contractInstance, ethersProvider } = useContext(EthereumContext);

  const fetchData = useCallback(() => {
    const rewardId = `${currentRound?.dispute?.id}-${accounts[0]}`;
    return getRewardsByID(chainId, rewardId);
  }, [chainId, accounts[0]]);

  const { data: rewards, isFetching } = useGraphFetcher(fetchData);
  console.log({ rewards });

  const sendTransaction = async (unsignedTx) =>
    await notifyWithToast(
      ethersProvider
        .getSigner()
        .sendTransaction(unsignedTx)
        .then((tx) => tx.wait()),
      MESSAGE_TYPE.transaction
    );

  const handleExecuteRuling = async () => {
    try {
      const unsignedTx = await arbitratorInstance.populateTransaction.executeRuling(currentRound?.dispute?.id);
      sendTransaction(unsignedTx);
    } catch (error) {
      console.error(error);
    }
  };

  const handleWithdrawCrowdfunding = async () => {
    try {
      const unsignedTx = await contractInstance.populateTransaction.withdrawFeesAndRewardsForAllRoundsAndAllRulings(
        currentRound?.dispute?.id,
        accounts[0]
      );
      sendTransaction(unsignedTx);
    } catch (error) {
      console.error(error);
    }
  };

  const rewardField = (
    <div className={styles.reward}>
      <div className={styles.label}>Total rewards:</div>
      {!isFetching && <EtherValue value={rewards?.totalWithdrawableAmount ?? 0} />}
    </div>
  );

  return (
    <div className={styles.executionPeriod}>
      {executed ? (
        <>
          {accounts[0] &&
            (!rewards ? (
              <InformationBox>You have not contributed to the dispute</InformationBox>
            ) : rewards?.withdrew ? (
              <InformationBox>You have already withdrawn your rewards</InformationBox>
            ) : (
              rewardField
            ))}
          <CustomButton disabled={!rewards || rewards?.withdrew} onClick={handleWithdrawCrowdfunding}>
            Withdraw Crowdfunding
          </CustomButton>
        </>
      ) : (
        <CustomButton onClick={handleExecuteRuling}>Execute Ruling</CustomButton>
      )}
    </div>
  );
}
