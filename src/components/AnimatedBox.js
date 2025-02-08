// components/AnimatedBox.js
import React, { useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';

const AnimatedBox = () => {
  useEffect(() => {
    anime({
      targets: '.circle',
      scale: [
        { value: 0, duration: 0 },
        { value: 1, duration: 1600, easing: 'easeOutExpo' }
      ],
      opacity: [
        { value: 0, duration: 0 },
        { value: 1, duration: 1600, easing: 'easeOutExpo' }
      ],
      translateY: [
        { value: -50, duration: 0 },
        { value: 0, duration: 1600, easing: 'easeOutExpo' }
      ],
      delay: anime.stagger(600), // Stagger the animations
      loop: true, // Loop the animation
      direction: 'alternate', // Alternate the animation direction
    });
  }, []);

  return (
    <div className="animation-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '1vh' }}>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="circle"
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: `hsl(${index * 60}, 100%, 50%)`, // Different colors
            margin: '10px',
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBox;