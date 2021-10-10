import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import firebase from "../../utils/firebase";

import "./style.scss";
export const SingleQuiz = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { quizid } = useParams()

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

  return (
    <div className="single-quiz">

      <div className="quiz-section" >
        <h1>{data.quizName}</h1>
        <div>
          {data.quizQues && data.quizQues.map((item, i) => (
            <div className="quiz-question" key={i}>
              <h2>{item.questionText}</h2>
              <ul>
                {item.answerOptions.map((option, index) => (
                  <li key={index} >{option}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button>Submit</button>
      </div>

    </div>
  );
};
