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
import dateFormat from "../../services/dateFormat";

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
            <Container fluid className="bg-dark ">
                <Row className="bg-dark py-2">
                    <Col className="border-bottom square border-danger">
                        <span
                            onClick={() => navigate("/welcome")}
                            className="text-danger linkButton fs-5 fw-bold d-flex align-items-center justify-content-center">
                            MJÖLNIR CAPITAL
                        </span>
                    </Col>
                    <Col className="border-bottom square border-warning"></Col>
                    <Col className="border-bottom square border-info">
                        <span
                            onClick={() => navigate("/balances")}
                            className="linkButton text-info d-flex align-items-center justify-content-center fw-bold">
                            Go Back
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
                <Row className="mx-2">
                    <Col className="bg-dark text-light" xl={6}>
                        {" "}
                        <ExecuteNewTransaction />
                    </Col>
                    <Col className="bg-dark text-light " xl={6}>
                        {transactionsData.length !== 0 ? (
                            <Row>
                                {transactionsData.map((transaction, index) => {
                                    return (
                                        <Col key={index} sm={12} className="px-5 py-3 border rounded m-1">
                                            <Row className="text-warning border border-top-0 border-start-0 border-end-0  mb-2">
                                                <Col>Transaction {index + 1}</Col>
                                                <Col>{dateFormat(transaction.createdAt)}</Col>
                                            </Row>
                                            {userRole === 1 ? (
                                                <>
                                                    <Row className="fw-bold">{transaction.quantity} €</Row>
                                                    <Row>Sender: {transaction.sender.User.email}</Row>
                                                    <Row>
                                                        Addressee: {transaction.addressee.User.email}
                                                    </Row>
                                                </>
                                            ) : (
                                                <Row>
                                                    <Col className="fw-bold">{transaction.quantity} €</Col>
                                                    <Col>{transaction.addressee.User.email}</Col>
                                                </Row>
                                            )}
                                            <Row> </Row>
                                        </Col>
                                    );
                                })}
                            </Row>
                        ) : (
                            "There is no transaction yet in here"
                        )}
                    </Col>

                </Row>
            </Container>
        </div>
    );
};

export default Transactions;
