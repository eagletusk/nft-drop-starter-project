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
        <div className="header-container" >
          <h1 className="linear-wipe">Scandinavian Toilets Minter 🚽</h1>
          by <a className="footer-text" href ="https://www.paulsubzak.com"> Paul Subzak</a>
          <p className="text">
          Scandinavian Toilets is a tokenized collection of 117 toilets witnessed by Paul Subzak while living and traveling in Scandinavia in 2007-2008.<p></p>
          Each Toilet NFT comes individually numbered along with the location witnessed in Scandinavia, and the original date taken as attributes.<p></p>
          This project is an extension of the <a className="footer-text" href="http://web.archive.org/web/20151225184839/http://themountainfold.com/?page_id=657#1" > Scandinavian Toilets Book </a>that was published in 2010, where 12 handbound books were created featuring all 117 toilets, and gifted to friends and family.
          Each of the 12 books were hand bound using the coptic binding technique, and feature a relief print on the cover. All books were individually numbered and signed, no further editions will be made.
          <p className="sub-text">How to Mint: </p>
          Connect a <a target="_blank"
        rel="noreferrer"
        className="footer-text"
        href ="https://phantom.app/">Phantom wallet</a> click the "Mint a toilet" button. After minting your Toilet NFT will be available in the NFT Gallery of your Phantom wallet.</p>
 
          <p className="sub-text">Mint Price: 0.01 sol + minting fees</p> 
          
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
          >{`built by @${TWITTER_HANDLE}  `}</a>  <p className="text">-in collaboration with-</p>
          <a
          className="footer-text"
          href="http://roboglobo.co"
          target="_blank"
          rel="noreferrer"
        >{` Robo Globo `}</a><p className="text"> 🤖🌎 and 🦄 </p>
        <a
        target="_blank"
        rel="noreferrer"
        className="footer-text"
        href="http://Buildspace.so"> {`Buildspace.so`}</a>
        </div>
      </div>
    </div>
  );

};

export default App;