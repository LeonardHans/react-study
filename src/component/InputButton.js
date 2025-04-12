import React, { useState } from 'react';
import counterStore from '../store/counterStore';

const InputButton = ({ name, func }) => {
    const { increaseScore } = counterStore();
    const [inputValue, setInputValue] = useState(1);

    return (<div>

        <button onClick={() => {
            increaseScore();
            func(inputValue);
        }}>{name}</button>

        <input type="number" min="1" max="100" defaultValue={1} onChange={(e) => {
            let val = Number(e.target.value);
            if (100 <= val) {
                val = 100;
            }
            else if (val <= 1) {
                val = 1;
            }
            e.target.value = val;
            setInputValue(val);
        }}></input>

    </div>)
}

export default InputButton