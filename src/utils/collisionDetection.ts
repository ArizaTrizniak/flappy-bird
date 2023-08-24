import {BirdProps} from '../components/Bird/types';
import {PipeProps} from "../components/Pipe/types";

export interface Border {
    x: number;
    y: number;
}

const collisionDetection = (bird: BirdProps, pipes: PipeProps[], border: Border) => {
    if (bird.y + 25 > border.y || bird.y < 0) {
        return true;
    }
    return pipes.some(pipe => {
        return (
            bird.x < pipe.x + 10 &&
            bird.x + 25 > pipe.x &&
            bird.y < pipe.y + 100 &&
            bird.y + 25 > pipe.y
        );
    });
};

export default collisionDetection;
