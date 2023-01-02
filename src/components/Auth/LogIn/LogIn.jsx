import React from "react";

const Login = () => {
    return (
        <div className="formBox">
            <div className="formTitle">Log In!</div>

            <div className="textDesign">Email</div>
            <input
                type="email"
                className="inputFormDesign"
                placeholder="example@gmail.com"
            />
            <div className="textDesign">Password</div>
            <input type="password" className="inputFormDesign" />
            <div className="submitButton">Submit</div>
            <div className="errorHandlerDesign">Aqui van los errores</div>
        </div>
    );
};

export default Login;
