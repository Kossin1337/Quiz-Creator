import React, { useState } from "react";
import firebase from "../../utils/firebase";

import "./AddQuiz.scss";
import { Question } from "./Question";

export const AddQuiz = () => {
  const [quizUrl, setQuizUrl] = useState("");
  const [questions, setQuestions] = useState([]);
  const [newQuiz, setNewQuiz] = useState({
    name: "",
    customURL: "",
    questions: [],
  });

  // quizQues: [
  //   { questionText: "",
  //     answerOptions: ["option 1", "Option 2", "Option 3", "Option 4"]
  //   }
  // ]

  async function addData(e) {
    e.preventDefault();
    const ref = firebase.firestore().collection("quiz").doc(quizUrl);
    const res = await ref.set(newQuiz);

    // console.log(res);
  }

  return (
    <div className="add-quiz-wrapper">
      <h2>Create your own quiz</h2>
      <form className="add-quiz-form" onSubmit={(e) => addData(e)}>
        <label>Quiz Name</label>
        <input
          type="text"
          value={newQuiz.quizName}
          onChange={(e) => setNewQuiz({ ...newQuiz, quizName: e.target.value })}
        />
        <label>Custrom Quiz URL</label>
        <input
          type="text"
          value={quizUrl}
          onChange={(e) => setQuizUrl(e.target.value)}
          placeholder="quizzotopia/quiz/url"
        />

        <h3 className="question-number-indicator">
          Question {questions.length + 1}
        </h3>

        <Question />

        <div className="form-buttons">
          <button className="quiz-btn add-question-btn" type="button">
            New question <i className="fas fa-plus-square"></i>
          </button>
          <button className="quiz-btn create-quiz-btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
