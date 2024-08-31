import React, { useReducer, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import { GearIcon } from "./icons/GearIcon";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import type { TRhythmSettings } from "@/types";
import { useRhythmSettingsStore } from "@/hooks/zustand/use-rhythm-settings";

const initialValues: TRhythmSettings = {
  gameDuration: 30000,
  letterDuration: 1500,
  enableNumbers: false,
  enableSpecialCharacters: false,
  enableUppercaseLetters: false,
  enableUppercaseSpecialCharacters: false,
};

export default function SettingModal() {
  const [open, setOpen] = useState(false);
  const { rhythmSettings, saveSettings } = useRhythmSettingsStore((state) => ({
    rhythmSettings: state.rhythmSettings,
    saveSettings: state.saveSettings,
  }));

  const handleSubmit = (values: TRhythmSettings) => {
    saveSettings(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"}>
          <GearIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Game Settings</DialogTitle>
          <DialogDescription>
            Configure your gameplay experience
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 space-x-4">
          <Label htmlFor="game-duration">Game duration in milliseconds</Label>
          <Input id="game-duration" type="number" min={0} />
        </div>

        <div className="grid grid-cols-2 space-x-4">
          <Label htmlFor="letter-duration">
            Duration per letter in milliseconds
          </Label>
          <Input id="letter-duration" type="number" min={0} />
        </div>

        <div className="flex space-x-2">
          <Checkbox id="numbers-enable" onCheckedChange={(value) => {}} />
          <Label htmlFor="numbers-enable">Enable numbers</Label>
        </div>

        <div className="flex space-x-2">
          <Checkbox id="special-chars-enable" onCheckedChange={(value) => {}} />
          <Label htmlFor="special-chars-enable">
            Enable special characters
          </Label>
        </div>

        <div className="flex space-x-2">
          <Checkbox
            id="uppercase-chars-enable"
            onCheckedChange={(value) => {}}
          />
          <Label htmlFor="uppercase-chars-enable">
            Enable uppercase letters
          </Label>
        </div>

        <div className="flex space-x-2">
          <Checkbox id="uppercase-special-chars-enable" />
          <Label htmlFor="uppercase-special-chars-enable">
            Enable uppercase special characters (special characters that
            requires you to hold shift)
          </Label>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button variant={"akmalmohtar"} type="submit">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
