import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router";
import "./Navbar.scss";
import { useSelector } from "react-redux";
import { userData } from "../../services/slices/userSlice";

const MyNavBar = () => {
    const navigate = useNavigate();
    const userReduxCredentials = useSelector(userData)

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand
                    onClick={() => navigate("/profile")}
                    className="nameNavBar text-warning">
                    {userReduxCredentials.credentials.name}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link >My LinkedIn</Nav.Link>
                        <Nav.Link >My Github</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavBar;
