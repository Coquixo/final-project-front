import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { addOrWithdrawMoney } from "../../../services/apiCalls";
import { useNavigate } from "react-router";
const AddWithdrawMoney = (props) => {
    const action = props.action;
    const quantity = props.quantity;
    const walletId = props.walletId;
    const navigate = useNavigate()

    const sendMoneyRequest = async () => {
        await addOrWithdrawMoney(walletId, quantity, action)
        navigate("/")
    }



    return (
        <Row>
            <Col className="align-items-center">
                <Button className="bg-dark border border-2 border-light text-info my-2"
                    onClick={sendMoneyRequest}
                >{`${action} money`}</Button>
            </Col>
        </Row>
    );
};

export default AddWithdrawMoney;
