import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { executeTransactionByEmail } from "../../../services/apiCalls";
import { errorCheck } from "../../../services/errorManage";
import { userData } from "../../../services/slices/userSlice";
import { useNavigate } from "react-router";

const ExecuteNewTransaction = () => {
  const userReduxCredentials = useSelector(userData);
  const role = userReduxCredentials.credentials.role;
  const email = userReduxCredentials.credentials.email;
  const state = userReduxCredentials.credentials.state;
  const [senderEmail, setSenderEmail] = useState(email);
  const [addresseeEmail, setAddresseeEmail] = useState("");
  const [moneyToSend, setMoneyToSend] = useState(0);
  const navigate = useNavigate();

  const [userError, setUserError] = useState({
    senderError: "",
    addresseeError: "",
  });

  const senderHandler = (e) => {
    setSenderEmail(e.target.value);
  };
  const addresseeHandler = (e) => {
    setAddresseeEmail(e.target.value);
  };

  const moneyToSendHandler = (e) => {
    setMoneyToSend(Math.abs(e.target.value));
  };

  const errorHandler = (field, value, type) => {
    let error = "";
    error = errorCheck(value, type);
    setUserError((prevState) => ({
      ...prevState,
      [field + "Error"]: error,
    }));
  };

  const executeNewTransactionRequest = async () => {
    if (state === 2) {
      setUserError({
        senderError: "Your account has been disabled, please contact us.",
      });
      return;
    }

    let response = await executeTransactionByEmail(
      senderEmail,
      addresseeEmail,
      moneyToSend
    );
    setTimeout(() => {
      navigate("/balances ");
    }, 500);
  };

  return (
    <Container>
      <Form className="text-light">
        <Form.Label>Make a transaction to someone's credit card!</Form.Label>
        <Form.Group className="mt-1">
          <Form.Label>Sender: </Form.Label>
          {role === 1 ? (
            <>
              <Form.Control
                type="email"
                name="sender"
                placeholder="example@gmail.com"
                onChange={senderHandler}
                onInput={(e) =>
                  errorHandler(e.target.name, e.target.value, "email")
                }
              />
            </>
          ) : (
            <> {email}</>
          )}
          {userError.senderError !== "" ? (
            <Form.Text className="errorHandlerDesgn">
              <span className="errorHandlerDesign">
                {userError.senderError}
              </span>
            </Form.Text>
          ) : undefined}
        </Form.Group>
        <Form.Group className="mt-1">
          <Form.Label>Addressee:</Form.Label>
          <Form.Control
            type="email"
            name="addressee"
            placeholder="example@gmail.com"
            onChange={addresseeHandler}
            onInput={(e) =>
              errorHandler(e.target.name, e.target.value, "email")
            }
          />
          {userError.addresseeError !== "" ? (
            <Form.Text className="text-danger errorHandlerDesign">
              <span className="errorHandlerDesign">
                {userError.addresseeError}
              </span>
            </Form.Text>
          ) : undefined}
        </Form.Group>
        <Form.Group className="mt-1">
          <Form.Label>Quantity:</Form.Label>
          <Form.Control
            type="number"
            name="Quantity"
            placeholder="Max 10.000€"
            max={10000}
            min={0}
            onChange={moneyToSendHandler}
          />
        </Form.Group>
        <Button
          className="my-2 submitButton"
          onClick={executeNewTransactionRequest}
        >
          SUBMIT
        </Button>
      </Form>
    </Container>
  );
};

export default ExecuteNewTransaction;
