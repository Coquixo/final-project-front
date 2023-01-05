import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import MyNavBar from "../../components/Navbar/Navbar";
import { getWalletBalance } from "../../services/apiCalls";
import { userData } from "../../services/slices/userSlice";

const Balances = () => {
    const [balances, setBalances] = useState([]);
    const userReduxCredentials = useSelector(userData);

    useEffect(() => {
        if (balances.length === 0) {
            getWalletBalance(userReduxCredentials.credentials.id, 1).then(
                (balances) => {
                    setBalances(balances.data);
                }
            );
            getWalletBalance(userReduxCredentials.credentials.id, 2).then(
                (balances) => {
                    setBalances(balances.data);
                }
            );
        }
    }, []);

    return (
        <div>
            <MyNavBar />
            <Container>
                <Row>
                    <Col>
                        <div>
                            <p>{balances.id}</p>
                            <p>{balances.UserId}</p>
                            <p>{balances.CardId}</p>
                            <p>{balances.balance}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Balances;
