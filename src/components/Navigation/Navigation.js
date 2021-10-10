import React from "react";
import firebase from "../../utils/firebase";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../App";

import "./Navigation.scss";

export const Navigation = () => {
  let { user } = useContext(UserContext);
  const history = useHistory();

  return (
    <div className="navigation-wrapper">
      <div className="navigation">
        <Link to="/">
          <h2 className="logo">QuizZotopia</h2>
        </Link>
        {!user && (
          <button
            className="nav-btn log-in-btn"
            onClick={() => history.push("/login")}
          >
            Login
          </button>
        )}
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/add">Quiz Creator</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/quiz">Explore Quizzes</NavLink>
          </li>
        </ul>
        {user && (
          <>
            <div className="user-info">
              {/* {user.photoURL && (<img src={user.photoURL} alt={user.displayName} style={{ borderRadius: "50%" }} />)} */}
              {/* {user.email && <h3>{user.email}</h3>} */}
              {user.displayName && (
                <p className="user-name">
                  <i className="fas fa-user"></i>
                  {user.displayName}
                </p>
              )}
              <button
                className="nav-btn log-out-btn"
                onClick={() => firebase.auth().signOut()}
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
