import React from "react";
import firebase from "../../utils/firebase";
import { v4 as uuid } from 'uuid';
export class Questions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quizUrl: "",
      questions: [
        { 0: { id: uuid(), ques: '', options: ["", ""], correctAns: "" } },
      ],
      newQuiz: {
        name: "",
      }
    }
  }


  componentDidMount() {

  }
  handleAddQuestion = () => {
    let noOfQues = this.state.questions.length + 1;
    // this.state.questions = [...this.state.questions, { noOfQues: { id: uuid(), ques: '', options: [], correctAns: "" } }];
    this.setState((prev) => ({ ...prev.questions[noOfQues], questions: { noOfQues: { id: uuid(), ques: '', options: [], correctAns: "" } } }))
  }

  async addData(e) {
    e.preventDefault();
    // const ref = firebase.firestore().collection("quiz").doc(quizUrl);
    // const res = await ref.set(newQuiz);

    console.log(this.state.newQuiz)

  }

  handleAddOptions = (i) => {

    // questions[i].options.push("");
    // setQuestions([...questions, [questions[i][i].options: [""]]])

    // console.log(questions[i][i].options.push(""))

  }

  render() {
    return (
      <>
        <div className="add-quiz-wrapper">
          <h2>Create your own quiz</h2>
          <form className="add-quiz-form" onSubmit={(e) => this.addData(e)}>
            <label>Quiz Name</label>
            <input
              type="text"
              value={this.state.newQuiz.name}
              onChange={(e) => this.setState((prevState) => ({ ...prevState, newQuiz: { ...prevState.newQuiz, name: e.target.value } }))}
            />
            <label>Custrom Quiz URL</label>
            <input
              type="text"
              value={this.state.quizUrl}
              onChange={(e) => this.setState((prevState) => ({ ...prevState, quizUrl: e.target.value }))}
              placeholder="quizzotopia/quiz/url"
            />

            {this.state.questions.map((ques, i) => (
              <div className="question">
                <h3 className="question-number-indicator">
                  Question {i + 1}
                </h3>
                <label>Question</label>
                <input type="text" placeholder="Question" value={ques[i].ques} />
                <div className="options">
                  <ul>
                    {ques[i].options.length > 0 && ques[i].options.map((quesOptions, i) => (
                      <li key={i}>
                        {/* <input type="text" placeholder={`Option ${i + 1}`} onChange={e => handleChangeInput(quesOptions.id, e)} /> */}
                        <input type="text" placeholder={`Option ${i + 1}`} />
                      </li>
                    ))}
                    <button type="button" onClick={() => this.handleAddOptions(i)}>Add Option</button>
                  </ul>
                </div>
              </div>
            ))}


            <div className="form-buttons">
              <button className="quiz-btn add-question-btn" type="button" onClick={this.handleAddQuestion}>
                New question <i className="fas fa-plus-square"></i>
              </button>
              <button className="quiz-btn create-quiz-btn" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </>
    )
  }
}