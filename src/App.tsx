import React, {useState} from 'react';
import './App.css';
import Bird, {BirdCollision} from './components/Bird/Bird';
import Pipe from './components/Pipe/Pipe';
import Scoreboard from './components/Scoreboard/Scoreboard';
import GameOver from './components/GameOver/GameOver';
import useInterval from './hooks/useInterval';
import useKeyPress from './hooks/useKeyPress';
import collisionDetection, {Border} from './utils/collisionDetection';
import {BirdProps} from './components/Bird/types';
import {PipeProps} from './components/Pipe/types';

function App() {
    const border: Border = {x: 500, y: 300};

    const pipeY = () => {
        const position = Math.random() * border.y - 100;
        return position > 50 ? position : 50;
    };

    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [bird, setBird] = useState<BirdProps>({x: 50, y: 50});
    const [pipes, setPipes] = useState<PipeProps[]>([
        {x: 100, y: pipeY()},
        {x: border.x / 2, y: pipeY()},
        {x: border.x - 20, y: pipeY()}
    ]);

    const clear = () => {
        setGameOver(false);
        setScore(0);
        setBird(prevBird => ({x: 50, y: 50}));
        setPipes(prevPipes => [
            {x: 100, y: pipeY()},
            {x: border.x / 2, y: pipeY()},
            {x: border.x - 20, y: pipeY()}
        ]);
    };

    useKeyPress(' ', () => {
        if (!gameOver) {
            setBird(prevBird => ({...prevBird, y: prevBird.y - 10}));
        }
    });

    useInterval(() => {
        if (!gameOver) {
            setBird(prevBird => ({...prevBird, y: prevBird.y + 5}));

            setPipes(prevPipes =>
                prevPipes.map(pipe => ({...pipe, x: pipe.x - 5})).filter(pipe => pipe.x > 0)
            );
            if (pipes.length < 5 && pipes[pipes.length - 3].x < 50) {
                setPipes(prevPipes => [...prevPipes, {x: border.x - 10, y: pipeY()}]);
            }

            if (collisionDetection(bird, pipes, border)) {
                setGameOver(true);
            } else if (pipes[0].x < 20) {
                setScore(prevScore => prevScore + 1);
                setPipes(prevPipes => prevPipes.slice(1));
            }
        }
    }, 200);

    return (
        <div className="App">
            <Scoreboard score={score}/>
            <div className="Field">
                {!gameOver && <Bird x={bird.x} y={bird.y}/>}
                {gameOver && <BirdCollision x={bird.x} y={bird.y}/>}
                {pipes.map((pipe, i) => (
                    <Pipe key={i} x={pipe.x} y={pipe.y}/>
                ))}
                {gameOver && <GameOver score={score} onRestart={() => clear()}/>}
            </div>
        </div>
    );
}

export default App;
