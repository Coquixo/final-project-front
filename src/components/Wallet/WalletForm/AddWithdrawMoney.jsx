import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { addOrWithdrawMoney } from "../../../services/apiCalls";
import { useNavigate } from "react-router";
const AddWithdrawMoney = (props) => {
    const action = props.action;
    const quantity = props.quantity;
    const walletId = props.walletId;
    const actualBalance = props.actualBalance
    const navigate = useNavigate()

    const moneyRequest = async () => {
        let result = actualBalance - quantity

        if (result < 0 && action === "Withdraw") {
            return
        }


        if (quantity !== 0) {
            await addOrWithdrawMoney(walletId, quantity, action)
            navigate("/")
        }
    }



    return (
        <Col className="align-items-center">
            <Button className="bg-dark border border-2 border-light text-info my-2"
                onClick={moneyRequest}
            >{`${action} money`}</Button>
        </Col>
    );
};

export default AddWithdrawMoney;
