import { TRhythmSettings } from "@/types";
import { create } from "zustand";

type RhythmSettingsState = {
  rhythmSettings: TRhythmSettings;
  saveSettings: (newSettings: TRhythmSettings) => void;
};

const initialRhythmSettings: TRhythmSettings = {
  gameDuration: 30000,
  letterDuration: 1500,
  enableNumbers: false,
  enableSpecialCharacters: false,
  enableUppercaseLetters: false,
  enableUppercaseSpecialCharacters: false,
};

export const useRhythmSettingsStore = create<RhythmSettingsState>()((set) => ({
  rhythmSettings: initialRhythmSettings,
  saveSettings: (newSettings) =>
    set((state) => ({ ...state, rhythmSettings: newSettings })),
}));
