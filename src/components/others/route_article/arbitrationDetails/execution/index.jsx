import { useCallback } from "react";
import { useRevalidator } from "react-router-dom";
import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";
import CardCrowdfundingWithdrawal from "/src/components/presentational/cardCrowdfundingWithdrawal";

import useGraphFetcher from "/src/hooks/useGraphFetcher";
import { useEthereum } from "../../../../../data/ethereumContext";
import { useSession } from "../../../../../data/sessionContext";
import { KLiquidAbi as ArbitratorABI } from "../../../../../data/KlerosLiquidABI";
import { getRewardsByID } from "../../../../../data/api";

export default function ExecutionPeriod({ currentRound, executed, arbitratorAddress, setEvidenceModalOpen }) {
  const { state } = useEthereum;
  const session = useSession();
  const revalidator = useRevalidator();

  const fetchData = useCallback(() => {
    const rewardId = `${currentRound?.dispute?.id}-${state.account}`;
    return getRewardsByID(state.appChainId, rewardId);
  }, [state.appChainId, state.account]);

  const { data: rewards } = useGraphFetcher(fetchData);

  const handleExecuteRuling = async () => {
    try {
      await session.invokeTransaction("executeRuling", [currentRound?.dispute?.id], {
        contractAddress: arbitratorAddress,
        abi: ArbitratorABI,
      });
      revalidator.revalidate();
    } catch (error) {
      console.error(error);
    }
  };

  const handleWithdrawCrowdfunding = async () => {
    await session.invokeTransaction("withdrawFeesAndRewardsForAllRoundsAndAllRulings", [
      currentRound?.dispute?.id,
      state.account,
    ]);
    revalidator.revalidate();
  };

  return (
    <div className={styles.executionPeriod}>
      {executed ? (
        <>
          {state.account && (
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
