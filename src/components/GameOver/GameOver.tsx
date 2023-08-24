import React from 'react';
import './GameOver.css';
import {GameOverProps} from './types';

const GameOver: React.FC<GameOverProps> = ({score, onRestart}) => {
    return (
        <div className="GameOverBack">
            <div className="GameOverBlock">
                <h1>Game Over</h1>
                <p>Your score: {score}</p>
                <button className="RestartButton" onClick={onRestart}>Restart</button>
            </div>
        </div>
    );
};

export default GameOver;
