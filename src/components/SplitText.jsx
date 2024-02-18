import React, { memo } from 'react';

const SplitText = memo(({ str, splitType = "words" }) => {
  // Fonction pour diviser le texte en lettres ou en mots
  const splitText = (text, type) => {
    return type === "letters" ? text.split("").map((letter, index) => (
      <span className="letter" key={index}>
        {letter === ' ' ? '\u00A0' : letter}
      </span>
    )) : text.split(" ").map((word, index) => (
      <span className="word" key={index}>
        {word}{' '}
      </span>
    ));
  };

  return (
    <span>
      {splitText(str, splitType)}
    </span>
  );
});

export default SplitText;
