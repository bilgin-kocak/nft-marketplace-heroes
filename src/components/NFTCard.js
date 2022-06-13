import { Card, Button, Row, Col } from 'react-bootstrap';
import WalletAddress from './WalletAddress';
import { useNavigate } from 'react-router-dom';

// This is the component that displays the NFT card
function NFTCard(props) {
  const navigate = useNavigate();
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={props.token.image} />
      <Card.Body>
        <Card.Title>{props.token.name}</Card.Title>
        <Row className="card-text-value">
          <Col>{props.token.attributes[5].value}</Col>
          <Col>{props.token.attributes[4].value}</Col>
          <Col>{props.token.attributes[9].value}</Col>
        </Row>
        <Row>
          <Col>Level</Col>
          <Col>Generation</Col>
          <Col>Item Slots</Col>
        </Row>

        <Row className="card-text-value">
          <Col>{props.token.attributes[6].value}</Col>
          <Col>{props.token.attributes[7].value}</Col>
          <Col>{props.token.attributes[8].value}</Col>
        </Row>
        <Row>
          <Col>Attack</Col>
          <Col>Defence</Col>
          <Col>Endurance</Col>
        </Row>
        <WalletAddress
          walletAddress={props.token.owner}
          onClickHandler={() => {
            console.log(props.token.owner);
            navigate(`/address/${props.token.owner}`);
          }}
        />
      </Card.Body>
    </Card>
  );
}

export default NFTCard;
