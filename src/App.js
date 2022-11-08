import './App.css';
import React from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";
import { useState } from "react";
import WalletConnectProvider from "@walletconnect/web3-provider";
import WalletLink from "walletlink";

const providerOptions = {
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
    appName: "Web3Modal Demo",
    infuraId: { 3: "https://ropsten.infura.io/v3/fefnefnesfe" },
    },
  },

    binancechainwallet: {
      package: true
    },

    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: { 3: "https://ropsten.infura.io/v3/fefnefnesfe" }, //projectid from infura account
      }
    },

    WalletLink: {
      package: WalletLink,
      options: {
        appName: "modaltask",
        rpc: "https://ropsten.infura.io/v3/fefnefnesfe",
        chainId: 3,
        appLogoUrl:null,
        darkMode: true
      }
    },

};

function App() {

  const [ web3Provider, setWeb3Provider ] = useState(null);


  async function connectWallet() {
    try {
      let web3Modal = new Web3Modal({
        network: "ropsten",
        theme: "dark",
        cacheProvider: false,
        providerOptions,
      });

      //var provider = await web3Modal.connect;
      //var web3 = new Web3Modal(provider);
      const web3ModalInstance = await web3Modal.connect();
      const web3ModalProvider = new ethers.providers.Web3Provider(web3ModalInstance);
  
      console.log(web3ModalProvider);
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="App">
      <header className="App-header">
      <h1>Web3Modal Connection...</h1>
        

        { web3Provider == null ? (
          //run if null
          <button onClick={connectWallet}>Connect Wallet</button>
        ) : (
          //run if not null
          <div>
            <p>Connected</p>
            <p>Wallet Address : {web3Provider.provider.selectedAddress} </p>
            <p>Wallet Balance: {}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
