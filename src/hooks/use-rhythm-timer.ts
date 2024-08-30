import { useCallback, useEffect, useRef, useState } from "react";

export function useRhythmTimer(duration: number) {
  const [round, setRound] = useState(0);
  const [remainingTime, setRemainingTime] = useState(duration);
  const [gameOver, setGameOver] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setRound((prev) => prev + 1);
    }, duration);

    if (countdownRef.current) return;
    countdownRef.current = setInterval(() => {
      setRemainingTime((rt) => {
        if (rt - 100 <= 0) {
          setGameOver(true);
        }
        return rt - 100;
      });
    }, 100);
  };

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  };

  const skip = () => {
    stop();
    setRound((prev) => prev + 1);
    setRemainingTime(duration);
    start();
  };

  const resetGame = useCallback(() => {
    setRound(0);
    setRemainingTime(duration);
    setGameOver(false);
  }, [duration]);

  useEffect(() => {
    resetGame();
  }, [duration, resetGame]);

  return { round, remainingTime, gameOver, start, skip, stop, resetGame };
}
