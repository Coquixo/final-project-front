import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import MyNavBar from "../../components/Navbar/Navbar";
import AddWithdrawMoney from "../../components/Wallet/WalletForm/AddWithdrawMoney";
import CreateWallet from "../../components/Wallet/WalletForm/CreateWalletForm";
import { getWalletBalance } from "../../services/apiCalls";
import { userData } from "../../services/slices/userSlice";

const Balances = () => {
    const [creditBalances, setCreditBalances] = useState([]);
    const [debitBalances, setDebitBalances] = useState([]);
    const userReduxCredentials = useSelector(userData);
    const [totalBalance, setTotalBalance] = useState(0);

    useEffect(() => {
        if (creditBalances.length === 0) {
            getWalletBalance(userReduxCredentials.credentials.id, 1).then(
                (balances) => {
                    setCreditBalances(balances.data);
                    setTotalBalance(parseInt((totalBalance += balances.data.balance)));
                }
            );
        }
        if (debitBalances.length === 0) {
            getWalletBalance(userReduxCredentials.credentials.id, 2).then(
                (balances) => {
                    setDebitBalances(balances.data);
                    setTotalBalance(parseInt((totalBalance += balances.data.balance)));
                }
            );
        }
    }, []);

    return (
        <div>
            <MyNavBar />
            <Container fluid>
                <Row className="bg-dark text-danger">
                    <Col>TOTAL BALANCE: {totalBalance}€</Col>
                </Row>
                <Row>
                    <Col className="bg-dark text-light">
                        <span className="text-warning">Credit Card</span>
                        <p>
                            {creditBalances !== null
                                ? `Your credit Balance ${creditBalances.balance} €`
                                : "You have no Credit account Yet "}
                        </p>
                    </Col>
                    <Col className="bg-dark text-light">
                        <span className="text-warning">Debit Card</span>
                        <p>
                            {debitBalances !== null
                                ? `Your debit Balance ${debitBalances.balance} € `
                                : "You have no Debit account yet"}
                        </p>
                    </Col>
                </Row>
                <Row className="align-items-center bg-dark text-light">
                    <Col>Credit Options</Col>
                    <Col className="d-flex justify-content-around">
                        {creditBalances === null ? (
                            <CreateWallet name={"credit"} />
                        ) : (
                            <>
                                <AddWithdrawMoney action={"Add"} card={1} quantity={10} />
                                <AddWithdrawMoney action={"Withdraw"} card={1} quantity={10} />
                                <input
                                    type="number"
                                    max={150}
                                    min={0}
                                    placeholder={"Money Quantity"}
                                />
                            </>
                        )}
                    </Col>
                </Row>
                <Row className="align-items-center bg-dark text-light">
                    <Col>Debit Options</Col>
                    <Col className="d-flex justify-content-around">
                        {debitBalances === null ? (
                            <CreateWallet name={"credit"} />
                        ) : (
                            <>
                                <AddWithdrawMoney action={"Add"} card={2} quantity={10} />
                                <AddWithdrawMoney action={"Withdraw"} card={2} quantity={10} />
                                <input
                                    type="number"
                                    max={150}
                                    min={0}
                                    placeholder={"Money Quantity"}
                                />
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Balances;
