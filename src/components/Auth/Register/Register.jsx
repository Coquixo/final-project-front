import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { register } from "../../../services/apiCalls";
import { errorCheck } from "../../../services/errorManage";
import Login from "../LogIn/LogIn";

const Register = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        name: "",
        age: "",
        password: "",
    });

    const [userError, setUserError] = useState({
        nameError: "",
        emailError: "",
        ageError: undefined,
        passwordError: "",
    });

    const [registered, setRegistered] = useState(false);

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const errorHandler = (field, value, type) => {
        let error = "";
        error = errorCheck(value, type);
        setUserError((prevState) => ({
            ...prevState,
            [field + "Error"]: error,
        }));
    };

    const registerTry = () => {
        setRegistered(true);
        setTimeout(() => {
            navigate("/welcome");
        }, 500);
    };

    return (
        <Container className="formBox">
            <Row>
                <Col></Col>
                <Col className="formTitle mt-3 border-1 border border-dark">
                    REGISTER
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>

                <Col md={8}>
                    <Form>
                        <Form.Group className="m-4">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                onChange={inputHandler}
                                onInput={(e) =>
                                    errorHandler(e.target.name, e.target.value, "text")
                                }
                            />
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Example@gmail..com"
                                name="email"
                                onChange={inputHandler}
                                onInput={(e) =>
                                    errorHandler(e.target.name, e.target.value, "email")
                                }
                            />
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder=">18"
                                name="age"
                                onChange={inputHandler}
                                onInput={(e) =>
                                    errorHandler(e.target.name, e.target.value, "age")
                                }
                            />
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={inputHandler}
                                onInput={(e) =>
                                    errorHandler(e.target.name, e.target.value, "password")
                                }
                            />
                            <Form.Text className="text-danger errorHanlderDesign d-flex flex-column">
                                <span>{userError.nameError}</span>
                                <span>{userError.emailError}</span>
                                <span>{userError.passwordError}</span>
                                <span>{userError.ageError}</span>
                            </Form.Text>
                        </Form.Group>
                        <Button className="my-2 submitButton" onClick={() => registerTry()}>
                            SUBMIT
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default Register;
