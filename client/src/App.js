import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import FileUpload from './components/FileUpload';
import Model from './components/Model';
import Display from './components/Display';
import Drive from "./artifacts/contracts/Drive.sol/Drive.json"
function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modelOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        //without refresh account change detect
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        })
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        })



        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        let contractAddress = "0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0";
        const contract = new ethers.Contract(
          contractAddress, Drive.abi, signer
        );
        console.log(contract);
        setContract(contract);
        setProvider(provider);
      } else {
        console.error("MetaMask is not installed");
      }
    };
    provider && loadProvider()
  }, []);
  return (
    <div className="App">
      <h1 style={{ color: 'white' }}>Drive3.0</h1>
      <div className='bg '> </div>
      <div className='bg bg1'> </div>
      <div className='bg bg2'> </div>
      <p>Account: {account ? account : "Not Connected"}</p>

      <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
    </div>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import MyContract from './artifacts/contracts/Drive.sol/Drive.json';

// function App() {
//   const [web3, setWeb3] = useState(null);
//   const [account, setAccount] = useState(null);
//   const [contract, setContract] = useState(null);

//   useEffect(() => {
//     async function connect() {
//       // Connect to the MetaMask provider
//       if (window.ethereum) {
//         const web3 = new Web3(window.ethereum);
//         await window.ethereum.enable();
//         setWeb3(web3);
//       } else {
//         console.log('No MetaMask found');
//       }
//     }

//     connect();
//   }, []);

//   useEffect(() => {
//     async function getAccount() {
//       // Get the current account
//       if (web3) {
//         const accounts = await web3.eth.getAccounts();
//         setAccount(accounts[0]);
//       }
//     }

//     getAccount();
//   }, [web3]);

//   useEffect(() => {
//     async function getContract() {
//       // Get the deployed contract
//       if (web3) {
//         const networkId = await web3.eth.net.getId();
//         const deployedNetwork = MyContract.networks[networkId];
//         const contract = new web3.eth.Contract(
//           MyContract.abi,
//           deployedNetwork && deployedNetwork.address
//         );
//         setContract(contract);
//       }
//     }

//     getContract();
//   }, [web3]);

//   async function handleButtonClick() {
//     // Call the contract method
//     if (contract) {
//       const result = await contract.methods.myMethod().call();
//       console.log(result);
//     }
//   }

//   return (
//     <div>
//       <h1>My App</h1>
//       {account ? <p>Current Account: {account}</p> : <p>No Account</p>}
//       <button onClick={handleButtonClick}>Call Contract Method</button>
//     </div>
//   );
// }

// export default App;
