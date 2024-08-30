"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { useRhythmTimer } from "@/hooks/use-rhythm-timer";
import { cn } from "@/lib/utils";
import { LOWER_CASE } from "@/constants/letters";
import { motion } from "framer-motion";
import SettingModal from "./SettingModal";
const DURATION = 1500;
const G_DURATION = 10000;

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
          duration: 1,
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
  gameWin,
  gameOver,
}: {
  letter?: string;
  gameWin: boolean;
  gameOver: boolean;
}) {
  if (!letter) return null;

  const display = (() => {
    if (!gameOver) {
      return <span className="text-7xl">{letter}</span>;
    }

    if (gameWin && gameOver) {
      return <span className="text-5xl">YOU WIN</span>;
    }

    if (!gameWin && gameOver) {
      return <span className="text-5xl">YOU LOSE</span>;
    }
  })();

  return (
    <motion.span
      key={letter}
      initial={{ y: -10, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        ease: "linear",
        duration: 0.5,
      }}
      className={`h-28`}
    >
      {display}
    </motion.span>
  );
}

function TimerBox({
  label,
  remainingTime,
  duration,
}: {
  label?: string;
  remainingTime: number;
  duration: number;
}) {
  const formattedTime = `${(remainingTime / 1000).toFixed(2)} s`;
  const danger = remainingTime < 0.4 * duration;

  return (
    <span>
      {!!label && <span>{label}: </span>}
      <span
        className={cn("text-base", danger && "text-red-500 animate-pulse-fast")}
      >
        {formattedTime}
      </span>
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
    resetGame: gResetGame,
  } = useRhythmTimer(G_DURATION);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [letter, setLetter] = useState<string>();

  const gameTotallyOver = gameOver && gGameOver;

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
    gResetGame();
    setScore(0);
  };

  // To trigger render next letter
  useEffect(() => {
    setLetter(getRandomLetter(letter));
  }, [round]);

  // handle gameover
  useEffect(() => {
    if (gameOver || gGameOver) {
      stop();
      gStop();
      setStarted(false);
    }
  }, [gameOver, gGameOver, stop, gStop, setStarted]);

  useEffect(() => {
    if (score >= G_DURATION / 1000) {
      setGameWin(true);
    }
  }, [score]);

  // to trigger button press and score
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!started && letter === event.key) {
        start();
        gStart();
        setStarted(true);
      }

      // if correct letter pressed
      if (event.key === letter && !gGameOver && !gameOver) {
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
    <div className="flex flex-col h-full  items-center justify-evenly ">
      <div className="flex flex-col items-center">
        <LetterDisplayBox
          letter={letter}
          gameWin={gameWin}
          gameOver={gGameOver || gameOver}
        />
        <TimerBox remainingTime={remainingTime} duration={DURATION} />
      </div>
      <div className="flex flex-col space-y-4 items-center bg-white/40 backdrop-blur-sm p-6 rounded shadow-lg w-[20%] mx-auto border border-white/40">
        <ScoreBox score={score} />
        <TimerBox remainingTime={gRemainingTime} duration={G_DURATION} />
        <SettingModal />
      </div>
      <div className="flex flex-col space-y-2 h-[80px] w-[120px]">
        {!!gameOver || !!gGameOver ? (
          <Button
            onClick={handleStartOver}
            variant="akmalmohtar"
            className="w-full fade-in-10"
          >
            Start Over
          </Button>
        ) : (
          <Button
            onClick={handleStartStopGame}
            disabled={gameOver || gGameOver}
            variant="akmalmohtar"
            className="w-full"
          >
            {started ? "Stop" : "Start"}
          </Button>
        )}
      </div>
    </div>
  );
}
