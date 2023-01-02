import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.scss"

const Welcome = () => {
    const navigate = useNavigate();

    const navigateToHome = () => {
        setTimeout(() => {
            navigate("/");
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
