import React, { useEffect, useState } from 'react';
import './App.css';
// import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

// Constants
// const TWITTER_HANDLE = 'eagletusk';
// const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // State
  const [walletAddress, setWalletAddress] = useState(null);

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          const response = await solana.connect({ onlyIfTrusted: true });
          console.log(
            'Connected with Public Key:',
            response.publicKey.toString()
          );

          /*
           * Set the user's publicKey in state to be used later!
           */
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
  
    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);
  

  return (
    <div className="App">
      <div className="container">
        <div className="header-container" >
          <h1 className="linear-wipe">Scandinavian Toilets Minter 🚽</h1>
          by 
          <a 
          className="footer-text"
          href ="https://www.paulsubzak.com"> Paul Subzak</a>
          <p>Scandinavian Toilets is a tokenized collection of 117 toilets from the of the <a className="footer-text" href="https://www.paulsubzak.com/scandinavian-toilets-book"> Scandinavian Toilets Book</a>.</p>
          <p>Each Toilet NFT is individually numbered and includes: location witnessed in Scandinavia, and the original date taken as attributes.</p>
          <p><strong>How to Mint:</strong> Connect a <a 
          target="_blank"
          rel="noreferrer"
          className="footer-text"
          href ="https://phantom.app/">Phantom wallet</a> then mint a toilet. After minting your Toilet NFT will be available in the NFT Gallery of your Phantom wallet.</p> 
          <p><strong>Mint Price: </strong>0.01 sol (plus minting fees)</p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {/* Check for walletAddress and then pass in walletAddress */}
        {walletAddress && <CandyMachine walletAddress={window.solana} />} 
        <div className="footer-container">
        </div>
      </div>
    </div>
  );

};

export default App;