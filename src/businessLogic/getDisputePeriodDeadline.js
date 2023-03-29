export default function getDeadline(currentPeriodIndex, lastPeriodChange, timesPerPeriod) {
    if (!lastPeriodChange || !timesPerPeriod || currentPeriodIndex >= timesPerPeriod.length) {
        return 0;
    }
    return parseInt(lastPeriodChange) + parseInt(timesPerPeriod[currentPeriodIndex]);
}