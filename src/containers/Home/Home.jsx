import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
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
        <Container fluid >
            <Row className="homeTitle bg-dark text-center">
                <div>
                    MJÖLNIR CAPITAL
                </div>
            </Row>
            <Row className="homeMainBox " >
                <Col className="bg-dark" ></Col>
                <Col className=" bg-light" sm={6}  >{loginForm ? <Login /> : <Register />}</Col>
                <Col className="bg-dark"></Col>
            </Row>
            <Row className="bg-dark" >
                <Col >
                    <Button
                        className="optionDesign my-2"
                        onClick={() => setloginForm(!loginForm)}>
                        {!loginForm ? message.register : message.login}
                    </Button>
                </Col>
            </Row>
        </Container >
    );
};

export default Home;
