import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Login from "../../components/Auth/LogIn/LogIn";
import Register from "../../components/Auth/Register/Register";
import "./Home.scss";

const Home = () => {
    const [loginForm, setloginForm] = useState(true);
    const [message, setMessage] = useState({
        login: "Create a new account",
        register: "Log an existing account",
    });

    // return (

    //     <div className="homeViewBox">
    //         <div className="homeTitle">MJÖLNIR CAPITAL</div>
    //         <div className="homeMainBox">
    //             <div className="homeFormBox">
    //                 {loginForm ? <Login /> : <Register />}
    //             </div>
    //             <Button className="optionDesign" variant="dark" onClick={() => setloginForm(!loginForm)}>
    //                 {!loginForm ? message.register : message.login}</Button>

    //         </div>
    //     </div >
    // );

    return (
        <Container>
            <Row>
                <Col className="homeTitle bg-dark ">MJÖLNIR CAPITAL</Col>
            </Row>
            <Row className="homeMainBox ">
                <Col></Col>
                <Col className=" bg-light " sm={12}>
                    {loginForm ? <Login /> : <Register />}
                </Col>
                <Col></Col>
                <Row>
                    <Col>
                        <Button
                            className="optionDesign mt-5"
                            onClick={() => setloginForm(!loginForm)}>
                            {!loginForm ? message.register : message.login}
                        </Button>
                    </Col>
                </Row>
            </Row>
        </Container>
    );
};

export default Home;
