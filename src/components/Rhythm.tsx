"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
//ABCDEFGHIJKLMNOPQRSTUVWXYZ
const LETTERS = "abcdefghijklmopqrstuvwxyz";

function getRandomLetter() {
  return LETTERS[Math.floor(Math.random() * LETTERS.length)];
}

const INTERVAL = 1000;

export function Rhythm() {
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [letter, setLetter] = useState<string | null>(null);

  const handleStartStopGame = () => {
    setStarted(!started);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (started) {
      interval = setInterval(() => {
        setLetter(getRandomLetter());
      }, INTERVAL);
    }

    return () => clearInterval(interval!);
  }, [started]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!started) return;

      if (event.key === letter) {
        setScore((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [started, letter]);

  return (
    <div className="flex flex-col h-full border-2 items-center justify-evenly  bg-gray-100">
      <span className="text-9xl">{letter}</span>
      <span className="text-2xl">{score}</span>
      <Button
        onClick={handleStartStopGame}
        variant="akmalmohtar"
        className="w-20"
      >
        {started ? "Stop" : "Start"}
      </Button>
    </div>
  );
}
