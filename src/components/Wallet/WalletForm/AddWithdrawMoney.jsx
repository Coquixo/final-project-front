import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const AddWithdrawMoney = (props) => {
    const action = props.action;
    const quantity = props.quantity;

    console.log(action);
    console.log(quantity);

    return (
        <Row>
            <Col className="align-items-center">
                <Button className="bg-dark border border-2 border-light text-info my-2">{`${props.action} money`}</Button>
            </Col>
        </Row>
    );
};

export default AddWithdrawMoney;
