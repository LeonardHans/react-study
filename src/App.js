import { useEffect, useState } from 'react';
import Timer from './component/Timer';
import './App.css';

class Test {
  constructor(value) {
    this.value = value;
  }
  add(other) {
    this.value += other;
  }
}

function App() {

  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [ex, setEx] = useState(0);

  const [showTimer, setShowTimer] = useState(true);

  const handleClick = () => {
    setCount( (prev) => prev + 1 );
    setCount( (prev) => prev + 1 );
    setCount( (prev) => prev + 1 );

    setValue( (prev) => prev + 1 );
  }

  useEffect( () => {
    console.log("OnStart");
  }, [] ) /* 배열에 인자가 없으므로 첫 시작때만 호출됨 */

  useEffect( () => {
    console.log("OnUpdate [count] or [value]");
  }, [count, value] ) /* 배열에 있는 state중 하나라도 업데이트 될 경우 해당하는 useEffect가 호출 됨 */

  useEffect( () => {
    console.log("OnUpdate [count]");
  }, [count] ) /* 배열에 있는 count가 업데이트 될 경우 해당하는 useEffect가 호출 됨 */

  useEffect( () => {
    console.log("OnUpdate [ex]");
  }, [ex]) /* 바뀔 일이 없으므로 실행 안됨 */

  return ( /******* Rendering ********/
    <div className="App">
      {console.log("Rendering")}
      <h1>{count}</h1>
      <button onClick={handleClick}> Increasement </button>
      <button onClick={() => setShowTimer( (prev) => !prev )}> ShowTimer </button>

      {/****** Timer Component가 UI로 나타날때만 실행됨 ***********/}
      {showTimer && <Timer />} 
    </div>
  ); /******* Rendering ********/
}

export default App;
