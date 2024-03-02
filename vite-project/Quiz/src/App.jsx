import React from 'react'
import StartPage from './StartPage'
import QuestionPage from './QuestionPage'

export default function App() {
  const [gameStarted, setGameStarted] = React.useState(false)


  function startGame() {

    setGameStarted(true)
  }
  return (
    <main>
      {gameStarted ?
        <QuestionPage questionAmount={amountToFetch}/> 
        : <StartPage handleClick={startGame}/>
      }
    </main>
   
  )
}
