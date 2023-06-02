import React  from "react";
import * as styles from "./index.module.scss";
import RewardSymbol from "jsx:/src/assets/crown.svg";
import CustomButton from "../button";
import { ethers } from "ethers";
import EtherValue from "../EtherValue";

export default function CardCrowdfundingWithdrawal(props) {
  console.log(props);
  return <div className={`${styles.cardCrowdfundingWithdrawal}`}>
    <RewardSymbol/>
    {props.contributed && props.withdrew && <span>You already withdrew.</span>}
    {props.contributed && !props.withdrew && <div className={styles.totalWithdrawable}>Total Withdrawable Amount <EtherValue value={props.amount || 0}/></div>}
    {!props.contributed && <span>You did not contribute the crowdfunding of the last dispute.</span>}

    <hr/>
    <CustomButton modifiers="small" disabled={props.withdrew} onClick={props.handleWithdrawRewards}>
      Withdraw Crowdfunding
    </CustomButton>
  </div>;
}
