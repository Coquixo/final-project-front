import React, { useState } from "react";
import Login from "../../components/LogIn/LogIn";
import Register from "../../components/Register/Register";

const Home = () => {
    const [loginForm, setloginForm] = useState(true);
    const [message, setMessage] = useState({
        login: "Create a new account",
        register: "Log in an existing account"
    })


    return (
        <div className="homeViewBox">
            {loginForm ? <Login /> : <Register />}
            <div className="homeMainBox"></div>
            <div className="optionDesign" onClick={() => setloginForm(!loginForm)}>
                {!loginForm ? message.register : message.login}
            </div>
            {loginForm}
        </div>
    );
};

export default Home;
