import React, { useState } from "react";

import "./AddQuiz.scss";

export const Question = ({question="", options=[], correctAns=""}) => {

  const [ques, setQues] = useState({
    ques: question,
    options: options, 
    correctAns: correctAns
  });

  return (
    <div className="question">
      <label>Question</label>
      <input type="text" placeholder="Question" value={ques.ques} onChange={(e) => setQues({...ques, ques: e.target.value})}  />
      <div className="options">
        <ul  >
          <li><input type="text" placeholder={`Option ${"1"}`}/></li>
          <li><input type="text" placeholder={`Option ${"2"}`}/></li>
          <button type="button">Add Option</button>
        </ul>
      </div>
    </div>
  )

}