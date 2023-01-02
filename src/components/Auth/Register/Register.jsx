import React from "react";
import "./Register.scss";

const Register = () => {




    return (
        <div className="formBox">
            <div className="formTitle">Register!</div>
            <div className="textDesign">Name</div>
            <input type="text" className="inputFormDesign" />
            <div className="textDesign">Age</div>
            <input type="number" className="inputFormDesign" placeholder=">18" />
            <div className="textDesign">Email</div>
            <input type="email" className="inputFormDesign" placeholder="example@gmail.com" />
            <div className="textDesign">Password</div>
            <input type="password" className="inputFormDesign" />
            <div className="submitButton">Submit</div>
            <div className="errorHandlerDesign">Aqui van los errores</div>
        </div>
    );
};

export default Register;
