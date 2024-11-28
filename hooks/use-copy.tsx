"use client";
import { useState } from "react";

const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      // Reset the "copied" state after 2 seconds (optional)
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return {
    copied,
    copyText,
  };
};

export default useCopyToClipboard;
