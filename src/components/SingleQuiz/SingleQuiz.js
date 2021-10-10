import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import firebase from "../../utils/firebase";

import { SingleQuizQuestion } from "./SingleQuizQuestion";

import "./style.scss";

export const SingleQuiz = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const { quizid } = useParams();

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

  console.log(data);

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

  return (
    <div className="single-quiz">
      <div className="quiz-section">
        <h1 className="quiz-title">{data.quizName}</h1>
        <h2 className="question-number-indicator">
          Question {questionIndex + 1} of {data.numberOfQues}
        </h2>
        {data && (
          <SingleQuizQuestion
            questionIndex={questionIndex}
            questionData={data.quizQues}
          />
        )}
        {questionIndex === data.numberOfQues - 1 ? (
          <button className="submit-btn">Submit</button>
        ) : (
          <div className="buttons">
            <button
              className="navigation-btn last-question"
              onClick={prevQuestion}
            >
              <i class="fas fa-angle-left"></i>
            </button>
            <button
              className="navigation-btn next-question"
              onClick={nextQuestion}
            >
              <i class="fas fa-angle-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* {data.quizQues &&
            data.quizQues.map((item, i) => (
              <div className="quiz-question" key={i}>
                <h2>{item.questionText}</h2>
                <ul>
                  {item.answerOptions.map((option, index) => (
                    <li key={index}>{option}</li>
                  ))}
                </ul>
              </div>
            ))} */
