// components/TypingEffect.tsx
import React, { useState, useEffect, ElementType } from "react";

interface TypingEffectProps {
  text: string; // Text to type out
  speed?: number; // Speed of typing in milliseconds (default: 100)
  wrapper?: ElementType; // Type of HTML element (default: "span")
  className?: string; // Additional classes for styling
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  text,
  speed = 100,
  wrapper: Wrapper = "span",
  className = "",
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex < text.length - 1) {
        setDisplayedText((prev) => prev + text[currentIndex]);
        currentIndex++;
        setTimeout(typeText, speed);
      }
    };

    typeText();

    return () => {
      currentIndex = text.length; // Cleanup if the component unmounts
    };
  }, [text, speed]);

  return (
    <Wrapper className={`typing-effect ${className}`}>
      {displayedText}
      {/* <span className="animate-blink">|</span> */}
    </Wrapper>
  );
};

export default TypingEffect;
