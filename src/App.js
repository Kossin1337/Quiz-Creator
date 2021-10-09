import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";

import { Navigation } from "./components/Navigation/Navigation";
import { QuizCreator } from "./components/QuizCreator/QuizCreator";

export const App = () => {
  return (
    <Router>
      <Navigation />
      <QuizCreator />
      <Switch>
        <Route exact path="/">
          {/* <h1>Home Page</h1> */}
        </Route>
        <Route path="/login">
          <h1>Login Page</h1>
        </Route>
        <Route exact path="/quiz">
          <h1>Quiz Page</h1>
        </Route>
      </Switch>
    </Router>
  );
};
