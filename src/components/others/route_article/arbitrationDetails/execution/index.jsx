import { useCallback, useContext } from "react";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";

import { EthereumContext, getRewardsByID } from "/src/data/ethereumProvider";
import useGraphFetcher from "/src/hooks/useGraphFetcher";
import notifyWithToast, { MESSAGE_TYPE } from "../../../../../utils/notifyWithTost";
import CardCrowdfundingWithdrawal from "../../../../presentational/cardCrowdfundingWithdrawal";

export default function ExecutionPeriod({ currentRound, executed, arbitratorInstance, setEvidenceModalOpen }) {
  const { chainId, accounts, invokeTransaction, ethersProvider } = useContext(EthereumContext);

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
    await invokeTransaction("withdrawFeesAndRewardsForAllRoundsAndAllRulings", [
      currentRound?.dispute?.id,
      accounts[0],
    ]);
  };

  return (
    <div className={styles.executionPeriod}>
      {executed ? (
        <>
          {accounts[0] && (
            <CardCrowdfundingWithdrawal
              contributed={!!rewards}
              amount={rewards?.totalWithdrawableAmount}
              withdrew={rewards?.withdrew}
              handleWithdrawRewards={handleWithdrawCrowdfunding}
            />
          )}
        </>
      ) : (
        <div className={styles.buttons}>
          <CustomButton onClick={() => setEvidenceModalOpen(true)}>Submit Evidence</CustomButton>
          <CustomButton onClick={handleExecuteRuling}>Execute Ruling</CustomButton>
        </div>
      )}
    </div>
  );
}
