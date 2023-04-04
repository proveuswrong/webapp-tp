import {BigNumber, utils} from "ethers";

export default function getTrustScore(article, timePastSinceLastBountyUpdate) {
  const timeDelta = BigNumber.from(timePastSinceLastBountyUpdate);
  const previouslyAccumulatedScore = BigNumber.from(article?.lastCalculatedScore);
  const bounty = BigNumber.from(article?.bounty);
  const rawScore = previouslyAccumulatedScore.add(timeDelta.mul(bounty));
  const normalizedScore = utils.formatEther(rawScore); // Divides by 10^18 to prevent big numbers.
  return parseInt(normalizedScore).toFixed(0);
};