import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllUsers } from "../../services/apiCalls";
import { userData } from "../../services/slices/userSlice";

const AdminView = () => {
    const navigate = useNavigate();
    const [newUserData, setNewUserData] = useState([]);
    const userReduxCredentials = useSelector(userData);
    const userRole = userReduxCredentials.credentials.role;
    const userToken = userReduxCredentials.credentials.token;

    const giveUsersHandler = () => {
        getAllUsers(userToken)
            .then((user) => {
                setNewUserData(user.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="vh-100 bg-dark">
            <Container fluid>
                <Row className="bg-dark">
                    <span
                        className="text-info fw-bold linkButton"
                        onClick={() => navigate("/balances")}>
                        GO BACK
                    </span>
                </Row>
                <Row className="bg-dark">
                    <Col lg={12} className="bg-dark">
                        <Row className="mx-2 bg-dark text-light">
                            {newUserData.map((newUser, index) => {
                                return (
                                    <Col
                                        className="px-5 py-3 border rounded mx-1 my-3"
                                        key={index}
                                        sm={12}>
                                        <Row>
                                            <Col className="text-warning fw-bold">User {index + 1}</Col>
                                        </Row>
                                        <Row>ID:{newUser.id}</Row>
                                        <Row>NAME: {newUser.name}</Row>
                                        <Row>SURNAME: {newUser.surname}</Row>
                                        <Row>AGE: {newUser.age}</Row>
                                        <Row>COUNTRY: {newUser.country}</Row>
                                        <Row>CITY: {newUser.city}</Row>
                                        <Row>ADDRESS: {newUser.address}</Row>
                                        <Row>ROLE: {newUser.RoleId}</Row>
                                        <Row>STATUS: {newUser.StateId}</Row>
                                    </Col>
                                );
                            })}
                        </Row>
                        <Row fluid className="d-flex justify-content-center">
                            <Col className="bg-danger text-light ">
                                <span onClick={giveUsersHandler} className="linkButton">
                                    Click on here to see all users
                                </span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminView;
