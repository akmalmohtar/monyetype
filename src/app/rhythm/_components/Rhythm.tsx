"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { useRhythmTimer } from "@/hooks/use-rhythm-timer";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import SettingModal from "./SettingModal";
import { useRhythmSettingsStore } from "@/hooks/zustand/use-rhythm-settings";
import { useRandomLetter } from "@/hooks/use-random-letter";

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

function LetterDisplayBox({
  letters,
  enableNextLetter = false,
}: {
  letters?: [string, string];
  enableNextLetter?: boolean;
}) {
  if (!letters) return null;

  return (
    <div className="grid grid-cols-3 space-x-6">
      <span>{/*just empty span */}</span>
      <motion.span
        key={`${letters[0]}-0`}
        initial={{ x: 20, opacity: 0 }}
        animate={{
          x: -10,
          opacity: 1,
        }}
        transition={{
          ease: "anticipate",
          duration: 0.3,
        }}
        className={`text-7xl`}
      >
        {letters[0]}
      </motion.span>
      {enableNextLetter && (
        <motion.span
          key={`${letters[1]}-1`}
          initial={{ x: 0, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 0.5,
          }}
          transition={{
            ease: "anticipate",
            duration: 0.3,
          }}
          className={`text-4xl text-gray-500`}
        >
          {letters[1]}
        </motion.span>
      )}
    </div>
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
  const { letters, get } = useRandomLetter(rhythmSettings);

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
    get();
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
      if (!started && letters[0] === event.key) {
        start();
        gStart();
        setStarted(true);
      }

      // if correct letter pressed
      if (event.key === letters[0] && !gGameOver && !gameOver) {
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
    letters,
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
          <div className="flex flex-col space-y-8 items-center">
            <LetterDisplayBox
              letters={letters}
              enableNextLetter={!!rhythmSettings.enableNextLetter}
            />
            {!!letters[0] && (
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
        <SettingModal onOpen={handleRetry} />
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
