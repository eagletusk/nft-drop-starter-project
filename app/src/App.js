import React, { useEffect, useState } from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import CandyMachine from './CandyMachine';

// Constants
const TWITTER_HANDLE = 'eagletusk';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

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
        <div className="header-container">
          <p className="header">Scandinavian Toilets Minter</p>
          <p className="sub-text">NFTs from the book from Paul Subzak</p>
          <p className="text">
          <strong>About the Project:</strong> Scandinavian Toilets is a collection of over 100 toilets witnessed while living and traveling in Scandinavia (Norway, Sweden, and Denmark) in 2007-2008. 12 handbound book were made and distributed to friends and family in 2010. 
          Each book was hand bound using the coptic binding technique. The front cover was constructed to include a relief print based on two separate toilets, six with a urinal and six with a standard toilet. Each book took approximetly 4-5 hours of work to construct. </p>
          <p className="text">
          <strong>How to Mint: </strong>Scandinavian Toilets Series consists of 100 NFTs by Paul Subzak. To mint one of the NFT's connect a phantom wallet to this site. https://phantom.app/ . Transfer some solana to your phantom wallet. To min a Scandinivian Toilet NFT click mint, once minted your NFT will be avalable in the NFT Gallery in your phantom wallet. </p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        {/* Check for walletAddress and then pass in walletAddress */}
      {walletAddress && <CandyMachine walletAddress={window.solana} />}
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE} `}</a>  <p className="text">-in collaboration with buildspace.so</p> 
        </div>
      </div>
    </div>
  );
};

export default App;