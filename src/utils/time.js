export function getTimeAgo(unixTimestamp) {
    const currentUnixTime = Math.floor(Date.now() / 1000);
    const timeDifference = currentUnixTime - Math.floor(unixTimestamp / 1000);

    const minutes = Math.floor(timeDifference / 60);
    const hours = Math.floor(timeDifference / 3600);
    const days = Math.floor(timeDifference / 86400);

    if (minutes < 1) {
        return "a moment ago"
    } else if (minutes < 60) {
        return `${minutes} mins ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else if (days === 1) {
        return "yesterday";
    } else {
        // format date as day/month/year hour:minute
        const date = new Date(unixTimestamp * 1000);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1
            }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
        return formattedDate;
    }
}