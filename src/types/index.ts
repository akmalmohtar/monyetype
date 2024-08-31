import type { CheckedState } from "@radix-ui/react-checkbox";
import type { Updater } from "@tanstack/react-form";

export type TDifficulty = "easy" | "medium" | "hard";

export type TRhythmSettings = {
  gameDuration: number;
  letterDuration: number;
  enableNumbers: CheckedState;
  enableSpecialCharacters: CheckedState;
  enableUppercaseLetters: CheckedState;
  enableUppercaseSpecialCharacters: CheckedState;
};
