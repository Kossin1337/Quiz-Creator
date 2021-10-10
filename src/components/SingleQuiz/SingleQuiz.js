import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import firebase from "../../utils/firebase";
import { v4 as uuid } from 'uuid';
import { useContext } from "react";
import { UserContext } from "../../App";
import "./style.scss";

export const SingleQuiz = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  
  /* Quiz answer */
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  
  const { quizid } = useParams();
  let { user } = useContext(UserContext);

  const ref = firebase.firestore().collection("quiz").doc(quizid);

  async function getQues() {
    setLoading(true);
    const doc = await ref.get();
    setData(doc.data());
    setLoading(false);
  }

  useEffect(() => {
    getQues();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  function prevQuestion() {
    if (questionIndex !== 0) {
      setQuestionIndex((prevIndex) => prevIndex - 1);
    }
  }

  function nextQuestion() {
    if (questionIndex < data.numberOfQues) {
      setQuestionIndex((prevIndex) => prevIndex + 1);
    }
  }

  let array = [];
  function checkAnswer(e, key) {
    const answer = e.target.id;
    const correctAnswer = data.quizQues[questionIndex].isCorrect;
    if (array.length !== 0) {
      array.map((item, i) => {
        if (item.key === key) {
          return;
        } else {
          array.push(...array, { userAns: answer, correctAns: correctAnswer, key: key })
          if (answer === correctAnswer) {
            setScore(prevScore => prevScore + 1);
          }
        }
      })
    } else {
      array.push(...array, { userAns: answer, correctAns: correctAnswer, key: key })
      if (answer === correctAnswer) {
        setScore(prevScore => prevScore + 1);
      }
    }
    if (questionIndex < data.numberOfQues - 1) {
      setQuestionIndex(questionIndex + 1)
    } else {
      submitQuiz();
    }
    console.log(score)
  }

  
  async function submitQuiz() {
    const ref = firebase.firestore().collection("result").doc(uuid());
    const res = await ref.set({quizId: quizid, result: score+"/"+data.numberOfQues, user: user.email });
    setShowScore(true);
  }

  return (
    <div className="single-quiz">
      <div className="quiz-section">
        <h1 className="quiz-title">{data.quizName}</h1>
        <h2 className="question-number-indicator">
          Question {questionIndex + 1} of {data.numberOfQues}
        </h2>
        {!loading && (
          <div className="quiz-content">
            <div>
              {data.quizQues && (
                <div className="quiz-question">
                  <h2 className="quiz-question-title">
                    {data.quizQues[questionIndex].questionText}
                  </h2>
                  <ul className="question-list">
                    {data.quizQues[questionIndex].answerOptions.map(
                      (option, index) => (
                        <li
                          className="question-answer"
                          key={index}
                          id={option}
                          onClick={(e) => checkAnswer(e, questionIndex)}
                        >
                          {option}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="buttons">
          {questionIndex !== 0 && <button
            className="navigation-btn last-question"
            onClick={prevQuestion}
          >
            <i class="fas fa-angle-left"></i>
          </button>}
          {questionIndex < data.numberOfQues - 1 && <button
            className="navigation-btn next-question"
            onClick={nextQuestion}
          >
            <i class="fas fa-angle-right"></i>
          </button>}
        </div>
        {/* {questionIndex === data.numberOfQues - 1 && (
          <button className="submit-btn">Submit</button>
        )} */}

        {showScore && (
          <>
          <h1>Your Score: {score}/{data.numberOfQues}</h1>
          </>
        )}
      </div>
    </div>
  );
};
