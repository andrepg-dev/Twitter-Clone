'use client';
import { useEffect, useState } from 'react';

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];

const getDateDiffs = (timestamp) => {
  const now = Date.now();
  const difference = (now - timestamp) / 1000;

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (difference > secondsInUnit || unit === 'second') {
      const value = Math.floor(difference / secondsInUnit) * -1;
      return { value, unit };
    }
  }
};

export function useTimeAgo(timestamp) {
  const [time, setTime] = useState(() => getDateDiffs(timestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = getDateDiffs(timestamp);
      setTime(newTime);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const rtf = new Intl.RelativeTimeFormat('es', { style: 'narrow' });

  const { value, unit } = time;
  return rtf.format(value, unit);
}
