import { Button, Col, Container, Form, Row } from "react-bootstrap";

const CreateWallet = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                    <Button className="bg-dark border border-2 border-light text-info my-2" >{`Create new ${props.name} card`}</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateWallet;
