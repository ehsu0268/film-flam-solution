import { useEffect, useRef, useState } from "react";
import { Questions } from "../models/Questions"

const SimpleInput = (props) => {
  const [enteredAnswer, setEnteredAnswer] = useState('');
  const [enteredAnswerTouched, setEnteredAnswerTouched] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(Questions[0]);
  const [showFollowUp, setShowFollowUp] = useState(true);

  var [questionCount, setQuestionCount] = useState(0);

  const enteredAnswerIsValid = enteredAnswer.trim() !== '';
  const answerInputIsInvalid = !enteredAnswerIsValid && enteredAnswerTouched;

  useEffect(() => {
    setCurrentQuestion(Questions[0]);
  }, []);

  const answerInputChangeHandler = event => {
    setEnteredAnswer(event.target.value);
  };

  const answerInputBlurHandler = event => {
    setEnteredAnswerTouched(true);
  };
  
  const formSubmissionHandler = event => {
    event.preventDefault();

    setEnteredAnswerTouched(true);

    if (enteredAnswerIsValid) {
      //setEnteredNameIsValid(false);
      return;
    }

    console.log(enteredAnswer);
    setEnteredAnswer('');
  };

  const answerInputClasses = answerInputIsInvalid
    ? 'form-control invalid' 
    : 'form-control';


  const submitResponse = (event) => {
    console.log("Submitting response");
    console.log(currentQuestion);
    if (enteredAnswer == "odd" || enteredAnswer == "even") {
      setShowFollowUp(false);
      console.log("Setting question count");
      questionCount = questionCount + 1;
      setQuestionCount(questionCount);
    }
    if (currentQuestion.answer == enteredAnswer) {
      console.log("Correct answer provided");
      // show follow up question
      console.log(showFollowUp);
      if (showFollowUp) {
        setCurrentQuestion(
          { "questionText": "Is " + (currentQuestion.answer + 1).toString() + " odd or even?",
            "answer": (currentQuestion.answer + 1) % 2 == 0 ? 'even' : 'odd'
          })
        setShowFollowUp(false);
      } else {
        if (questionCount == Questions.length - 1) {
          alert('You have completed the exercise!');
          return;
        }
        setCurrentQuestion(Questions[questionCount]);
        setShowFollowUp(true);
      }
    } else {
      alert('Wrong answer provided. Please try again.');
    }
  }

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={answerInputClasses}>
        <label htmlFor='question'>{currentQuestion.questionText}</label>
        <input  
          type='text' 
          id='answer' 
          onChange={answerInputChangeHandler}
          onBlur={answerInputBlurHandler}
          value={enteredAnswer}/>
          {answerInputIsInvalid && (
            <p className="error-text">Answer must not be empty.</p>)
          }
      </div>
      <div className="form-actions">
        <button onClick={submitResponse}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
