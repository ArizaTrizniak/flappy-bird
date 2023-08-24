import React from 'react';
import './Pipe.css';
import {PipeProps} from './types';

const Pipe: React.FC<PipeProps> = ({x, y}) => {
    return (
        <div className="Pipe" style={{position: 'absolute', left: x, top: y}}/>
    );
};

export default Pipe;
