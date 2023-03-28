export default function getCourtIdAndJurorSize(arbitratorExtraData) {
    if (!arbitratorExtraData) return { courtId: 0, jurorSize: 0 };
    const halfLength = arbitratorExtraData.length / 2;
    const rawCourtId = arbitratorExtraData.substring(0, halfLength);
    const rawJurorSize = arbitratorExtraData.substring(halfLength);

    return {
        courtId: parseInt(rawCourtId, 16),
        jurorSize: parseInt(rawJurorSize, 16)
    };
}
