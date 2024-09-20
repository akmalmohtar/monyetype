import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import TypingTest from "./_components/typing/Typing";
import { Rhythm } from "./_components/rhythm/Rhythm";

export default function GamePage() {
  return (
    <Tabs
      defaultValue="typing"
      className="w-full h-full flex flex-col space-y-10 items-center"
    >
      <TabsList className="w-[50%] grid grid-cols-2 rounded p-0">
        <TabsTrigger value="typing">Typing Test</TabsTrigger>
        <TabsTrigger value="rhythm">Rhythm Letter</TabsTrigger>
      </TabsList>
      <TabsContent value="typing" className="w-full">
        <TypingTest />
      </TabsContent>
      <TabsContent value="rhythm" className="w-full">
        <Rhythm />
      </TabsContent>
    </Tabs>
  );
}
