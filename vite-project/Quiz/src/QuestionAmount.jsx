import React from 'react'
import './QuestionAmount.css'

export default function QuestionAmount({questionAmount, handleNumberOfQuestionsChange}) {

    return (
        <div>
            <h4>Choose the Number of Questions:</h4>
            <ul className="quiz-options-container"> 
                <li className={`single-answer ${questionAmount === 5 ? 'active' : ''}`}>
                    <label>
                        <input
                            
                            type="radio"
                            name="questionAmount"
                            value="5"
                            onChange={handleNumberOfQuestionsChange}
                            checked={questionAmount === 5}
                        />
                        5 Questions
                    </label>
                </li>
                <li className={`single-answer ${questionAmount === 10 ? 'active' : ''}`}>
                    <label>
                        <input
                            type="radio"
                            name="questionAmount"
                            value="10"
                            onChange={handleNumberOfQuestionsChange}
                            checked={questionAmount === 10}
                        />
                        10 Questions
                    </label>
                </li>
            </ul>
        </div>
        
    )
}