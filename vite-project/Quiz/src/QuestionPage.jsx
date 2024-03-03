import React from "react"
import './QuestionPage.css'

export default function QuestionPage({ questionAmount, questionDifficulty }) {
  const [questions, setQuestions] = React.useState([])
  const [selectedAnswers, setSelectedAnswers] = React.useState({})
  const [results, setResults] = React.useState(null)
  const [errorMessage, setErrorMessage] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(true)
  
  function decodeEntities(encodedString) {
    const textarea = document.createElement('textarea')
    textarea.innerHTML = encodedString
    return textarea.value
  }

  const fetchQuestions = async () => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=${questionAmount}&type=multiple&difficulty=${questionDifficulty}`)
    const data = await response.json()

    const shuffledQuestions = data.results.map((question, questionIndex) => {
        const allAnswers = [...question.incorrect_answers, question.correct_answer]
        const shuffledAnswers = shuffleAnswers(allAnswers)
        return {
            ...question,
            id: `question-${questionIndex}`,
            correct_answer_id: `question-${questionIndex}-answer-${shuffledAnswers.indexOf(question.correct_answer)}`,
            answers: shuffledAnswers.map((answer, answerIndex) => ({
            text: answer,
            id: `question-${questionIndex}-answer-${answerIndex}`,
            })),
        }
    })

  setQuestions(shuffledQuestions)
  setIsLoading(false)
    } catch (error) {
      console.error('Error fetching questions:', error)
    }
  }

  React.useEffect(() => {
    
    setIsLoading(true)
    fetchQuestions()
  }, [questionAmount, questionDifficulty])

  function shuffleAnswers(allAnswers) {
    return [...allAnswers].sort(() => Math.random() - 0.5)
  }

  function handleAnswerSelection(questionId, selectedAnswerId) {
    setSelectedAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: selectedAnswerId }))
  }
  
   function checkAnswers() {
    const results = questions.map(question => ({
      id: question.id,
      correct: selectedAnswers[question.id] === question.correct_answer_id
    }))
    setResults(results)
  }
  
  function handleCheckAnswerClick() {
      if (questions.every(question => selectedAnswers.hasOwnProperty(question.id))) {
      setErrorMessage("")
      checkAnswers()
    } else {
      setErrorMessage("Please answer all questions before you can continue!")
    }
  }
    
  const isCorrect = (questionId, answerId) => {
    if (!results) return false
    const result = results.find(result => result.id === questionId)
    return result && result.correct && selectedAnswers[questionId] === answerId
  }

  const isIncorrect = (questionId, answerId) => {
    if (!results) return false
    const result = results.find(result => result.id === questionId)
    return result && !result.correct && selectedAnswers[questionId] === answerId
  }
  
  const isAnswerCorrect = (questionId, answerId) => {
    const question = questions.find(q => q.id === questionId)
    return question && answerId === question.correct_answer_id 
  }

  function handlePlayAgainClick() {
    setSelectedAnswers({})
    setResults(null)
    setErrorMessage("")
    setIsLoading(false)

    fetchQuestions()
  }

  return (
    <div className="quiz-container">
      {questions.map((question) => (
        <div key={question.id} className="question-container">
          <h3 className="question-title">{decodeEntities(question.question)}</h3>
          <ul className="answer-container">
            {question.answers.map((answer) => (
              <li key={answer.id} className={`${!results ? "single-answer" : "single-answer--no-hover"}
                ${selectedAnswers[question.id] === answer.id ? "active" : ""}
                ${results && isCorrect(question.id, answer.id) ? "correct-answer" : ""} 
                ${results && isIncorrect(question.id, answer.id) ? "incorrect-answer" : ""} 
                ${results &&  isAnswerCorrect(question.id, answer.id) ? "correct-answer" : ""}`}>
                <label>
                  <input
                    type="radio"
                    name={question.id}
                    value={answer.text}
                    onChange={!results ? () => handleAnswerSelection(question.id, answer.id) : null}
                    checked={selectedAnswers[question.id] === answer.id}
                  />
                  {decodeEntities(answer.text)}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="answer-btn-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {!isLoading && !results && <button 
            onClick={handleCheckAnswerClick} 
            className={`check-answer-btn question-btn ${results ? "hide-button" : ""}`}>
                Check answers
            </button>}
        {results ? <button 
            onClick={handlePlayAgainClick} 
            className="question-btn again-btn">
                Play again?
            </button> : ""}
        {results && (
            <p>You have {results.filter(result => result.correct).length} from {questions.length} right!</p>
        )}
      </div>
    </div>
  )
}
