import React from "react";
import "./LandingPage.scss";
import heroGif from "./hero.gif";

export const LandingPage = () => {
  return (
    <div className="langing-page-wrapper">
      <div className="landing-page">
        <img src={heroGif} alt="Landing page gif" />
        <div className="text-container">
          <h2 className="main-text">Create your own Quizzez</h2>
          <h3 className="sub-text">
            Effective way to learn and compete with your friends
          </h3>
        </div>
      </div>
    </div>
  );
};
