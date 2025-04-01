import { useState } from 'react';
import Box from './component/Box';
import './App.css';

const choice = {
  rock: {
    name: 'Rock',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZAeo8z-We3-Niz7gkUKj6EKsjV6Gaie3wVQ&s',
  },
  paper: {
    name: 'Paper',
    image: 'https://static.vecteezy.com/system/resources/previews/003/500/418/large_2x/female-hands-is-holding-the-blank-a4-paper-on-black-background-free-photo.jpg',
  },
  scissors: {
    name: 'Scissors',
    image: 'https://cphgrooming.com/cdn/shop/products/Group5117.png',
  },
};

const choiceIndice = Object.keys(choice);
const winTable = [
  ['Draw', 'Lose', 'Win'],
  ['Win', 'Draw', 'Lose'],
  ['Lose', 'Win', 'Draw'],
]

function App() {

  const [my, setMy] = useState(null);
  const [myStatus, setMyStatus] = useState(null);
  const [computer, setComputer] = useState(null);
  const [computerStatus, setComputerStatus] = useState(null);

  const update = (myIndex) => {
    setMy(choice[choiceIndice[myIndex]]);

    let computerIndex = Math.floor(Math.random() * choiceIndice.length);
    computerIndex = computerIndex == 3 ? 0 : computerIndex;
    setComputer(choice[choiceIndice[computerIndex]])

    setMyStatus(winTable[myIndex][computerIndex])
    setComputerStatus(winTable[computerIndex][myIndex])
  }

  return (
    <div>
      <div className="main">
        <Box title="You" item={my} status={myStatus}/>
        <Box title='Computer' item={computer} status={computerStatus}/>
      </div>
      <div className="button-container">
        <button onClick={() => update(2)} style={{ width: '100px', height: '100px',  fontSize: '16px' }}>
           <img src={choice.scissors.image} alt="Button" style={{maxWidth: '100%', maxHeight: '100%'}}></img>
           </button>
        <button onClick={() => update(0)} style={{ width: '100px', height: '100px',  fontSize: '16px' }}>
           <img src={choice.rock.image} alt="Button" style={{maxWidth: '100%', maxHeight: '100%'}}></img>
           </button>
        <button onClick={() => update(1)} style={{ width: '100px', height: '100px',  fontSize: '16px' }}>
           <img src={choice.paper.image} alt="Button" style={{maxWidth: '100%', maxHeight: '100%'}}></img>
           </button>
      </div>
    </div>
  );
}

export default App;
