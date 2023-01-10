import React, { useState } from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { errorCheck } from "../../../services/errorManage";
import { userData } from "../../../services/slices/userSlice";

const ExecuteNewTransaction = () => {
    const userReduxCredentials = useSelector(userData);
    const role = userReduxCredentials.credentials.role;
    const email = userReduxCredentials.credentials.email;
    const [senderEmail, setSenderEmail] = useState(email);
    const [addresseeEmail, setAddresseeEmail] = useState("");

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

    const errorHandler = (field, value, type) => {
        let error = "";
        error = errorCheck(value, type);
        setUserError((prevState) => ({
            ...prevState,
            [field + "Error"]: error,
        }));
    };

    const executeNewTransactionRequest = () => {
        if (role === 2) {
            // usar"Email"
        }
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
                            <span> {userError.senderError}</span>
                        </>
                    ) : (
                        <>
                            {" "}     {email}
                        </>
                    )}
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
                    {userError.addresseeError !== "" ?
                        <Form.Text className="text-danger errorHandlerDesign">
                            <span>{userError.addresseeError}</span>
                        </Form.Text>
                        : undefined}
                </Form.Group>
                <Form.Group className="mt-1">
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control type="number" name="Quantity" placeholder="€" />
                </Form.Group>
                <Button className="my-2 submitButton">SUBMIT</Button>
            </Form>
        </Container>
    );
};

export default ExecuteNewTransaction;
