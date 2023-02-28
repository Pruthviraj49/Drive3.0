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
        let contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
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
    <div>

      {!modelOpen && (<button className='share' onClick={() => setModalOpen(true)}>Share</button>)} {" "}
      {modelOpen && (<Model setModalOpen={setModalOpen} contract={contract}></Model>)}

      <div className="App">
        <h1 style={{ color: 'white' }}>Drive3.0</h1>
        <div className='bg '> </div>
        <div className='bg bg1'> </div>
        <div className='bg bg2'> </div>
        <p>Account: {account ? account : "Not Connected"}</p>

        <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
        <Display account={account} contract={contract}></Display>
      </div>
    </div>
  );
}

export default App;

