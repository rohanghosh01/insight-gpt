// components/TypingEffect.tsx
import React, { useEffect } from "react";
import Typewriter from "typewriter-effect";
interface TypingEffectProps {
  text: string; // Text to type out
  speed?: number; // Speed of typing in milliseconds (default: 100)
  className?: string; // Additional classes for styling
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 100,
  className = "",
}) => {
  useEffect(() => {
    // Remove blinking cursor after typing is complete
    const cursor: any = document.querySelector(".Typewriter__cursor");
    if (cursor) {
      setTimeout(() => {
        cursor.style.display = "none"; // Hides the cursor
      }, 1500); // Adjust timeout to match the typing duration
    }
  }, []);

  return (
    <div className={className}>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString(text) // The text to type
            .start(); // Start typing
        }}
        options={{
          autoStart: true,
          loop: false, // Prevents looping
          delay: speed || 50, // Adjust typing speed
        }}
      />
    </div>
  );
};

export default TypingEffect;
