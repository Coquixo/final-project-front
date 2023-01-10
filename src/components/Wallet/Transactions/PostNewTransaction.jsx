import React from "react";
import { Button, Col, Container, Row, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userData } from "../../../services/slices/userSlice";

const ExecuteNewTransaction = () => {
    const userReduxCredentials = useSelector(userData);
    const role = userReduxCredentials.credentials.role;
    const email = userReduxCredentials.credentials.email;

    return (
        <Container>
            <Form className="text-light">
                <Form.Label>Make a transaction to someone's credit card!</Form.Label>
                <Form.Group className="mt-1">
                    <Form.Label>Sender:</Form.Label>
                    {role === 1 ? (
                        <Form.Control
                            type="text"
                            name="senderEmail"
                            placeholder="example@gmail.com"
                        />
                    ) : (
                        <>
                            {" "}
                            {email}
                        </>
                    )}
                </Form.Group>
                <Form.Group className="mt-1">
                    <Form.Label>Addressee:</Form.Label>
                    <Form.Control
                        type="text"
                        name="addresseeEmail"
                        placeholder="example@gmail.com"
                    />
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
