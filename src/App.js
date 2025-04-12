import { useEffect } from "react";
import CounterBox from "./component/CounterBox";
import counterStore from "./store/counterStore";

function App() {
  const { target, initTarget, score } = counterStore();

  useEffect(() => {
    initTarget();
  }, []);

  return (<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    <h1>Simple Count Setting Game</h1>
    <p>All you have to set the count to the target by using buttons</p>
    <h1>Target : {target}</h1>
    <h1>Score : {score}</h1>
    <CounterBox />
  </div>);
}

export default App;
