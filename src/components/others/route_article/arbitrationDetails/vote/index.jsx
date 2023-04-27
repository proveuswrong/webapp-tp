import * as styles from "./index.module.scss";
import VoteYesIcon from "jsx:/src/assets/vote-yes.svg";
import VoteNoIcon from "jsx:/src/assets/vote-no.svg";
import VoteRefusedIcon from "jsx:/src/assets/vote-refused.svg";
import VoteRemainingIcon from "jsx:/src/assets/vote-remaining.svg";
import VoteHiddenIcon from "jsx:/src/assets/vote-hidden.svg";

const VOTE_DATA = [
  { option: "Yes", icon: <VoteYesIcon /> },
  { option: "No", icon: <VoteNoIcon /> },
  { option: "Refused", icon: <VoteRefusedIcon /> },
  { option: "Remaining", icon: <VoteRemainingIcon /> },
];

export default function VotingPeriod({ currentRound, isHiddenVotes }) {
  const { jurySize, votesPerChoice } = currentRound;
  console.log({ currentRound: currentRound });
  console.log({ isHiddenVotes });

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
      <div className={styles.cardWrapper}>
        {VOTE_DATA.map((vote, _index) => (
          <div key={_index} className={styles.voteCard}>
            <div>{vote.icon}</div>
<<<<<<< HEAD
            <div className={styles.voteCount}>
              {vote.option === "Remaining" ? getRemainingVoteCount(jurySize, votesPerChoice) : votesPerChoice[_index]}
            </div>
=======
            <div key={vote.count} className={`blink ${styles.voteCount}`}>{vote.count}</div>
>>>>>>> blink on vote change
            <div className={styles.voteOption}>{vote.option}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const getRemainingVoteCount = (jurySize, votesPerChoice) =>
  jurySize - votesPerChoice.reduce((acc, val) => acc + Number(val), 0);
