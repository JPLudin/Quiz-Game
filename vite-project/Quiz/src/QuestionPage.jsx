import React from "react";

export default function QuestionPage(props) {
    const [quizQuestions, setQuizQuestions] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=5');
        const data = await response.json();
        setQuizQuestions(data.results);
      } catch (error) {
        console.error('Error fetching quiz questions:', error);
      }
    };

    fetchQuestions();
  }, []);
  
  const singleQuestion = quizQuestions.map((question, index) => (
      <div>
        <p>{question.question}</p>
      </div>
  ))
        
    
    return (
        <div>
            {singleQuestion}
        </div>        
    )
}