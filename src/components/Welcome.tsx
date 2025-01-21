import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css'; 

const Welcome: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  
  const createMatrixColumns = () => {
    const columns = [];
    for (let i = 0; i < 30; i++) {
      const randomLetters = Array.from({ length: 20 }, () =>
        String.fromCharCode(0xAC00 + Math.random() * (0xD7A3 - 0xAC00))
      ).join('');
      columns.push(
        <div
          key={i}
          className="matrixColumn"
          style={{
            left: `${i * 3.5}%`,
            '--delay': Math.random(),
          } as React.CSSProperties}
        >
          {randomLetters.split('').map((char, index) => (
            <span key={index}>{char}</span>
          ))}
        </div>
      );
    }
    return columns;
  };

  const [matrixColumns, setMatrixColumns] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setMatrixColumns(createMatrixColumns());
  }, []);

  const butterflyCount = 10;

  return (
    <div className="welcomePage">
      <div className="matrixRain">
        {matrixColumns}
      </div>
      <div className="welcomeText">
        <h1>Welcome to My Portfolio</h1>
        <br />
        <button 
          className="welcomeButton" 
          onClick={() => navigate('/bio')}
        >
          Let's Explore My BIO
          <br />
          <span className="buttonSubtitle">내 BIO를 확인하세요</span>
        </button>
      </div>
      
      {[...Array(butterflyCount)].map((_, index) => (
        <div
          className="butterfly"
          key={index}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`, 
            animationDelay: `${Math.random() * 5}s`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Welcome;
