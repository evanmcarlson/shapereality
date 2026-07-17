"use client";

import { useEffect, useState } from "react";

const TARGET = new Date(
  process.env.NEXT_PUBLIC_COUNTDOWN_DATE ?? "2026-07-03T00:00:00",
);

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft() {
  const diff = TARGET.getTime() - Date.now();
  if (diff <= 0) return null;
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) return null;

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="flex items-center gap-6">
      {[
        { value: days, label: "Days" },
        { value: hours, label: "Hrs" },
        { value: minutes, label: "Min" },
        { value: seconds, label: "Sec" },
      ].map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center gap-1">
          <span className="font-mono text-3xl font-bold tabular-nums text-black dark:text-white">
            {pad(value)}
          </span>
          <span className="font-mono text-[8px] uppercase tracking-widest text-black opacity-30 dark:text-white">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
