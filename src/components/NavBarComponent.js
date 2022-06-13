// import { Fragment } from 'react';
import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import WalletAddress from './WalletAddress';

// This is the component that displays the navbar
function NavBarComponent(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">
          NFT
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Explore
            </Link>
            <Link className="nav-link" to="/my-nfts">
              My NFTs
            </Link>
          </Nav>
          <WalletAddress
            walletAddress={props.walletAddress}
            onClickHandler={() =>
              navigator.clipboard.writeText(props.walletAddress)
            }
          />
          <Badge bg="secondary" style={{ marginRight: '10px' }}>
            {props.avaxAmount} AVAX
          </Badge>
          <Button
            variant="outline-success"
            onClick={props.walletConnectHandler}
          >
            Connect
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarComponent;
