import type { CheckedState } from "@radix-ui/react-checkbox";

export type TDifficulty = "easy" | "medium" | "hard";

export type TRhythmSettings = {
  gameDuration: number;
  letterDuration: number;
  enableNumbers: CheckedState;
  enableSpecialCharacters: CheckedState;
  enableUppercaseLetters: CheckedState;
  enableUppercaseSpecialCharacters: CheckedState;
};
