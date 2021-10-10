import React, { useEffect, useState } from "react";
import firebase from "./utils/firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";

import { Navigation } from "./components/Navigation/Navigation";
import { QuizCreator } from "./components/QuizCreator/QuizCreator";
import { LandingPage } from "./components/LandingPage/LandingPage";
import Login from "./components/Login";
import { Quiz } from "./components/Quiz/Quiz";
import { AddQuiz } from "./components/AddQuiz/AddQuiz";
import { SingleQuiz } from "./components/SingleQuiz/SingleQuiz";
import AuthGaurd from "./utils/AuthGaurd";

let UserContext = React.createContext();
const App = () => {
  const [user, setUser] = useState();

  useEffect(function () {
    firebase.auth().onAuthStateChanged(function (userInfo) {
      setUser(userInfo);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <LandingPage />
            {/* <QuizCreator /> */}
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/quiz">
            <AuthGaurd>
              <Quiz />
            </AuthGaurd>
          </Route>
          <Route exact path="/quiz/:quizid">
            <AuthGaurd>
              <SingleQuiz />
            </AuthGaurd>
          </Route>
          <Route exact path="/createquiz">
            <AuthGaurd>
              <QuizCreator />
            </AuthGaurd>
          </Route>
          <Route exact path="/add">
            <AddQuiz />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export { App, UserContext };
