import React from 'react';
import {ScoreboardProps} from './types';

const Scoreboard: React.FC<ScoreboardProps> = ({score}) => {
    return <div>Score: {score}</div>;
};

export default Scoreboard;
