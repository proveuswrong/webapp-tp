export default function getTimePastSinceLastBountyUpdate(lastBalanceUpdate, currentBlockNumber) {
  if (!currentBlockNumber) return 0;
  return parseInt(currentBlockNumber) - parseInt(lastBalanceUpdate);
}
