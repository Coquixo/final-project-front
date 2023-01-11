import React, { useEffect, useState } from "react";
import { Col, Container, Form, Modal, ModalFooter, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import MyNavBar from "../../components/Navbar/Navbar";
import AddWithdrawMoney from "../../components/Wallet/WalletForm/AddWithdrawMoney";
import CreateWallet from "../../components/Wallet/WalletForm/CreateWalletForm";
import { getWalletBalance } from "../../services/apiCalls";
import { userData } from "../../services/slices/userSlice";
import "./Balances.scss";

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
            getWalletBalance(userId, 1).then((balances) => {
                setCreditBalances(balances.data);
                setTotalBalance(parseInt((totalBalance += balances.data.balance)));
            });
        }
        if (debitBalances.length === 0) {
            getWalletBalance(userId, 2).then((balances) => {
                setDebitBalances(balances.data);
                setTotalBalance(parseInt((totalBalance += balances.data.balance)));
            });
        }
    }, []);

    const moneyHandlerCredit = (e) => {
        setMoneyToChangeCredit(Math.abs(e.target.value));
    };
    const moneyHandlerDebit = (e) => {
        setMoneyToChangeDebit(Math.abs(e.target.value));
    };
    return (
        <div className="vh-100 bg-dark d-flex flex-column ">
            <MyNavBar />
            <Container fluid className="bg-dark">
                <Row className="bg-dark text-danger my-2 h5">
                    <Col>
                        TOTAL BALANCE: <span className="text-light">{totalBalance}€</span>
                    </Col>
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
                <Row className="align-items-center bg-dark text-light mx-2">
                    <Col className="text-info h5">Credit Options</Col>
                    <Col xl={8}>
                        <Row fluid="true" className="border rounded my-2 py-2">
                            {creditBalances === null ? (
                                <CreateWallet name={"credit"} cardId={1} userId={userId} />
                            ) : (
                                <>
                                    <Col>
                                        <AddWithdrawMoney
                                            action={"Add"}
                                            quantity={moneyToChangeCredit}
                                            walletId={creditBalances.id}
                                        />
                                    </Col>
                                    <Col>
                                        <AddWithdrawMoney
                                            action={"Withdraw"}
                                            quantity={moneyToChangeCredit}
                                            walletId={creditBalances.id}
                                        />
                                    </Col>
                                    <Col
                                        className="align-items-center d-flex justify-content-center pt-1"
                                        sm={6}
                                        md={6}
                                        xl={6}>
                                        <Form.Control
                                            type="number"
                                            max={10000}
                                            min={0}
                                            placeholder="Quantity"
                                            onChange={moneyHandlerCredit}
                                        />
                                    </Col>
                                </>
                            )}
                        </Row>
                    </Col>
                </Row>
                <Row className="align-items-center bg-dark text-light mx-2">
                    <Col className="text-info h5">Debit Options</Col>
                    <Col xl={8}>
                        <Row fluid="true" className="border rounded my-2 py-2">
                            {debitBalances === null ? (
                                <CreateWallet name={"debit"} cardId={2} userId={userId} />
                            ) : (
                                <>
                                    <Col>
                                        <AddWithdrawMoney
                                            action={"Add"}
                                            quantity={moneyToChangeDebit}
                                            walletId={debitBalances.id}
                                            actualBalance={debitBalances.balance}
                                        />
                                    </Col>
                                    <Col>
                                        <AddWithdrawMoney
                                            action={"Withdraw"}
                                            quantity={moneyToChangeDebit}
                                            walletId={debitBalances.id}
                                            actualBalance={debitBalances.balance}
                                        />
                                    </Col>
                                    <Col
                                        className="align-items-center d-flex justify-content-center pt-1"
                                        sm={6}
                                        xl={6}
                                        md={6}>
                                        <Form.Control
                                            type="number"
                                            max={10000}
                                            min={0}
                                            placeholder="Quantity"
                                            onChange={moneyHandlerDebit}
                                        />
                                    </Col>
                                </>
                            )}
                        </Row>
                    </Col>
                </Row>
                <Row fluid className="m-3 d-flex  justify-content-center">
                    <Col
                        fluid
                        xl={8}
                        className="d-flex justify-content-center align-items-center bg-secondary text-light border-dark border rounded">
                        <span className="p-3">
                            Mjölnir Capital is a new project based on solving every person
                            finance day-to-day main problem, counting cents. We don't like do
                            that and you neither so we decided to create a platform where your
                            friends and you can share good ammounts of money with each other
                            without thinking on the annoyances.
                            <br />
                            What's the best part? You only need to know the addressee email to
                            make a new transfer :'{")"}
                        </span>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Balances;
