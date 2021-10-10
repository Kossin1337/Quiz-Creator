import React from "react";

export const SingleQuizQuestion = ({ questionIndex, quizData }) => {
  console.log("Quiz Data:");
  console.log(quizData);
  console.log(`Question index: ${questionIndex}`);

  return (
    <div className="quiz-content">
      <h3>yoyoyo</h3>
      <h2>{quizData[questionIndex].questionText}</h2>
      <ul className="answers">
        {quizData[questionIndex].answerOptions.map((option, index) => (
          <li className="answer" key={index}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
