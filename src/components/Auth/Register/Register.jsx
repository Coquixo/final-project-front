import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../../../services/apiCalls";
import { errorCheck } from "../../../services/errorManage";
import EyeIcon from "../../icons/EyeIcon";
import EyeSlashIcon from "../../icons/EyeSlashIcon";
const Register = () => {
    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
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

    const registerTry = async () => {
        let res = await registerApi(user);
        //Falta implementar el token.

        if (res.message === "User created successfully") {
            setTimeout(() => {
                navigate("/welcome");
            }, 500);
        }
    };

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
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
                        <Form.Group className="m-2">
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
                                placeholder="example@gmail.com"
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
                                min="0"
                                max="150"
                                onChange={inputHandler}
                                onInput={(e) =>
                                    errorHandler(e.target.name, e.target.value, "age")
                                }
                            />
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type={passwordShown ? "text" : "password"}
                                name="password"
                                onChange={inputHandler}
                                onInput={(e) =>
                                    errorHandler(e.target.name, e.target.value, "password")
                                }
                            />
                            {passwordShown ? (
                                <EyeSlashIcon onClick={togglePassword} />
                            ) : (
                                <EyeIcon onClick={togglePassword} />
                            )}
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
