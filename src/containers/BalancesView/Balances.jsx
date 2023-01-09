import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import MyNavBar from "../../components/Navbar/Navbar";
import AddWithdrawMoney from "../../components/Wallet/WalletForm/AddWithdrawMoney";
import CreateWallet from "../../components/Wallet/WalletForm/CreateWalletForm";
import { getWalletBalance } from "../../services/apiCalls";
import { userData } from "../../services/slices/userSlice";
import "./Balances.scss"

const Balances = () => {
    const [creditBalances, setCreditBalances] = useState([]);
    const [debitBalances, setDebitBalances] = useState([]);
    const userReduxCredentials = useSelector(userData);
    let [totalBalance, setTotalBalance] = useState(0);
    const [moneyToChangeCredit, setMoneyToChangeCredit] = useState(0);
    const [moneyToChangeDebit, setMoneyToChangeDebit] = useState(0);
    const userId = userReduxCredentials.credentials.id;


    useEffect(() => {
        if (creditBalances.length === 0) {
            getWalletBalance(userId, 1).then(
                (balances) => {
                    setCreditBalances(balances.data);
                    setTotalBalance(parseInt((totalBalance += balances.data.balance)));
                }
            );
        }
        if (debitBalances.length === 0) {
            getWalletBalance(userId, 2).then(
                (balances) => {
                    setDebitBalances(balances.data);
                    setTotalBalance(parseInt((totalBalance += balances.data.balance)));
                }
            );
        }
    }, []);

    const moneyHandlerCredit = (e) => {
        setMoneyToChangeCredit(e.target.value);
    };
    const moneyHandlerDebit = (e) => {
        setMoneyToChangeDebit(e.target.value);
    };
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
                            <CreateWallet name={"credit"} cardId={1} userId={userId} />
                        ) : (
                            <>
                                <AddWithdrawMoney
                                    action={"Add"}
                                    quantity={moneyToChangeCredit}
                                    walletId={creditBalances.id}
                                />
                                <AddWithdrawMoney
                                    action={"Withdraw"}
                                    quantity={moneyToChangeCredit}
                                    walletId={creditBalances.id}
                                />
                                <input
                                    type="number"
                                    max={150}
                                    min={0}
                                    placeholder={"€?"}
                                    onChange={moneyHandlerCredit}
                                />
                            </>
                        )}
                    </Col>
                </Row>
                <Row className="align-items-center bg-dark text-light">
                    <Col>Debit Options</Col>
                    <Col className="d-flex justify-content-around" >
                        {debitBalances === null ? (
                            <CreateWallet name={"debit"} cardId={2} userId={userId} />
                        ) : (
                            <>
                                <AddWithdrawMoney
                                    action={"Add"}
                                    quantity={moneyToChangeDebit}
                                    walletId={debitBalances.id}
                                />
                                <AddWithdrawMoney
                                    action={"Withdraw"}
                                    quantity={moneyToChangeDebit}
                                    walletId={debitBalances.id}
                                />
                                <input
                                    type="number"
                                    max={150}
                                    min={0}
                                    placeholder={"€?"}
                                    onChange={moneyHandlerDebit}
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
