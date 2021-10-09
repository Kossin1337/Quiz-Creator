import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";

export const Quiz = () => {

  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection("quiz");

  console.log(ref)

  function getQues() {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      })
      setQuiz(items);
      setLoading(false);
    })
  }

  useEffect(() => {
    getQues();
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <h1>Loading ...</h1>
  }

  return (
    <div className="quiz-creator">
      {quiz.map((ques) => (
        <>
          <h1>Quiz Name - {ques.quizName}</h1>
          <div>
            {ques.quizQues.map((item) => (
              <div>
                <h2>{item.questionText}</h2>
                <ul>
                {item.answerOptions.map((option) => (
                  <li>{option}</li>
                ))}
                </ul>
              </div>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};
