import {BigNumber, utils} from "ethers";

export default function getTrustScore(claim, timePastSinceLastBountyUpdate) {
  const timeDelta = BigNumber.from(timePastSinceLastBountyUpdate);
  const previouslyAccumulatedScore = BigNumber.from(claim?.lastCalculatedScore);
  const bounty = BigNumber.from(claim?.bounty);
  const rawScore = previouslyAccumulatedScore.add(timeDelta.mul(bounty));
  const normalizedScore = utils.formatEther(rawScore); // Divides by 10^18 to prevent big numbers.
  return parseInt(normalizedScore).toFixed(0);
};