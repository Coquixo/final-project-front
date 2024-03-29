import { Button, Col, Container, Row } from "react-bootstrap";
import { createNewWallet } from "../../../services/apiCalls";
import { useNavigate } from "react-router";

const CreateWallet = (props) => {
  const navigate = useNavigate();
  const user = props.userId;
  const card = props.cardId;

  const createWalletRequest = async () => {
    await createNewWallet(user, card);
    navigate("/");
  };
  return (
    <Container>
      <Row>
        <Col>
          <Button
            className="bg-dark border border-2 border-light text-info my-2"
            onClick={createWalletRequest}
          >{`Create new ${props.name} card`}</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateWallet;
