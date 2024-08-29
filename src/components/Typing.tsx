"use client";
import React, { useState, useEffect } from "react";
import { getRandomWords } from "../lib/getRandomWords";
import ResultPage from "./Result";
import { DifficultyBar } from "./DifficultyBar";
import { TDifficulty } from "@/types";
import { Button } from "./ui/button";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const TIMER: number = 10;
const MAX_WORDS: number = 10;

interface WPMEntry {
  time: number;
  wpm: number;
}

const TypingTest: React.FC = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<number>(0);
  const [totalTypedChars, setTotalTypedChars] = useState<number>(0);
  const [errors, setErrors] = useState<number>(0);
  const [timer, setTimer] = useState<number>(TIMER);
  const [started, setStarted] = useState<boolean>(false);
  const [testEnded, setTestEnded] = useState<boolean>(false);
  const [wpmHistory, setWpmHistory] = useState<WPMEntry[]>([]);
  const [lastUpdate, setLastUpdate] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<TDifficulty>("medium");

  useEffect(() => {
    setWords(getRandomWords(MAX_WORDS, difficulty).split(" "));
  }, [difficulty]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (testEnded) return;
      if (!started) {
        setStarted(true); // Start the timer on the first key press
      }

      const currentWord = words[currentWordIndex];
      const currentLetter = currentWord?.[currentLetterIndex];

      if (event.key === currentLetter) {
        setCurrentLetterIndex(currentLetterIndex + 1);
        setTotalTypedChars(totalTypedChars + 1);
      } else if (event.key === " ") {
        if (currentLetterIndex === currentWord.length) {
          setCurrentWordIndex(currentWordIndex + 1);
          setCurrentLetterIndex(0);
          setCorrectWords(correctWords + 1);
        }
        setTotalTypedChars(totalTypedChars + 1);
      } else {
        setErrors(errors + 1);
        setTotalTypedChars(totalTypedChars + 1);
      }

      if (started) {
        const elapsedTime = TIMER - timer;

        // Update only if 1 second has passed
        if (elapsedTime >= lastUpdate + 1) {
          const wpm = ((correctWords / elapsedTime) * 60).toFixed(2);
          setWpmHistory((prevHistory) => [
            ...prevHistory.filter((entry) => entry.time !== elapsedTime),
            { time: elapsedTime, wpm: parseFloat(wpm) },
          ]);
          setLastUpdate(elapsedTime); // Update lastUpdate time
        }
      }
    };

    // Attach keydown listener
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Cleanup listener on unmount and when test ends
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    words,
    currentWordIndex,
    currentLetterIndex,
    correctWords,
    started,
    totalTypedChars,
    errors,
    testEnded,
    timer,
    lastUpdate,
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (started && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    }

    // Check the end of the test
    if (words.length > 0) {
      if (timer === 0) {
        setTimer(0);
        setTestEnded(true);
        clearInterval(interval!);
      }
      if (currentWordIndex >= words.length) {
        setTimer(lastUpdate);
        setTestEnded(true);
        clearInterval(interval!);
      }
    }

    return () => clearInterval(interval!);
  }, [started, timer, currentWordIndex, words.length, words, lastUpdate]);

  const handleReset = () => {
    setWords(getRandomWords(MAX_WORDS, difficulty).split(" "));
    setCurrentWordIndex(0);
    setCurrentLetterIndex(0);
    setCorrectWords(0);
    setTotalTypedChars(0);
    setErrors(0);
    setTimer(TIMER);
    setStarted(false);
    setTestEnded(false);
    setWpmHistory([]); // Reset WPM history
  };

  const handleDifficultyChange = (tabValue: string) => {
    setDifficulty(tabValue as TDifficulty);
    handleReset();
  };

  return (
    <div className="flex flex-col h-full items-center justify-start py-48 size-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      {testEnded ? (
        <ResultPage
          correctWords={correctWords}
          totalTypedChars={totalTypedChars}
          errors={errors}
          timer={timer}
          defaultTimer={TIMER}
          wpmHistory={wpmHistory}
        />
      ) : (
        <>
          <DifficultyBar
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
          />
          <div>
            {words.length > 0 && (
              <div className="mb-10 text-black text-4xl w-3/4 lg:w-11/12 mx-auto ">
                {words.map((word, wordIndex) => (
                  <span key={wordIndex} className="mr-2">
                    {word.split("").map((letter, letterIndex) => (
                      <span
                        key={letterIndex}
                        className={`${
                          wordIndex === currentWordIndex &&
                          letterIndex === currentLetterIndex
                            ? "bg-gray-300" // Highlight current letter
                            : wordIndex === currentWordIndex &&
                                letterIndex < currentLetterIndex
                              ? "text-orange-600" // Correctly typed letters in the current word
                              : wordIndex < currentWordIndex
                                ? "text-orange-600" // Correctly typed words
                                : ""
                        }`}
                      >
                        {letter}
                      </span>
                    ))}
                    {wordIndex < words.length - 1 ? " " : ""}
                  </span>
                ))}
              </div>
            )}
          </div>
          <>
            {words.length > 0 && (
              <>
                <div className="relative mt-10">
                  <div className=" bg-orange-600 w-36 h-36 rounded-full absolute -top-5 right-80"></div>
                </div>
                <div className="bg-white/40 backdrop-blur-sm p-6 rounded shadow-lg w-1/2  mx-auto border border-white/40">
                  <div className="flex justify-between items-center text-black">
                    <div>
                      <p>Time Left: {timer}s</p>
                      <p>Correct Words: {correctWords}</p>
                    </div>
                    <Button onClick={handleReset} variant="akmalmohtar">
                      Reset
                    </Button>
                  </div>
                </div>
              </>
            )}
          </>
        </>
      )}
    </div>
  );
};

export default TypingTest;
