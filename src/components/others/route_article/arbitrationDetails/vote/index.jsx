import * as styles from "./index.module.scss";
import VoteYesIcon from "jsx:/src/assets/vote-yes.svg";
import VoteNoIcon from "jsx:/src/assets/vote-no.svg";
import VoteRefusedIcon from "jsx:/src/assets/vote-refused.svg";
import VoteRemainingIcon from "jsx:/src/assets/vote-remaining.svg";

const VOTE_DATA = [
  { option: "Yes", count: 0, icon: <VoteYesIcon /> },
  { option: "No", count: 0, icon: <VoteNoIcon /> },
  { option: "Refused", count: 0, icon: <VoteRefusedIcon /> },
  { option: "Remaining", count: 0, icon: <VoteRemainingIcon /> },
];

// TODO: Mock component
export default function VotingPeriod(props) {
  return (
    <div className={styles.votingPeriod}>
      <h4>Current Votes</h4>
      <div className={styles.cardWrapper}>
        {VOTE_DATA.map((vote, _index) => (
          <div key={_index} className={styles.voteCard}>
            <div>{vote.icon}</div>
            <div className={styles.voteCount}>{vote.count}</div>
            <div className={styles.voteOption}>{vote.option}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
