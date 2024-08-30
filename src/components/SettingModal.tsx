import React from "react";
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

export default function SettingModal() {
  const {
    getValues,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TRhythmSettings>({
    defaultValues: {
      gameDuration: 30000,
      letterDuration: 1500,
      enableNumbers: true,
      enableSpecialCharacters: true,
      enableUppercaseLetters: true,
      enableUppercaseSpecialCharacters: true,
    },
  });

  const onSubmit = (values: TRhythmSettings) => {
    console.log("values", values);
  };

  return (
    <Dialog>
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-4"
        >
          <div className="grid grid-cols-2 space-x-4">
            <Label htmlFor="game-duration">Game duration in milliseconds</Label>
            <Input
              id="game-duration"
              type="number"
              min={0}
              {...register("gameDuration")}
            />
            {errors.gameDuration && (
              <p className="text-red-500">{errors.gameDuration.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 space-x-4">
            <Label htmlFor="letter-duration">
              Duration per letter in milliseconds
            </Label>
            <Input
              id="letter-duration"
              type="number"
              min={0}
              {...register("letterDuration")}
            />
            {errors.letterDuration && (
              <p className="text-red-500">{errors.letterDuration.message}</p>
            )}
          </div>

          <div className="flex space-x-2">
            <Checkbox
              id="numbers-enable"
              onCheckedChange={(value) => setValue("enableNumbers", !!value)}
              defaultChecked={getValues("enableNumbers")}
              {...register("enableNumbers")}
            />
            <Label htmlFor="numbers-enable">Enable numbers</Label>
          </div>

          <div className="flex space-x-2">
            <Checkbox
              id="special-chars-enable"
              onCheckedChange={(value) =>
                setValue("enableSpecialCharacters", !!value)
              }
              defaultChecked={getValues("enableSpecialCharacters")}
              {...register("enableSpecialCharacters")}
            />
            <Label htmlFor="special-chars-enable">
              Enable special characters
            </Label>
          </div>

          <div className="flex space-x-2">
            <Checkbox
              id="uppercase-chars-enable"
              onCheckedChange={(value) =>
                setValue("enableUppercaseLetters", !!value)
              }
              defaultChecked={getValues("enableUppercaseLetters")}
              {...register("enableUppercaseLetters")}
            />
            <Label htmlFor="uppercase-chars-enable">
              Enable uppercase letters
            </Label>
          </div>

          <div className="flex space-x-2">
            <Checkbox
              id="uppercase-special-chars-enable"
              defaultChecked={getValues("enableUppercaseSpecialCharacters")}
              {...register("enableUppercaseSpecialCharacters")}
            />
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
        </form>
      </DialogContent>
    </Dialog>
  );
}
