import React from "react";
import firebase from "../../utils/firebase";
import { useHistory } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../App";

import "./Navigation.scss";

export const Navigation = () => {
  let { user } = useContext(UserContext);
  const history = useHistory();

  console.log(user);

  return (
    <div className="navigation-wrapper">
      <div className="navigation">
        <h2 className="logo">QuizZotopia</h2>
        {!user && (
          <button
            className="nav-btn log-in-btn"
            onClick={() => history.push("/login")}
          >
            Log In
          </button>
        )}
        {user && (
          <>
            <div className="user-info">
              {/* {user.photoURL && (<img src={user.photoURL} alt={user.displayName} style={{ borderRadius: "50%" }} />)} */}
              {/* {user.email && <h3>{user.email}</h3>} */}
              {user.displayName && (
                <p className="user-name">{user.displayName}</p>
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
