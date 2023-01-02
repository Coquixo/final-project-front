import React, { useState } from "react";
import Login from "../../components/Auth/LogIn/LogIn";
import Register from "../../components/Auth/Register/Register";
import "./Home.scss";

const Home = () => {
    const [loginForm, setloginForm] = useState(true);
    const [message, setMessage] = useState({
        login: "Create a new account",
        register: "Log an existing account",
    });

    return (
        <div className="homeViewBox">
            <div className="homeTitle">MJÖLNIR CAPITAL</div>
            <div className="homeMainBox">
                <div className="homeFormBox">
                    {loginForm ? <Login /> : <Register />}
                </div>
                <div className="optionDesign" onClick={() => setloginForm(!loginForm)}>
                    {!loginForm ? message.register : message.login}
                </div>
            </div>
            {loginForm}
        </div>
    );
};

export default Home;
