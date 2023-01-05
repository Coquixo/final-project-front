import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/apiCalls";
import { errorCheck } from "../../../services/errorManage";

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [userError, setUserError] = useState({
        emailError: "",
        passwordError: "",
    });

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

    const loginTry = () => {
        let res = login(user);
        setTimeout(() => {
            navigate("/balances");
        }, 500);

        //aqui aun falta meter redux
        // dispatch(login({ credentials: resultado.data }));
    };

    return (
        <Container className="formBox ">
            <Row>
                <Col></Col>
                <Col className="formTitle mt-3 border-1 border border-dark   ">
                    LOG IN
                </Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>
                <Col md={8}>
                    <Form>
                        <Form.Group className="m-4 ">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Example@gmail.com"
                                onChange={inputHandler}
                                onInput={(e) =>
                                    errorHandler(e.target.name, e.target.value, "text")
                                }
                            />
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                onChange={inputHandler}
                                onInput={(e) =>
                                    errorHandler(e.target.name, e.target.value, "password")
                                }
                            />
                            <Form.Text className="text-danger errorHandlerDesign ">
                                <span>{userError.emailError}</span>
                                <span>{userError.passwordError}</span>
                            </Form.Text>
                        </Form.Group>
                        <Button className="my-2 submitButton" onClick={() => loginTry()}>
                            SUBMIT
                        </Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default Login;
