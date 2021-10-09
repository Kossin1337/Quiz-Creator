import React, { useState } from "react";
import firebase from "../../utils/firebase";

export const AddQuiz = () => {

  const [quizUrl, setQuizUrl] = useState("");
  const [newQuiz, setNewQuiz] = useState({
    quizName: "",
    numberOfQues: "",
    quizQues: []
  });

  async function addData(e) {
    e.preventDefault();
    const ref = firebase.firestore().collection('quiz').doc(quizUrl);
    const res = await ref.set(newQuiz);

    console.log(res)
  }

  return (
    <div className="add-quiz">
      <form onSubmit={(e) => addData(e)} >
        <label>Quiz Name</label>
        <input type="text" value={newQuiz.quizName} onChange={(e) => setNewQuiz({...newQuiz, quizName: e.target.value})} />
        <label>Quiz URL</label>
        <input type="text" value={quizUrl} onChange={(e) => setQuizUrl( e.target.value )} />
        <label>Number of Questions</label>
        <input type="number" value={newQuiz.numberOfQues} onChange={(e) => setNewQuiz({...newQuiz, numberOfQues: e.target.value})} />

        <label>Question 1</label>
        <label>Question Heading</label>

        <button type="submit">Submit</button>

      </form>
    </div>
  );
};
