// context/todoContext.tsx
"use client";
import React, { useState } from "react";
import { rootContextType } from "@/types/context";

export const RootContext = React.createContext<rootContextType>({
  isGenerating: false,
  setIsGenerating: () => {},
});

const RootProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  return (
    <RootContext.Provider value={{ isGenerating, setIsGenerating }}>
      {children}
    </RootContext.Provider>
  );
};

export default RootProvider;
