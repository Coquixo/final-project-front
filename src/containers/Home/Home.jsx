import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import Login from "../../components/Auth/LogIn/LogIn";
import Register from "../../components/Auth/Register/Register";
import "./Home.scss";

const Home = () => {
    const navigate = useNavigate()
    const [loginForm, setloginForm] = useState(true);
    const [message, setMessage] = useState({
        login: "Create a new account",
        register: "Log an existing account",
    });

    return (
        <div className="bg-dark vh-100">
            <Container fluid>
                <Row className="homeTitle bg-dark text-center">
                    <div onClick={() => { navigate("/welcome") }}>MJÖLNIR CAPITAL</div>
                </Row>
            </Container>
            <div className="centeredDiv ">
                <Container>
                    <Row className="homeMainBox">
                        <Col className="bg-dark "></Col>
                        <Col className="bg-light border border-2 rounded border-danger" sm={12} xl={6}>
                            {loginForm ? <Login /> : <Register />}
                        </Col>
                        <Col className="bg-dark"></Col>
                    </Row>
                    <Row className="bg-dark">
                        <Col>
                            <Button
                                className="optionDesign my-2"
                                onClick={() => setloginForm(!loginForm)}>
                                {!loginForm ? message.register : message.login}
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Home;
