import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { connectWallet, getAccountBalance } from './utils/connectors.js';
import NavBarComponent from './components/NavBarComponent.js';
import { HeroesTokenAbi } from './abis';
import NFTCardView from './components/NFTCardView';
import { Routes, Route } from 'react-router-dom';
import MyNFTView from './components/MyNFTView';
import NFTViewOfAddress from './components/NFTViewOfAddress';
import { convertStringToEther } from './utils/conversions';

const HEROES_TOKEN_ADDRESS = '0x9e3F28C3c37ac77684730e223aa7c0621a206CD6';
const nodeURL = 'https://api.avax-test.network/ext/bc/C/rpc';
const HTTPSProvider = new ethers.providers.JsonRpcProvider(nodeURL);

function App() {
  const [walletAddress, setWalletAddress] = useState('');
  const [userBalance, setUserBalance] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const contract = new ethers.Contract(
      HEROES_TOKEN_ADDRESS,
      HeroesTokenAbi,
      HTTPSProvider
    );
    setContract(contract);
  }, []);

  const avaxAmount = convertStringToEther(userBalance);

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };
  // When the metamask account changed we need to update the wallet address
  const accountChangedHandler = (newAccount) => {
    setWalletAddress(newAccount);
    getAccountBalance(newAccount.toString(), setUserBalance);
  };

  // listen for account changes
  window.ethereum.on('accountsChanged', accountChangedHandler);
  window.ethereum.on('chainChanged', chainChangedHandler);

  return (
    <div className="App">
      <NavBarComponent
        walletConnectHandler={() => {
          connectWallet(
            setWalletAddress,
            setUserBalance,
            setProvider,
            setSigner,
            setContract
          );
        }}
        avaxAmount={avaxAmount}
        walletAddress={walletAddress}
      ></NavBarComponent>
      {contract && (
        <Routes>
          <Route path="/" element={<NFTCardView contract={contract} />} />
          {walletAddress === '' ? (
            <Route
              path="/my-nfts"
              element={
                <h2 style={{ padding: '10px' }}>
                  To see your NFTs, you must connect your wallet.
                </h2>
              }
            />
          ) : (
            <Route
              path="/my-nfts"
              element={
                <MyNFTView walletAddress={walletAddress} contract={contract} />
              }
            />
          )}
          <Route
            path="/address/:walletAddress"
            element={<NFTViewOfAddress contract={contract} />}
          />
          <Route
            path="*"
            element={<h2 style={{ padding: '10px' }}>Page not found.</h2>}
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
