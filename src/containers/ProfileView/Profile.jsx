import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import UpdateMyProfile from "../../components/UpdateProfile/UpdateMyProfile";
import "./Profile.scss";

const Profile = () => {
    const navigate = useNavigate();

    return (
        <div className="vh-100 bg-black">
            <Container fluid className="bg-black text-light">
                <Row className="text-danger fw-bold py-2 align-items-center">
                    <Col>
                        <span className="linkButton" onClick={() => navigate("/welcome")}>
                            MJÖLNIR CAPITAL
                        </span>
                    </Col>
                    <Col>
                        <span
                            className="text-info linkButton"
                            onClick={() => navigate("/balances")}>
                            Go back
                        </span>
                    </Col>
                </Row>

                <Row>
                    <Col></Col>
                    <Col lg="8" className="bg-light border rounded">
                        <UpdateMyProfile />
                    </Col>
                    <Col></Col>
                </Row>
                <Row></Row>
            </Container>
        </div>
    );
};

export default Profile;
