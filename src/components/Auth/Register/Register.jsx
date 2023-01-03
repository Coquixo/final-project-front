import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import "./Register.scss";

const Register = () => {




    return (
        // <div className="formBox">
        //     <div className="formTitle">Register!</div>
        //     <div className="textDesign">Name</div>
        //     <input type="text" className="inputFormDesign" />
        //     <div className="textDesign">Age</div>
        //     <input type="number" className="inputFormDesign" placeholder=">18" />
        //     <div className="textDesign">Email</div>
        //     <input type="email" className="inputFormDesign" placeholder="example@gmail.com" />
        //     <div className="textDesign">Password</div>
        //     <input type="password" className="inputFormDesign" />
        //     <div className="submitButton">Submit</div>
        //     <div className="errorHandlerDesign">Aqui van los errores</div>
        // </div>
        <Container className="formBox">
            <Row>
                <Col></Col>
                <Col className="formTitle mt-3 border-1 border border-dark">REGISTER</Col>
                <Col></Col>
            </Row>
            <Row>
                <Col></Col>

                <Col md={8}>
                    <Form>
                        <Form.Group className="m-4">
                            <Form.Label >Name</Form.Label>
                            <Form.Control type="text" />
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Example@gmail..com" />
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="number" placeholder=">18" />
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" />
                            <Form.Text className="text-danger errorHanlderDesign"> Aqui van los errores</Form.Text>
                        </Form.Group>
                        <Button className="my-2 submitButton">SUBMIT</Button>


                    </Form>

                </Col>
                <Col></Col>


            </Row>
        </Container >
    );
};

export default Register;
