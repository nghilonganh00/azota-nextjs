import { useCallback, useEffect, useState } from "react";

export const useCountDown = (duration: number) => {
  const [secondLeft, setSecondLeft] = useState(duration);

  const calculateTimeLeft = useCallback(() => {
    let timeLeft: { hours: string; minutes: string; seconds: string } = {
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    if (secondLeft > 0) {
      const hours = Math.floor(secondLeft / (60 * 60));
      const minutes = Math.floor((secondLeft - hours * 60 * 60) / 60);
      const seconds = Math.floor(secondLeft - hours * 60 * 60 - minutes * 60);

      timeLeft = {
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      };
    }

    setSecondLeft((pre) => pre - 1);

    return timeLeft;
  }, [secondLeft]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [secondLeft, calculateTimeLeft]);

  return timeLeft;
};
