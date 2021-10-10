import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import firebase from "../../utils/firebase";

import "./Quiz.scss";
export const Quiz = () => {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const ref = firebase.firestore().collection("quiz");

  function getQues() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ data: doc.data(), id: doc.id });
      });
      setQuiz(items);
      setLoading(false);
    });
  }

  useEffect(() => {
    getQues();
    // eslint-disable-next-line
  }, []);

  const handleClick = (id) => {
    history.push(`/quiz/${id}`);
  };

  if (loading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="quiz-creator-wrapper">
      <div className="quiz-creator">
        <h2>Explore the quizzes</h2>
        <div className="quiz-list">
          {quiz.map((ques, i) => (
            <div className="quiz-container">
              <div
                className="quiz-name"
                key={i}
                onClick={() => handleClick(ques.id)}
              >
                <p>{ques.data.quizName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
