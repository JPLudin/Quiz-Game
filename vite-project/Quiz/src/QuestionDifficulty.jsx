import React from 'react'
import './QuestionAmount.css'

export default function QuestionDifficulty({questionDifficulty, handleDifficultyChange}) {

    return (
        <div>
            <h4>Select Your Difficulty:</h4>
            <ul className="quiz-options-container"> 
                <li className={`single-answer ${questionDifficulty === 'easy' ? 'active' : ''}`}>
                    <label>
                        <input
                            
                            type="radio"
                            name="questionDifficulty"
                            value="easy"
                            onChange={handleDifficultyChange}
                            checked={questionDifficulty === 'easy'}
                        />
                        Easy
                    </label>
                </li>
                <li className={`single-answer ${questionDifficulty === 'medium' ? 'active' : ''}`}>
                    <label>
                        <input
                            type="radio"
                            name="questionDifficulty"
                            value="medium"
                            onChange={handleDifficultyChange}
                            checked={questionDifficulty === 'medium'}
                        />
                        Medium
                    </label>
                </li>
                <li className={`single-answer ${questionDifficulty === 'hard' ? 'active' : ''}`}>
                    <label>
                        <input
                            type="radio"
                            name="questionDifficulty"
                            value="hard"
                            onChange={handleDifficultyChange}
                            checked={questionDifficulty === 'hard'}
                        />
                        Hard
                    </label>
                </li>
            </ul>
        </div>
    )
}