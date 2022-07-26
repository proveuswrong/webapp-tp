export default function getTimePastSinceLastBountyUpdate(lastBalanceUpdate, currentBlockNumber){
  return parseInt(currentBlockNumber) - parseInt(lastBalanceUpdate)
};