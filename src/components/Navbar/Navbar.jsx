import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { userData, userout } from "../../services/slices/userSlice";

const MyNavBar = () => {
    const navigate = useNavigate();
    const userReduxCredentials = useSelector(userData);
    const dispatch = useDispatch();
    const logOut = () => {
        if (userReduxCredentials.credentials.token !== undefined) {
            setTimeout(() => {

                dispatch(userout({ credentials: {} })).then(navigate("/welcome"));
            }, 300);
        }

    };

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand
                onClick={() => navigate("/welcome")}
                className="nameNavBar text-danger ">
                MJÖLNIR CAPITAL
            </Navbar.Brand>
            <Container>
                <Navbar.Brand
                    onClick={() => navigate("/profile")}
                    className="nameNavBar text-warning  font-monospace">
                    {userReduxCredentials.credentials.name}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/transactions">My Transactions</Nav.Link>
                        <Nav.Link href="#pricing">MyCards</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="" className="text-info" onClick={logOut}>
                            Log Out
                        </Nav.Link>
                        <Nav.Link
                            href="https://www.linkedin.com/in/alex-marcelo-lopez-quiroga5555/"
                            target="_blank">
                            My LinkedIn
                        </Nav.Link>
                        <Nav.Link href="https://github.com/Coquixo" target="_blank">
                            My Github
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavBar;
