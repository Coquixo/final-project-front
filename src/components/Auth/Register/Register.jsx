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
    ageError: "",
    passwordError: "",
  });

  const [message, setMessage] = useState({
    true: "",
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
    setUserError({
      ...userError,
      [field + "Error"]: error,
    });
  };

  const registerTry = async () => {
    if (
      userError.nameError !== "" ||
      userError.emailError !== "" ||
      userError.ageError !== "" ||
      userError.passwordError !== ""
    ) {
      return;
    }

    try {
      await registerApi(user).then((res) =>
        setMessage({ ...message, ["true"]: res.message })
      );

      setTimeout(() => {
        navigate("/welcome");
      }, 2000);
    } catch (error) {
      setUserError({ ...userError, ["emailError"]: error.response.data.error });
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
                <span>{message.true}</span>
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
