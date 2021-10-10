import React from "react";
import firebase from "../../utils/firebase";
import { useContext } from "react";
import { UserContext } from "../../App";

import "./UserProfile.scss";

export const UserProfile = () => {
  let { user } = useContext(UserContext);
  return (
    <div className="user-profile">
      {user && (
        <>
          <div className="user-info">
            {user.photoURL && (<img src={user.photoURL} alt={user.displayName} style={{ borderRadius: "50%" }} />)}
            {user.email && <h3>{user.email}</h3>}
            {user.displayName && (
              <p className="user-name">
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
  );
};
