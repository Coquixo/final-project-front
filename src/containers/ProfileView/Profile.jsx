import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import UpdateMyProfile from "../../components/UpdateProfile/UpdateMyProfile";
import { userData } from "../../services/slices/userSlice";

const Profile = () => {
    const userReduxCredentials = useSelector(userData);


    return (
        <Container fluid className="bg-dark text-light">
            <Row className="text-danger fw-bold py-2">
                <Col>MJÖLNIR CAPITAL</Col>
            </Row>
            <Row>
                {/* <Col>
                    <Row className="text-warning">Your data:</Row>
                    <Row>Name: {userReduxCredentials.credentials.name} </Row>
                    <Row>Surname: {userReduxCredentials.credentials.surname} </Row>
                    <Row>Email: {userReduxCredentials.credentials.email} </Row>
                    <Row>Phone: {userReduxCredentials.credentials.phone} </Row>
                    <Row>Age: {userReduxCredentials.credentials.age} </Row>
                    <Row>Country: {userReduxCredentials.credentials.country} </Row>
                    <Row>City: {userReduxCredentials.credentials.city} </Row>
                    <Row>Address: {userReduxCredentials.credentials.address} </Row>
                    <Row>
                        State:{" "}
                        {userReduxCredentials.credentials.state === 1 ? "Active" : "Disabled"}{" "}
                    </Row>
                    <Row>
                        Role:{" "}
                        {userReduxCredentials.credentials.state === 1 ? "admin" : "user"}{" "}
                    </Row>
                </Col> */}
                <Col></Col>
                <Col>
                    <UpdateMyProfile />
                </Col>
                <Col></Col>
            </Row>
            <Row></Row>
        </Container>
    );
};

export default Profile;
