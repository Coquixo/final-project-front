import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../../services/slices/userSlice";
import "./Welcome.scss";

const Welcome = () => {
  const navigate = useNavigate();

  const userReduxCredentials = useSelector(userData);

  const navigateToHome = () => {
    setTimeout(() => {
      if (userReduxCredentials.credentials.token === undefined) {
        navigate("/");
      }
      if (userReduxCredentials.credentials.token !== undefined) {
        navigate("/balances");
      }
    }, 500);
  };

  return (
    <div className="welcomeViewBox">
      <div className="welcomePrettierBars"> </div>
      <div className="welcomePrettierBars2"> </div>
      <div className="welcomeMainBox">
        <div className="welcomeTitle">MJÖLNIR CAPITAL</div>
        <div className="welcomeButton" onClick={navigateToHome}>
          Let's get started!
        </div>
      </div>
      <div className="welcomePrettierBars2"> </div>
      <div className="welcomePrettierBars"> </div>
    </div>
  );
};

export default Welcome;
