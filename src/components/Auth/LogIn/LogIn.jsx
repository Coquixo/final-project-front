import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../../services/apiCalls";
import { errorCheck } from "../../../services/errorManage";
import { useDispatch, useSelector } from "react-redux";
import { userData, login } from "../../../services/slices/userSlice";
import EyeIcon from "../../icons/EyeIcon";
import EyeSlashIcon from "../../icons/EyeSlashIcon";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userReduxCredentials = useSelector(userData);
  const [passwordShown, setPasswordShown] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const emptyUserError = {
    emailError: "",
    passwordError: "",
    loginAttempt: "",
  };

  const [userError, setUserError] = useState(emptyUserError);

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setUserError(emptyUserError);
  };

  const errorHandler = (field, value, type) => {
    let error = "";
    error = errorCheck(value, type);
    setUserError({
      ...userError,
      [field + "Error"]: error,
    });
  };

  useEffect(() => {
    if (userReduxCredentials.credentials.token !== undefined) {
      navigate("/balances");
    }
  }, []);

  const loginTry = async () => {
    if (
      userError.emailError !== "" ||
      userError.passwordError !== "" ||
      userError.loginAttempt !== ""
    ) {
      return;
    }

    try {
      let res = await loginApi(user);
      dispatch(login({ credentials: res }));
      setTimeout(() => {
        navigate("/balances");
      }, 500);
    } catch (error) {
      setUserError({ ...userError, loginAttempt: "Wrong credentials" });
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
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
                type={passwordShown ? "text" : "password"}
                name="password"
                placeholder="Enter password"
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
              <Form.Text className="text-danger errorHandlerDesign ">
                <span>{userError.emailError}</span>
                <span>{userError.passwordError}</span>
                <span>{userError.loginAttempt}</span>
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
