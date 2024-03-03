import React from 'react'
import StartPage from './StartPage'
import QuestionPage from './QuestionPage'

export default function App(props) {
  const [gameStarted, setGameStarted] = React.useState(false);
  const [questionAmount, setQuestionAmount] = React.useState(5);
  const [questionDifficulty, setQuestionDifficulty] = React.useState('easy');

  function startGame(selectedAmount, selectedDifficulty) {
    setGameStarted(true)
    setQuestionAmount(selectedAmount)
    setQuestionDifficulty(selectedDifficulty)
  }
  return (
    <main>
      {gameStarted ?
        <QuestionPage questionAmount={questionAmount} questionDifficulty={questionDifficulty}/> 
        : <StartPage handleClick={startGame}/>
      }
    </main>
   
  )
}
