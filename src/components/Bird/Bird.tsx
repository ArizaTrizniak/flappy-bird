import React from 'react';
import './Bird.css';
import {BirdProps} from './types';

const Bird: React.FC<BirdProps> = ({x, y}) => {
    return <div className="Bird" style={{position: 'absolute', left: x, top: y}}>🐦</div>;
};
export const BirdCollision: React.FC<BirdProps> = ({x, y}) => {
    return <div className="BirdCollision" style={{position: 'absolute', left: x, top: y}}>💥</div>;
};

export default Bird;
