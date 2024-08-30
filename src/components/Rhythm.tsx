"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRhythmTimer } from "@/hooks/use-rhythm-timer";
import { cn } from "@/lib/utils";
import { LOWER_CASE } from "@/constants/letters";
import { motion } from "framer-motion";
const DURATION = 3000;
const G_DURATION = 5000;

function getRandomLetter(prevLetter?: string) {
  if (prevLetter) {
    const l = LOWER_CASE.replace(prevLetter, "");
    return l[Math.floor(Math.random() * l.length)];
  }
  return LOWER_CASE[Math.floor(Math.random() * LOWER_CASE.length)];
}

function ScoreBox({ score }: { score: number }) {
  return (
    <div className="flex flex-row justify-between w-[135px]">
      <span className="text-2xl">Score: </span>
      <motion.span
        key={score}
        initial={{ x: 5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 0.5,
        }}
        className="text-2xl"
      >
        {score}
      </motion.span>
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
  if (!letter) return null;

  if (gameOver) {
    return <span className="text-9xl">YOU LOSE</span>;
  }

  return (
    <motion.span
      key={letter}
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        ease: "linear",
        duration: 0.5,
      }}
      className="text-7xl"
    >
      {letter}
    </motion.span>
  );
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
    <span
      className={cn("text-base", danger && "text-red-500 animate-pulse-fast")}
    >
      {formattedTime}
    </span>
  );
}

export function Rhythm() {
  const { round, remainingTime, gameOver, start, skip, stop, resetGame } =
    useRhythmTimer(DURATION);
  const {
    remainingTime: gRemainingTime,
    start: gStart,
    stop: gStop,
    gameOver: gGameOver,
  } = useRhythmTimer(G_DURATION);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [letter, setLetter] = useState<string>();

  const handleStartStopGame = () => {
    if (started) {
      setStarted(false);
      stop();
      gStop();
    } else {
      setStarted(true);
      start();
      gStart();
    }
  };

  const handleStartOver = () => {
    resetGame();
    setScore(0);
  };

  useEffect(() => {
    setLetter(getRandomLetter());
  }, [round]);

  // handle gameover
  useEffect(() => {
    if (gameOver || gGameOver) {
      stop();
      gStop();
      setStarted(false);
    }
  }, [gameOver, stop, setStarted, gGameOver, gStop]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!started && letter === event.key) {
        start();
        gStart();
        setStarted(true);
      }

      if (event.key === letter) {
        setScore((prev) => prev + 1);
        skip();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [started, letter, skip, start, gStart]);

  return (
    <div className="flex flex-col h-full border-2 items-center justify-evenly  bg-gray-100">
      <LetterDisplayBox letter={letter} gameOver={gameOver || gGameOver} />
      <ScoreBox score={score} />
      <TimerBox remainingTime={remainingTime} duration={DURATION} />
      <TimerBox remainingTime={gRemainingTime} duration={G_DURATION} />
      <div className="flex flex-col space-y-2 h-[80px] w-[120px]">
        <Button
          onClick={handleStartStopGame}
          disabled={gameOver || gGameOver}
          variant="akmalmohtar"
          className="w-full"
        >
          {started ? "Stop" : "Start"}
        </Button>
        {(!!gameOver || !!gGameOver) && (
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
