import React, { useReducer, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GearIcon } from "@/components/icons/GearIcon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { TRhythmSettings } from "@/types";
import { useRhythmSettingsStore } from "@/hooks/zustand/use-rhythm-settings";
import { useForm } from "@tanstack/react-form";

export default function SettingModal({ onOpen }: { onOpen: () => void }) {
  const [open, setOpen] = useState(false);
  const { rhythmSettings, saveSettings } = useRhythmSettingsStore((state) => ({
    rhythmSettings: state.rhythmSettings,
    saveSettings: state.saveSettings,
  }));

  const handleSubmit = ({ value }: { value: TRhythmSettings }) => {
    saveSettings(value);
    setOpen(false);
  };

  const tanForm = useForm<TRhythmSettings>({
    defaultValues: rhythmSettings,
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"ghost"} onClick={onOpen}>
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            tanForm.handleSubmit();
          }}
          className="space-y-4"
        >
          <tanForm.Field name="gameDuration">
            {(field) => (
              <div className="grid grid-cols-2 space-x-4">
                <Label htmlFor={field.name}>
                  Game duration in milliseconds
                </Label>
                <Input
                  id={field.name}
                  type="number"
                  min={0}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(+e.target.value)}
                />
              </div>
            )}
          </tanForm.Field>

          <tanForm.Field name="letterDuration">
            {(field) => (
              <div className="grid grid-cols-2 space-x-4">
                <Label htmlFor={field.name}>
                  Duration per letter in milliseconds
                </Label>
                <Input
                  id={field.name}
                  type="number"
                  min={0}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(+e.target.value)}
                />
              </div>
            )}
          </tanForm.Field>

          <tanForm.Field name="enableNextLetter">
            {(field) => (
              <div className="flex space-x-2">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(e) => field.handleChange(e)}
                />
                <Label htmlFor={field.name}>Enable next letter preview</Label>
              </div>
            )}
          </tanForm.Field>

          <tanForm.Field name="enableNumbers">
            {(field) => (
              <div className="flex space-x-2">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(e) => field.handleChange(e)}
                />
                <Label htmlFor={field.name}>Enable numbers</Label>
              </div>
            )}
          </tanForm.Field>

          <tanForm.Field name="enableSpecialCharacters">
            {(field) => (
              <div className="flex space-x-2">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(e) => field.handleChange(e)}
                />
                <Label htmlFor={field.name}>Enable special characters</Label>
              </div>
            )}
          </tanForm.Field>

          <tanForm.Field name="enableUppercaseLetters">
            {(field) => (
              <div className="flex space-x-2">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(e) => field.handleChange(e)}
                />
                <Label htmlFor={field.name}>Enable uppercase letters</Label>
              </div>
            )}
          </tanForm.Field>

          <tanForm.Field name="enableUppercaseSpecialCharacters">
            {(field) => (
              <div className="flex space-x-2">
                <Checkbox
                  id={field.name}
                  checked={field.state.value}
                  onCheckedChange={(e) => field.handleChange(e)}
                />
                <Label htmlFor={field.name}>
                  Enable uppercase special characters (special characters that
                  requires you to hold shift)
                </Label>
              </div>
            )}
          </tanForm.Field>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <tanForm.Subscribe>
              {() => (
                <Button variant={"akmalmohtar"} type="submit">
                  Save
                </Button>
              )}
            </tanForm.Subscribe>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
