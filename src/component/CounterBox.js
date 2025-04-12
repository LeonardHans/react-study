import React, { useEffect } from 'react';
import counterStore from '../store/counterStore';
import InputButton from './InputButton';

const CounterBox = () => {
    const { count, target, reset, increaseCount, decreaseCount, multiplyCount, divideCount, score } = counterStore();

    useEffect(() => {
        if (count === target) {
            alert('Congrats! you made it in ' + score + ' attempt(s)!');
            reset();
        }
    }, [count]);
    
    return (<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Count : {count}</h1>
        <p>You can only set from 1 to 100 integer value in the box</p>
        <InputButton name="increase" func={increaseCount}/>
        <InputButton name="descrese" func={decreaseCount}/>
        <InputButton name="multiply" func={multiplyCount}/>
        <InputButton name="divide" func={divideCount}/>
    </div>)
}

export default CounterBox;