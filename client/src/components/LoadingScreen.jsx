import React, { useEffect, useState } from 'react';
import bot from '../assets/bot.png';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10; // Adjusted increment for smoother progress
      });
    }, 500); // Adjusted timing for smoother progress (0.5s)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="bot-container">
          <img src={bot} alt="M.A.D.H.A.V.A. Bot" className="bot-image" />
          <div className="pulse-ring"></div>
        </div>
        <div className="loading-text">
          <div className="dots-container">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </div>
          <div className="status-text">Processing your request</div>
        </div>
        <div className="loading-bar">
          <div 
            className="loading-progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen; 