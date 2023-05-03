import { useCallback, useContext } from "react";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";
import EtherValue from "../../../../presentational/EtherValue";

import { EthereumContext, getContributorByID } from "/src/data/ethereumProvider";
import useGraphFetcher from "/src/hooks/useGraphFetcher";
import notifyWithToast, { MESSAGE_TYPE } from "../../../../../utils/notifyWithTost";

export default function ExecutionPeriod({ currentRound, executed, arbitratorInstance }) {
  const { chainId, accounts, contractInstance, ethersProvider } = useContext(EthereumContext);

  const fetchData = useCallback(() => {
    return getContributorByID(chainId, accounts[0]);
  }, [chainId, accounts[0]]);

  const { data: contributor, isFetching } = useGraphFetcher(fetchData);

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
      const unsignedTx = await contractInstance.populateTransaction.withdrawFeesAndRewardsForAllRounds(
        currentRound?.dispute?.id,
        accounts[0],
        1
      );
      sendTransaction(unsignedTx);
    } catch (error) {
      console.error(error);
    }
  };

  const rewardField = (
    <div className={styles.reward}>
      <div className={styles.label}>Total rewards:</div>
      {!isFetching && <EtherValue value={contributor?.totalWithdrawableAmount ?? 0} />}
    </div>
  );

  return (
    <div className={styles.executionPeriod}>
      {executed ? (
        <div>
          {rewardField}
          <CustomButton disabled={contributor?.withdrew} onClick={handleWithdrawCrowdfunding}>
            Withdraw Crowdfunding
          </CustomButton>
        </div>
      ) : (
        <CustomButton onClick={handleExecuteRuling}>Execute Ruling</CustomButton>
      )}
    </div>
  );
}
