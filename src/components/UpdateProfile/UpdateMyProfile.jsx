import React, { useState } from "react";
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
  const [usersEmail, setUsersEmail] = useState("");
  const token = userReduxCredentials.credentials.token;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: userReduxCredentials.credentials.name,
    surname: userReduxCredentials.credentials.surname,
    phone: userReduxCredentials.credentials.phone,
    age: userReduxCredentials.credentials.age,
    country: userReduxCredentials.credentials.country,
    city: userReduxCredentials.credentials.city,
    address: userReduxCredentials.credentials.address,
    password: "",
  });

  const [userError, setUserError] = useState({
    nameError: "",
    surnameError: "",
    ageError: "",
    phoneError: "",
    countryError: "",
    cityError: "",
    addressError: "",
    passwordError: "",
    emailError: "",
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
    if (
      userError.nameError !== "" ||
      userError.surnameError !== "" ||
      userError.ageError !== "" ||
      userError.phoneError !== "" ||
      userError.countryError !== "" ||
      userError.cityError !== "" ||
      userError.addressError !== "" ||
      userError.passwordError !== "" ||
      userError.emailError !== ""
    ) {
      return;
    }

    await updateProfile(usersEmail, user, token);
    setTimeout(async () => {
      if (userReduxCredentials.credentials.token !== undefined) {
        await dispatch(userout({ credentials: {} }));
        navigate("/");
      }
    }, 500);
  };
  return (
    <Container>
      <Row>
        <Col className="formTitle mt-3 border-1 border border-light">
          UPDATE USER
        </Col>
      </Row>
      <Col>
        <Form className="text-dark">
          <Form.Group className="mt-1">
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
            <span className="text-danger errorHanlderDesign d-flex flex-column">
              {userError.nameError}
            </span>
            <Form.Label>Surname</Form.Label>
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
            <span className="text-danger errorHanlderDesign d-flex flex-column">
              {userError.ageError}
            </span>

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
            <span className="text-danger errorHanlderDesign d-flex flex-column">
              {userError.passwordError}
            </span>

            {passwordShown ? (
              <EyeSlashIcon onClick={togglePassword} />
            ) : (
              <EyeIcon onClick={togglePassword} />
            )}
          </Form.Group>
          <Form.Label className="text-warning">
            {userReduxCredentials.credentials.role === 1
              ? "Choose what account we are updating"
              : "Please verify your email"}
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="Example@gmail.com"
            name="email"
            onChange={emailHandler}
            onInput={(e) =>
              errorHandler(e.target.name, e.target.value, "email")
            }
          />
          <span className="text-danger errorHanlderDesign d-flex flex-column">
            {userError.emailError}
          </span>
          <Button className="my-2 submitButton" onClick={() => updateTry()}>
            SUBMIT
          </Button>
        </Form>
      </Col>
    </Container>
  );
};

export default UpdateMyProfile;
