import React from "react";

export function Card({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-white/40 backdrop-blur-sm p-6 rounded shadow-lg w-full mx-auto border border-white/40">
      {children}
    </div>
  );
}
