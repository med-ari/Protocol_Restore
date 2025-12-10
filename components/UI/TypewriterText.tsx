
import React, { useState, useEffect, useRef } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export const TypewriterText = React.memo(({ 
  text, 
  speed = 20, 
  className = '',
  onComplete 
}: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    setDisplayedText('');
    indexRef.current = 0;
    hasCompletedRef.current = false;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      // Ensure we haven't exceeded bounds
      if (indexRef.current < text.length) {
        // Append next char
        const nextChar = text.charAt(indexRef.current);
        setDisplayedText((prev) => prev + nextChar);
        indexRef.current++;
      } else {
        // Text is complete
        if (timerRef.current) clearInterval(timerRef.current);
        if (onComplete && !hasCompletedRef.current) {
            hasCompletedRef.current = true;
            onComplete();
        }
      }
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, speed, onComplete]);

  return (
    <span className={`${className} font-mono`}>
      {displayedText}
      <span className="animate-pulse ml-0.5 text-cyber-primary bg-cyber-primary text-cyber-bg inline-block w-3 h-5 align-middle"> </span>
    </span>
  );
});

TypewriterText.displayName = 'TypewriterText';
