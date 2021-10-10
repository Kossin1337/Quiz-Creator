import React, { Fragment, useState } from "react";
import firebase from "../../utils/firebase";
import { Question } from "./Question";
import { v4 as uuid } from 'uuid';

import "./AddQuiz.scss";

export const AddQuiz = () => {
  const [quizUrl, setQuizUrl] = useState("");
  const [questions, setQuestions] = useState([
    { id: uuid(), ques: '', options: ["", ""], correctAns: "" },
    { id: uuid(), ques: '', options: [], correctAns: "" },
  ]);

  const [newQuiz, setNewQuiz] = useState({
    name: "",
    questions: questions,
  });


  console.log(questions)


  const handleAddQuestion = () => {
    let noOfQues = questions.length + 1;
    setQuestions([...questions, { noOfQues: { id: uuid(), ques: '', options: [], correctAns: "" } }])
  }

  async function addData(e) {
    e.preventDefault();
    // const ref = firebase.firestore().collection("quiz").doc(quizUrl);
    // const res = await ref.set(newQuiz);

    console.log(newQuiz)

  }

  const handleAddOptions = (i) => {
    
    questions[i].options.push("");
    console.log(i)
    
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

        {questions.map((ques, i) => (
          <div className="question">
            <h3 className="question-number-indicator">
              Question {i + 1}
            </h3>
            <label>Question</label>
            <input type="text" placeholder="Question" value={ques[i].ques} onChange={(e) => setQuestions(...questions)} />
            <div className="options">
              <ul>
                {ques[i].options.length > 0 && ques[i].options.map((quesOptions, i) => (
                <li key={i}>
                  {/* <input type="text" placeholder={`Option ${i + 1}`} onChange={e => handleChangeInput(quesOptions.id, e)} /> */}
                  <input type="text" placeholder={`Option ${i + 1}`} />
                </li>
              ))}
                <button type="button" onClick={() => handleAddOptions(i)}>Add Option</button>
              </ul>
            </div>
          </div>
        ))}


        <div className="form-buttons">
          <button className="quiz-btn add-question-btn" type="button" onClick={handleAddQuestion}>
            New question <i className="fas fa-plus-square"></i>
          </button>
          <button className="quiz-btn create-quiz-btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
