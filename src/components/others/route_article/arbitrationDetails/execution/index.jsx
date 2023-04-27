import CustomButton from "/src/components/presentational/button";
import { utils } from "ethers";
import { EthereumContext } from "/src/data/ethereumProvider";
import { useContext, useEffect, useState } from "react";



export default function ExecutionPeriod({ currentRound, executed, arbitratorInstance }) {
  const { chainId, accounts, contractInstance, ethersProvider, metaEvidenceContents } = useContext(EthereumContext);
  const handleExecuteRuling = async () => {
    try {
      const unsignedTx = await arbitratorInstance.populateTransaction.executeRuling(
        currentRound?.dispute?.id
      );
      const tx = await ethersProvider.getSigner().sendTransaction(unsignedTx);
      await tx.wait();
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
      const tx = await ethersProvider.getSigner().sendTransaction(unsignedTx);
      await tx.wait();
    } catch (error) {
      console.error(error);
    }
  };
  return <div>
    {executed ?
    <CustomButton modifiers={"small"} onClick={handleWithdrawCrowdfunding}>Withdraw Crowdfunding</CustomButton> : <CustomButton modifiers={"small"} onClick={handleExecuteRuling}>Execute Ruling</CustomButton>
    }
  </div>;
}
