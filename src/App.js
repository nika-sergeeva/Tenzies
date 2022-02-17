import React from "react"
import './App.css'
import Button from "./components/Button"
import Die from './components/Die'
import Intro from "./components/Intro"
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [count, setCount] = React.useState(allNewDice()) 
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect( ()=>{
    const allHeld = count.every(die => die.isHeld)
    const firstValue = count[0].value
    const allSameValue = count.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true)
      console.log("You Won!")
    }
  }, [count])

  function rollDice() {
    if(!tenzies) {
        setCount(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
    } else {
        setTenzies(false)
        setCount(allNewDice())
    }
}

  function holdDice(id) {
    setCount(oldDice => oldDice.map(die => {
        return die.id === id ? 
            {...die, isHeld: !die.isHeld} :
            die
    }))
}
   
  const dieElements = count.map(die =>(
     <Die key={die.id} 
     value={die.value} 
     isHeld={die.isHeld} 
     holdDice={() => holdDice(die.id)}
 />
  ))
   
   function allNewDice() {
       const newDice = []
       for (let i = 0; i < 10; i++) {
           newDice.push(generateNewDie())
       }
       return newDice
   }

   

function generateNewDie() {
  return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
  }
}

  return (
    <div className="App">

     <main>
       {tenzies && <Confetti />}
       <Intro />
     <div className="dice-container">
              {dieElements}
            </div>
            <Button roll={rollDice} tenzies={tenzies}/>
      </main>
        
    </div>
  );
}

export default App;
