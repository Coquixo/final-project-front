import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { updateProfile } from "../../services/apiCalls";
import { errorCheck } from "../../services/errorManage";
import { userData, userout } from "../../services/slices/userSlice";
import EyeIcon from "../icons/EyeIcon";
import EyeSlashIcon from "../icons/EyeSlashIcon";

const UpdateMyProfile = () => {
    const userReduxCredentials = useSelector(userData);
    const [passwordShown, setPasswordShown] = useState(false);
    const [usersEmail, setUsersEmail] = useState(
        userReduxCredentials.credentials.email
    );
    const token = userReduxCredentials.credentials.token;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [user, setUser] = useState({
        name: userReduxCredentials.credentials.name,
        surname: userReduxCredentials.credentials.surname,
        phone: userReduxCredentials.credentials.phone,
        age: userReduxCredentials.credentials.age,
        country: userReduxCredentials.credentials.country,
        city: userReduxCredentials.credentials.city,
        address: userReduxCredentials.credentials.address,
        password: undefined,
    });

    const [userError, setUserError] = useState({
        nameError: "",
        surnameError: "",
        ageError: "",
        phoneError: "",
        coutryError: "",
        cityError: "",
        addressError: "",
    });

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const emailHandler = (e) => {
        setUsersEmail(e.target.value);
    };

    const errorHandler = (field, value, type) => {
        let error = "";
        error = errorCheck(value, type);
        setUserError((prevState) => ({
            ...prevState,
            [field + "Error"]: error,
        }));
    };
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    const updateTry = async () => {
        let res = await updateProfile(usersEmail, user, token);
        console.log(res)
        setTimeout(() => {
            if (userReduxCredentials.credentials.token !== undefined) {
                dispatch(userout({ credentials: {} })).then(navigate("/"));
            }
        }, 500);
    };
    return (
        <Container>
            <Row>
                <Col className="formTitle mt-3 border-1 border border-dark">
                    REGISTER
                </Col>
            </Row>
            <Col>
                <Form>
                    <Form.Group className="m-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            onChange={inputHandler}
                            value={user.name}
                            onInput={(e) =>
                                errorHandler(e.target.name, e.target.value, "text")
                            }
                        />
                        <Form.Label>Surame</Form.Label>
                        <Form.Control
                            name="surname"
                            onChange={inputHandler}
                            value={user.surname}
                            onInput={(e) =>
                                errorHandler(e.target.name, e.target.value, "text")
                            }
                        />

                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder=">18"
                            name="age"
                            min="0"
                            max="150"
                            value={user.age}
                            onChange={inputHandler}
                            onInput={(e) =>
                                errorHandler(e.target.name, e.target.value, "age")
                            }
                        />

                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            name="country"
                            onChange={inputHandler}
                            value={user.country}
                            onInput={(e) =>
                                errorHandler(e.target.name, e.target.value, "text")
                            }
                        />
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            name="city"
                            onChange={inputHandler}
                            value={user.city}
                            onInput={(e) =>
                                errorHandler(e.target.name, e.target.value, "text")
                            }
                        />
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            name="address"
                            onChange={inputHandler}
                            value={user.address}
                            onInput={(e) =>
                                errorHandler(e.target.name, e.target.value, "text")
                            }
                        />
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={passwordShown ? "text" : "password"}
                            name="password"
                            onChange={inputHandler}
                            value={user.password}
                            onInput={(e) =>
                                errorHandler(e.target.name, e.target.value, "password")
                            }
                        />
                        {passwordShown ? (
                            <EyeSlashIcon onClick={togglePassword} />
                        ) : (
                            <EyeIcon onClick={togglePassword} />
                        )}
                    </Form.Group>
                    <Form.Label>Please, verify your email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Example@gmail.com"
                        name="email"
                        onChange={emailHandler}
                        onInput={(e) =>
                            errorHandler(e.target.name, e.target.value, "email")
                        }
                    />
                    <Button className="my-2 submitButton" onClick={() => updateTry()}>
                        SUBMIT
                    </Button>

                    <Form.Text className="text-danger errorHanlderDesign d-flex flex-column">
                        <span>{userError.nameError}</span>
                        <span>{userError.emailError}</span>
                        <span>{userError.passwordError}</span>
                        <span>{userError.ageError}</span>
                    </Form.Text>
                </Form>
            </Col>
        </Container>
    );
};

export default UpdateMyProfile;
