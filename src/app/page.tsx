import TypingTest from "@/components/Typing";
import React from "react";

const App = () => {
  return (
    <div className="App">
      <header className="text-6xl font-semibold text-center p-8 tracking-wider">
        Monye<span className="text-orange-600">t</span>ype
        <span className="text-orange-600">.</span>
      </header>
      <TypingTest />
    </div>
  );
};

export default App;
