import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GearIcon } from "@radix-ui/react-icons";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";

type TypeSettingModalProps = {
  // onTimerChange: any;
  onMaxWordsChange: any;
};

const TypingSettingModal = ({
  // onTimerChange,
  onMaxWordsChange,
}: TypeSettingModalProps) => {
  // const [timer, setTimer] = useState<number>(10);
  // console.log("🚀 ~ timer2:", timer);
  const [maxWords, setMaxWords] = useState<number>(10);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        onKeyDown={(event) => {
          if (event.key === " " || event.key === "Enter") {
            event.preventDefault();
          }
        }}
      >
        <GearIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Settings</DialogTitle>
          <DialogDescription>Set custom time and words count</DialogDescription>
          <div className="flex flex-col justify-between gap-6">
            <span className="text-gray-500">
              Time (Locked){" "}
              <Slider
                disabled
                defaultValue={[10]}
                // value={[timer]}
                max={100}
                step={1}
                // onValueChange={(value) => setTimer(value[0])}
              />
            </span>
            <span>
              Words Count{" "}
              <Slider
                defaultValue={[10]}
                max={100}
                step={1}
                onValueChange={(value) => setMaxWords(value[0])}
              />
            </span>
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="submit"
            variant={"akmalmohtar"}
            onClick={() => {
              onMaxWordsChange(maxWords);
              setIsOpen(false);
            }}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TypingSettingModal;
