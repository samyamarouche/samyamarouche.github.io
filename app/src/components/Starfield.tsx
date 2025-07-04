import React from 'react';

function Starfield() {
  // Generate 80 random stars
  const stars = Array.from({ length: 80 }).map((_, i) => {
    const size = Math.random() * 2 + 1; // 1px to 3px
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const delay = Math.random() * 3;
    return (
      <div
        key={i}
        className="starfield-star"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: `${top}%`,
          left: `${left}%`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });
  return <div className="starfield">{stars}</div>;
}

export default Starfield; 