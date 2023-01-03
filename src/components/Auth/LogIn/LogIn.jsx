import React from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const Login = () => {
    // return (
    //     <div className="formBox">
    //         <div className="formTitle">Log In!</div>

    //         <div className="textDesign">Email</div>
    //         <input
    //             type="email"
    //             className="inputFormDesign"
    //             placeholder="example@gmail.com"
    //         />
    //         <div className="textDesign">Password</div>
    //         <input type="password" className="inputFormDesign" />
    //         <Button variant="light" className="submitButton">Submit</Button>{' '}
    //         <div className="errorHandlerDesign">Aqui van los errores</div>
    //     </div>
    // );

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
                            <Form.Control type="email" placeholder="Example@gmail.com" />
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter password" />
                            <Form.Text className="text-danger errorHandlerDesign ">
                                Aqui van los errores
                            </Form.Text>
                        </Form.Group>
                        <Button className="my-2 submitButton">SUBMIT</Button>
                    </Form>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

export default Login;
