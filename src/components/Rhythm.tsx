"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRhythmTimer } from "@/hooks/use-rhythm-timer";
import { cn } from "@/lib/utils";
//ABCDEFGHIJKLMNOPQRSTUVWXYZ
const LETTERS = "abcdefghijklmopqrstuvwxyz";
const DURATION = 3000;

function getRandomLetter() {
  return LETTERS[Math.floor(Math.random() * LETTERS.length)];
}

function ScoreBox({ score }: { score: number }) {
  return (
    <div className="flex flex-row justify-between w-[135px]">
      <span className="text-2xl">Score: </span>
      <span className="text-2xl">{score}</span>
    </div>
  );
}

function LetterDisplayBox({
  letter,
  gameOver = false,
}: {
  letter?: string;
  gameOver?: boolean;
}) {
  if (!letter) {
    return null;
  }

  if (gameOver) {
    return <span className="text-9xl">YOU LOSE</span>;
  }

  return <span className="text-9xl">{letter}</span>;
}

function TimerBox({
  remainingTime,
  duration,
}: {
  remainingTime: number;
  duration: number;
}) {
  const formattedTime = `${(remainingTime / 1000).toFixed(2)} s`;
  const danger = remainingTime < 0.4 * duration;

  return (
    <span className={cn("text-base", danger && "text-red-500")}>
      {formattedTime}
    </span>
  );
}

export function Rhythm() {
  const { round, remainingTime, gameOver, start, restart, stop, resetGame } =
    useRhythmTimer(DURATION);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [letter, setLetter] = useState<string>();

  const handleStartStopGame = () => {
    if (started) {
      setStarted(false);
      stop();
    } else {
      setStarted(true);
      start();
    }
  };

  const handleStartOver = () => {
    resetGame();
    setScore(0);
  };

  useEffect(() => {
    setLetter(getRandomLetter());
  }, [round]);

  useEffect(() => {
    if (gameOver) {
      stop();
      setStarted(false);
    }
  }, [gameOver, stop, setStarted]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!started && letter === event.key) {
        start();
        setStarted(true);
      }

      if (event.key === letter) {
        setScore((prev) => prev + 1);
        restart();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [started, letter, restart, start]);

  return (
    <div className="flex flex-col h-full border-2 items-center justify-evenly  bg-gray-100">
      <LetterDisplayBox letter={letter} gameOver={gameOver} />
      <ScoreBox score={score} />
      <TimerBox remainingTime={remainingTime} duration={DURATION} />
      <div className="flex flex-col space-y-2 h-[80px] w-[120px]">
        <Button
          onClick={handleStartStopGame}
          disabled={gameOver}
          variant="akmalmohtar"
          className="w-full"
        >
          {started ? "Stop" : "Start"}
        </Button>
        {!!gameOver && (
          <Button
            onClick={handleStartOver}
            variant="akmalmohtar"
            className="w-full fade-in-10"
          >
            Start Over
          </Button>
        )}
      </div>
    </div>
  );
}
