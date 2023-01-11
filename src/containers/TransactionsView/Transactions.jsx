import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
    getAllTransactions,
    getUserTransaction,
} from "../../services/apiCalls";
import { userData } from "../../services/slices/userSlice";
import { useNavigate } from "react-router";
import ExecuteNewTransaction from "../../components/Wallet/Transactions/PostNewTransaction";

const Transactions = () => {
    const navigate = useNavigate();
    const userReduxCredentials = useSelector(userData);
    const userId = userReduxCredentials.credentials.id;
    const userRole = userReduxCredentials.credentials.role;
    const token = userReduxCredentials.credentials.token;
    const [transactionsData, setTransactionsData] = useState([]);

    const giveUserTransactionsRequest = () => {
        getUserTransaction(userId, token).then((transaction) => {
            setTransactionsData(transaction.data);
        });
    };

    const giveAllTransactionsRequest = () => {
        getAllTransactions(token).then((transaction) => {
            setTransactionsData(transaction.data);
        });
    };
    return (
        <div className="vh-100 bg-dark">
            <Container fluid>
                <Row className="bg-dark py-2">
                    <Col className="border-bottom square border-danger">
                        <span
                            onClick={() => navigate("/welcome")}
                            className="text-danger linkButton fs-5">
                            MJÖLNIR CAPITAL
                        </span>
                    </Col>
                    <Col className="border-bottom square border-warning"></Col>
                    <Col className="border-bottom square border-info">
                        <span
                            onClick={() => navigate("/balances")}
                            className="linkButton text-info d-flex align-items-center justify-content-center">
                            Go Back.
                        </span>
                    </Col>
                </Row>
                <Row fluid className="d-flex justify-content-center bg-dark mt-3">
                    <Col sm={6} className="py-2">
                        {" "}
                        <span
                            className="text-info linkButton"
                            onClick={giveUserTransactionsRequest}>
                            {" "}
                            Click me to see your transactions.
                        </span>
                    </Col>
                    {userRole === 1 ? (
                        <Col className="py-2">
                            <span
                                className="text-warning linkButton  "
                                onClick={giveAllTransactionsRequest}>
                                Click here to see all transactions
                            </span>
                        </Col>
                    ) : undefined}
                </Row>
                <Row>
                    <Col className="bg-dark text-light">
                        {transactionsData.length !== 0 ? (
                            <Row>
                                {transactionsData.map((transaction, index) => {
                                    return (
                                        <Col key={index} sm={6} className="p-5 border rounded ">
                                            <Row className="text-warning border border-top-0 border-start-0 border-end-0">
                                                Transaction {index + 1}
                                            </Row>
                                            <Row>Sender's Wallet Id:{transaction.sender_wallet}</Row>
                                            <Row>
                                                Addressee Wallet Id:{transaction.addressee_wallet}
                                            </Row>
                                            <Row>Quantity:{transaction.quantity}</Row>
                                            <Row>Date:{transaction.createdAt}</Row>
                                        </Col>
                                    );
                                })}
                            </Row>
                        ) : (
                            "There is no transaction yet in here"
                        )}
                    </Col>
                    <Col className="bg-dark text-light ">
                        {" "}
                        <ExecuteNewTransaction />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Transactions;
