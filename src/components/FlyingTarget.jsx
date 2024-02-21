import React, { useState, useEffect } from 'react';
import dunder_mifflin from '../assets/dunder_mifflin.png';

const FlyingTarget = ({ onClick }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  const generateRandomPosition = () => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    setPosition({ x: randomX, y: randomY });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      generateRandomPosition();
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src={dunder_mifflin}
      alt="flying Dunder Mifflin logo"
      className="w-40 h-25 absolute cursor-pointer hover:animate-spin"
      style={{ top: position.y, left: position.x, transition: 'all 0.4s ease' }}
      onClick={onClick}
    />
  );
};

export default FlyingTarget;
