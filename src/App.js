import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false}
]

function App() {
  const [cards,setCards]=useState([...cardImages,...cardImages]);
  const [turns,setTurns]=useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disable, setDisable] = useState(false);

  const shuffleCards=()=>{
    const shuffledCards=[...cardImages,...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card,id: Math.random()}))

    setCards(shuffledCards);
    setTurns(0);
  }
  const handleChoice=(card)=>{
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  //compare two selected cards
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      setDisable(true);
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards=>{
          return prevCards.map(card=>{
            if(card.src===choiceOne.src){
              return {...card, matched: true}
            }else{
              return card;
            }
          })
        })
        resetTurns();
      }else{
      setTimeout(()=>resetTurns(), 1000);
      }
    }
  },[choiceOne,choiceTwo])

  console.log(cards);

  const resetTurns=()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns=>prevTurns+1);
    setDisable(false);
  }
  return (
    <div className="App">
      <div>
      <h2>Magic Match</h2>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns: {turns}</p>
      </div>
      <div className="card-grid">
        {cards.map((card)=>(
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}
          flipped={card===choiceOne || card===choiceTwo || card.matched}
          disable={disable}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
