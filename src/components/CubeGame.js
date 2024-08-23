import React, { useState, useEffect } from 'react';
import './CubeGame.css';

const GRID_SIZE = 10;

const CubeGame = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [nextIndex, setNextIndex] = useState(null);

  const getRandomIndex = () => Math.floor(Math.random() * GRID_SIZE * GRID_SIZE);

  const calculateNextPosition = (index) => {
    const matrix = Array.from({ length: GRID_SIZE }, (_, i) =>
      Array.from({ length: GRID_SIZE }, (_, j) => i * GRID_SIZE + j)
    );
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;
    const direction = getRandomDirection();
    let newRow = row;
    let newCol = col;

    switch (direction) {
      case 'right':
        if (col < GRID_SIZE - 1) newCol = col +1;
        break;
      case 'left':
        if (col > 0) newCol = col - 1;
        break;
      case 'up':
        if (row > 0) newRow = row - 1;
        break;
      case 'down':
        if (row < GRID_SIZE - 1) newRow = row + 1;
        break;
      default:
        break;
    }

    return matrix[newRow][newCol];
  };

  const getRandomDirection = () => {
    const directions = ['right', 'left', 'up', 'down'];
    return directions[Math.floor(Math.random() * directions.length)];
  };

  const moveCube = () => {
    const newNextIndex = calculateNextPosition(activeIndex);
    setActiveIndex(nextIndex);
    setNextIndex(newNextIndex);
  };

  const handleCubeClick = (index) => {
    if (index === nextIndex) {
      setScore(score + 1);
    }
    moveCube(); 
  };

  useEffect(() => {
    const initialIndex = getRandomIndex();
    setActiveIndex(initialIndex);
    setNextIndex(calculateNextPosition(initialIndex));
  }, []);

  return (
    <div>
      <div id="game-board">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => (
          <div
            key={index}
            className={`cube ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleCubeClick(index)}
          />
        ))}
      </div>
      <div>Score: {score}</div>
      <button onClick={() => {
        const newIndex = getRandomIndex();
        setActiveIndex(newIndex);
        setNextIndex(calculateNextPosition(newIndex));
        setScore(0);
      }}>
        Restart
      </button>
    </div>
  );
};

export default CubeGame;
