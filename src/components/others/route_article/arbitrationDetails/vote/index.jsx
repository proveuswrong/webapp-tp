import * as styles from "./index.module.scss";

import CustomButton from "/src/components/presentational/button";

import VoteAccurateIcon from "jsx:/src/assets/voteYes.svg";
import VoteInaccurateIcon from "jsx:/src/assets/voteNo.svg";
import VoteRefusedIcon from "jsx:/src/assets/voteRefused.svg";
import VoteRemainingIcon from "jsx:/src/assets/voteRemaining.svg";
import VoteHiddenIcon from "jsx:/src/assets/voteHidden.svg";

const binaryVoteOptionIcons = [<VoteAccurateIcon />, <VoteInaccurateIcon />];

export default function VotingPeriod({ currentRound, isHiddenVotes, setEvidenceModalOpen, question, voteOptions }) {
  const { jurySize, votesPerChoice } = currentRound;
  console.debug({ currentRound: currentRound });

  if (isHiddenVotes)
    return (
      <div className={styles.votingPeriod}>
        <VoteHiddenIcon />
        <h4 className={styles.hiddenVotes}> Hidden Votes</h4>
      </div>
    );

  const voteData = [
    { option: "Refused", icon: <VoteRefusedIcon />, voteSize: votesPerChoice[0] },
    ...voteOptions.map((option, _index) => ({
      option,
      icon: binaryVoteOptionIcons[_index],
      voteSize: votesPerChoice[_index + 1],
    })),
    { option: "Remaining", icon: <VoteRemainingIcon />, voteSize: getRemainingVoteCount(jurySize, votesPerChoice) },
  ];

  return (
    <div className={styles.votingPeriod}>
      <h4>Current Votes</h4>
      <div className={styles.question}>{`Jury was asked: ${question}`}</div>
      <div className={styles.cardWrapper}>
        {voteData.map((vote, _index) => (
          <div key={_index} className={styles.voteCard}>
            <div>{vote.icon}</div>
            <div key={vote.voteSize} className={`blink ${styles.voteCount}`}>
              {vote.voteSize}
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
