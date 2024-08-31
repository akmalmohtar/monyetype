"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "../../../components/ui/button";
import { useRhythmTimer } from "@/hooks/use-rhythm-timer";
import { cn } from "@/lib/utils";
import {
  LOWER_CASE,
  UPPER_CASE,
  NUMBERS,
  SPECIAL_CHARS_NO_SHIFT,
  SPECIAL_CHARS_SHIFT,
} from "@/constants/letters";
import { motion } from "framer-motion";
import SettingModal from "./SettingModal";
import { useRhythmSettingsStore } from "@/hooks/zustand/use-rhythm-settings";

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

function ResultBox({
  win,
  durationPlayed,
  score,
}: {
  win: boolean;
  durationPlayed: number;
  score: number;
}) {
  const resultMessage = win ? "YOU WIN" : "YOU LOSE";
  const speed = (score / (durationPlayed / 1000)).toFixed(2);

  return (
    <div className="flex flex-col items-center space-y-4">
      <span className="text-5xl">{resultMessage}</span>
      <span>{`Your speed: ${speed} character(s) per second`}</span>
    </div>
  );
}

function LetterDisplayBox({ letter }: { letter?: string }) {
  if (!letter) return null;

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
      className={`text-7xl`}
    >
      {letter}
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
  const { gameDuration, letterDuration, ...rhythmSettings } =
    useRhythmSettingsStore((state) => ({
      ...state.rhythmSettings,
      gameDuration: state.rhythmSettings.gameDuration,
      letterDuration: state.rhythmSettings.letterDuration,
    }));
  const { round, remainingTime, gameOver, start, skip, stop, resetGame } =
    useRhythmTimer(letterDuration);
  const {
    remainingTime: gRemainingTime,
    start: gStart,
    stop: gStop,
    gameOver: gGameOver,
    resetGame: gResetGame,
  } = useRhythmTimer(gameDuration);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [letter, setLetter] = useState<string>();

  const charactersPool = useMemo(() => {
    let charactersPool = [...LOWER_CASE];
    if (rhythmSettings.enableNumbers) {
      charactersPool = [...charactersPool, ...NUMBERS];
    }

    if (rhythmSettings.enableSpecialCharacters) {
      charactersPool = [...charactersPool, ...SPECIAL_CHARS_NO_SHIFT];
    }

    if (rhythmSettings.enableUppercaseLetters) {
      charactersPool = [...charactersPool, ...UPPER_CASE];
    }

    if (rhythmSettings.enableUppercaseSpecialCharacters) {
      charactersPool = [...charactersPool, ...SPECIAL_CHARS_SHIFT];
    }

    return charactersPool;
  }, [rhythmSettings]);

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

  const handleRetry = () => {
    resetGame();
    gResetGame();
    setScore(0);
    setGameWin(false);
  };

  // To trigger render next letter
  useEffect(() => {
    const i = Math.floor(Math.random() * (charactersPool.length - 1));
    const _charactersPool = charactersPool.filter((c) => c !== letter); // prevent repeating same letter back to back
    setLetter(_charactersPool[i]);
  }, [round]);

  // handle gameover
  useEffect(() => {
    if (gameOver || gGameOver) {
      stop();
      gStop();
      setStarted(false);
    }
  }, [gameOver, gGameOver, setStarted, stop, gStop]);

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

      if (score >= gameDuration / 1000) {
        setGameWin(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    started,
    letter,
    skip,
    start,
    gStart,
    gGameOver,
    gameOver,
    score,
    gameDuration,
  ]);

  return (
    <div className="flex flex-col h-full items-center justify-evenly ">
      <div className="flex flex-col items-center justify-center h-40">
        {gameOver || gGameOver ? (
          <ResultBox
            win={gameWin}
            durationPlayed={gameDuration - gRemainingTime}
            score={score}
          />
        ) : (
          <div className="flex flex-col space-y-8">
            <LetterDisplayBox letter={letter} />
            {!!letter && (
              <TimerBox
                remainingTime={remainingTime}
                duration={letterDuration}
              />
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-4 items-center bg-white/40 backdrop-blur-sm p-6 rounded shadow-lg w-[20%] mx-auto border border-white/40">
        <ScoreBox score={score} />
        <TimerBox remainingTime={gRemainingTime} duration={gameDuration} />
        <SettingModal />
      </div>
      <div className="flex flex-col space-y-2 h-[80px] w-[120px]">
        {gameOver || gGameOver ? (
          <Button
            onClick={handleRetry}
            variant="akmalmohtar"
            className="w-full fade-in-10"
          >
            Retry
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
