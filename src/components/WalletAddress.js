// import { Fragment } from 'react';
import { Button, Link } from 'react-bootstrap';

// This is the component that displays the wallet address button
function WalletAddress(props) {
  let walletText;
  if (props.walletAddress === undefined || props.walletAddress === '') {
    walletText = '0x0000...0000';
  } else {
    walletText =
      props.walletAddress.slice(0, 6) +
      '...' +
      props.walletAddress.slice(props.walletAddress.length - 4);
  }
  return (
    <Button
      // component={Link} to="./Form"
      variant="outline-secondary"
      className="wallet-address"
      onClick={props.onClickHandler}
      // onMouseDown={(e) => e.preventDefault()}
    >
      {walletText}
    </Button>
  );
}

export default WalletAddress;
