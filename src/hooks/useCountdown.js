import { useState, useEffect } from 'react';

export default function useCountdown(deadline) {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft(deadline));

    useEffect(() => {
        if (timeLeft.totalInSeconds === 0) return;

        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft(deadline));
        }, 1000);

        return () => clearInterval(interval);
    }, [deadline, timeLeft.totalInSeconds]);

    return timeLeft;
};

function getTimeLeft(deadline) {
    const totalInSeconds = Math.max(Math.floor((deadline - Date.now() / 1000)), 0);
    const days = Math.floor(totalInSeconds / (3600 * 24));
    const hours = Math.floor(totalInSeconds % (3600 * 24) / 3600);
    const minutes = Math.floor((totalInSeconds % 3600) / 60);
    const seconds = totalInSeconds % 60;

    return { days, hours, minutes, seconds, totalInSeconds };
};


export function formatTime(time) {
    const { days, hours, minutes, seconds } = time;
    return days > 0 ? `${days}d ${hours}h ${minutes}m` : `${hours}h ${minutes}m ${seconds}s`;
}