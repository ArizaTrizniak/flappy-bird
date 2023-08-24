import {useEffect, useState} from 'react';

const useKeyPress = (targetKey: string, onPress: () => void) => {
    const [keyPressed, setKeyPressed] = useState(false);

    useEffect(() => {
        const downHandler = ({key}: { key: string }) => {
            if (key === targetKey) {
                setKeyPressed(true);
                onPress();
            }
        };

        const upHandler = ({key}: { key: string }) => {
            if (key === targetKey) {
                setKeyPressed(false);
            }
        };

        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, [targetKey, onPress]);

    return keyPressed;
};

export default useKeyPress;
