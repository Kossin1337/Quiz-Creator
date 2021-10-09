import React from "react";
import firebase from '../../utils/firebase';
import { useHistory } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../App";

import "./Navigation.scss";

export const Navigation = () => {
  let { user } = useContext(UserContext);
  const history = useHistory();

  console.log(user)

  return (
    <div className="navigation-wrapper">
      <div className="navigation">
        <h2 className="logo">Quiz Creator</h2>
        {!user && <button className="log-in-btn" onClick={() => history.push("/login")}>Log In</button>}
        {user && (
          <>
            <div>
              {/* {user.photoURL && (<img src={user.photoURL} alt={user.displayName} style={{ borderRadius: "50%" }} />)} */}
              {user.email && <h3>{user.email}</h3>}
              {user.displayName && <h1>Hello, {user.displayName}</h1>}
              <button style={{ padding: "1rem 2.5rem", fontSize: "1.2rem", backgroundColor: "red", outline: "none", border: "none", borderRadius: "1rem", color: "#fff" }} onClick={() => firebase.auth().signOut()}>Logout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
