
import React from 'react';

interface MathTextProps {
  text: string;
  className?: string;
  themeColor?: string;
}

export const MathText: React.FC<MathTextProps> = ({ text, className = '', themeColor = 'text-cyber-primary' }) => {
  // Parsing Logic:
  // 1. Split by BOLD tags first (**...**) to protect them.
  // 2. Then split by Exponents (^...).
  // 3. Finally apply replacement of * -> × only on parts that are NOT bold.
  
  // Regex captures bold groups: (** content **)
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return (
    <span className={`font-mono inline-block leading-relaxed whitespace-pre-wrap ${className}`}>
      {parts.map((part, index) => {
        
        // 1. Handle Bold: **text**
        if (part.startsWith('**') && part.endsWith('**')) {
          const content = part.slice(2, -2);
          return (
            <span 
              key={index} 
              className="font-black tracking-wide text-yellow-400 drop-shadow-[0_2px_0px_rgba(0,0,0,1)] bg-gray-900/50 px-1 rounded mx-0.5 border-b-2 border-yellow-600/50"
              style={{ fontFamily: '"Silkscreen", cursive' }}
            >
              {content}
            </span>
          );
        }

        // Process non-bold parts for exponents and symbols
        return (
            <span key={index}>
                {part.split(/(\^[a-zA-Z0-9]+|\^\([^)]+\)|\^-[a-zA-Z0-9]+)/g).map((subPart, subIndex) => {
                    // 2. Handle Exponents
                    if (subPart.startsWith('^')) {
                        const cleanContent = subPart.replace('^', '').replace(/^\(/, '').replace(/\)$/, '');
                        return (
                            <sup key={subIndex} className={`text-[0.7em] font-bold ${themeColor} ml-px`}>
                                {cleanContent}
                            </sup>
                        );
                    }
                    
                    // 3. Handle Normal Text (Symbol Replacement)
                    // Only replace * with × here, inside non-bold text
                    return <span key={subIndex}>{subPart.replace(/\*/g, ' × ')}</span>;
                })}
            </span>
        );
      })}
    </span>
  );
};
