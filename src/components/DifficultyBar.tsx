import React from "react";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { TDifficulty } from "@/types";

type DifficultyBarProps = {
  difficulty: TDifficulty;
  onDifficultyChange: (t: string) => void;
};

export const DifficultyBar = ({
  difficulty,
  onDifficultyChange,
}: DifficultyBarProps) => {
  return (
    <div className="pb-10">
      <Tabs value={difficulty} onValueChange={onDifficultyChange}>
        <TabsList className="grid w-full grid-cols-3 rounded p-2">
          <TabsTrigger value="easy">Easy</TabsTrigger>
          <TabsTrigger value="medium">Medium</TabsTrigger>
          <TabsTrigger value="hard">Hard</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};
