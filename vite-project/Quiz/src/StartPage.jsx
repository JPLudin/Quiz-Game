import React from "react"
import QuestionAmount from "./QuestionAmount"
import QuestionDifficulty from "./QuestionDifficulty"
import './StartPage.css'

export default function StartPage(props) {
    const [selectedAmount, setSelectedAmount] = React.useState(5)
    const [selectedDifficulty, setselectedDifficulty] = React.useState('easy')
    
    const handleNumberOfQuestionsChange = (event) => {
        setSelectedAmount(Number(event.target.value))
    }

    const handleDifficultyChange  = (event) => {
        setselectedDifficulty(event.target.value)
    }

    function handleClick() {
        props.handleClick(selectedAmount, selectedDifficulty)
    }
    return (
        <div className="start-container">
            <h1 className="title">Welcome to QuizMaster!</h1>
            <p className="text">Dive into the world of QuizMaster, where your knowledge will be tested, and your quick thinking rewarded! Whether you're a trivia enthusiast or just looking for a fun way to pass the time, you've come to the right place. Prepare to challenge yourself across various categories, including science, history, pop culture, and more. Are you ready to claim the title of QuizMaster? Let's get started!</p>
            <QuestionAmount 
                questionAmount={selectedAmount} 
                handleNumberOfQuestionsChange={handleNumberOfQuestionsChange} /> 
            <QuestionDifficulty 
                questionDifficulty={selectedDifficulty} 
                handleDifficultyChange={handleDifficultyChange} />          
            <a href="#" className="start-btn" onClick={handleClick}>Start quiz</a>
        </div>
    )
}