import { useEffect, useState } from 'react';

export const useCountDown = (initialSeconds: number) => {
  const [countdown, setCountdown] = useState(initialSeconds);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [countdown]);

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;

  return {
    hours: formatTime(hours),
    minutes: formatTime(minutes),
    seconds: formatTime(seconds),
  };
};
