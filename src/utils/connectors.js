import { AVALANCHE_TESTNET_PARAMS } from '../networks/networks.js';
import { ethers } from 'ethers';
import { HeroesTokenAbi } from '../abis';

const HEROES_TOKEN_ADDRESS = '0x9e3F28C3c37ac77684730e223aa7c0621a206CD6';

// Helper Functions

// Requests access to the user's META MASK WALLET
// https://metamask.io
const requestAccount = async (setWalletAddress, setUserBalance) => {
  console.log('Requesting account...');

  // ❌ Check if Meta Mask Extension exists
  if (window.ethereum && window.ethereum.isMetaMask) {
    // ✅ Meta Mask Extension exists
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setWalletAddress(accounts[0]);
      getAccountBalance(accounts[0], setUserBalance);
    } catch (error) {
      console.log('Error connecting...');
    }
  } else {
    alert('Meta Mask not detected');
  }
};
const getAccountBalance = async (account, setUserBalance) => {
  try {
    const balance = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [account, 'latest'],
    });
    setUserBalance(ethers.utils.formatEther(balance));
  } catch (error) {
    console.log(error);
  }
};

// Create a provider to interact with a smart contract
const connectWallet = async (
  setWalletAddress,
  setUserBalance,
  setProvider,
  setSigner,
  setContract
) => {
  if (typeof window.ethereum !== 'undefined') {
    await switchFujiNetwork();
    await requestAccount(setWalletAddress, setUserBalance);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      HEROES_TOKEN_ADDRESS,
      HeroesTokenAbi,
      signer
    );
    setProvider(provider);
    setSigner(signer);
    setContract(contract);
  }
};

// switch to the correct network
const switchFujiNetwork = async () => {
  if (window.ethereum.networkVersion !== AVALANCHE_TESTNET_PARAMS.chainId) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: AVALANCHE_TESTNET_PARAMS.chainId }],
      });
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [AVALANCHE_TESTNET_PARAMS],
        });
      }
    }
  }
};

export { connectWallet, getAccountBalance };
