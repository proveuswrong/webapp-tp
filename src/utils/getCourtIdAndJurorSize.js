export function getCourtIdAndJurySize(arbitratorExtraData) {
  if (!arbitratorExtraData) return {courtId: 0, jurorSize: 0};
  const halfLength = arbitratorExtraData.length / 2;
  const rawCourtId = arbitratorExtraData.substring(0, halfLength);
  const rawJurorSize = arbitratorExtraData.substring(halfLength);

  return {
    courtId: parseInt(rawCourtId, 16),
    initialJurySize: parseInt(rawJurorSize, 16)
  };
}

export function currentJurySize(initialSize, roundNumber) {
  if (roundNumber < 1) return initialSize;
  return currentJurySize(+1 + initialSize * 2, roundNumber - 1);
}

export function getCurrentRoundNumber(events) {
  return 5;
}