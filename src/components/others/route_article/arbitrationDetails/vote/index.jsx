import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";

import VoteYesIcon from "jsx:/src/assets/voteYes.svg";
import VoteNoIcon from "jsx:/src/assets/voteNo.svg";
import VoteRefusedIcon from "jsx:/src/assets/voteRefused.svg";
import VoteRemainingIcon from "jsx:/src/assets/voteRemaining.svg";
import VoteHiddenIcon from "jsx:/src/assets/voteHidden.svg";

const VOTE_DATA = [
  { option: "Refused", icon: <VoteRefusedIcon /> },
  { option: "Yes", icon: <VoteYesIcon /> },
  { option: "No", icon: <VoteNoIcon /> },
  { option: "Remaining", icon: <VoteRemainingIcon /> },
];

export default function VotingPeriod({ currentRound, isHiddenVotes, setEvidenceModalOpen, question }) {
  const { jurySize, votesPerChoice } = currentRound;
  console.log({ currentRound: currentRound });

  if (isHiddenVotes)
    return (
      <div className={styles.votingPeriod}>
        <VoteHiddenIcon />
        <h4 className={styles.hiddenVotes}> Hidden Votes</h4>
      </div>
    );

  return (
    <div className={styles.votingPeriod}>
      <h4>Current Votes</h4>
      <div className={styles.question}>{`Jury was asked: ${question}`}</div>
      <div className={styles.cardWrapper}>
        {VOTE_DATA.map((vote, _index) => (
          <div key={_index} className={styles.voteCard}>
            <div>{vote.icon}</div>
            <div className={styles.voteCount}>
              {vote.option === "Remaining" ? getRemainingVoteCount(jurySize, votesPerChoice) : votesPerChoice[_index]}
            </div>
            <div className={styles.voteOption}>{vote.option}</div>
          </div>
        ))}
      </div>
      <CustomButton onClick={() => setEvidenceModalOpen(true)}>Submit Evidence</CustomButton>
    </div>
  );
}

const getRemainingVoteCount = (jurySize, votesPerChoice) =>
  jurySize - votesPerChoice.reduce((acc, val) => acc + Number(val), 0);
