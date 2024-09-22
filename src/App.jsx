import { useState } from 'react'
import './App.css'
import { generateMnemonic } from "bip39";
import { SolanaWallet } from './solanaWallet';
import { EthWallet } from './ethWallet';

function App() {
  const [mnemonic, setMnemonic] = useState("");

  return (
    <>
      <div>
        <h1 className='heading'>Wallet Creator</h1>
        <h3>-by Nikunj</h3>
      </div>
      <div className='mnemonic-box'>
        <input className='mnemonic-input' type="text" value={mnemonic}></input>
        <button className='generate-button' onClick={async function() {
          const mn = generateMnemonic();
          setMnemonic(mn)
        }}>
          Create Seed Phrase
        </button>
      </div>
      <div className='wallet-shift'>
        <button className='wallet-shift-button'>Solana Wallet</button>
        <button className='wallet-shift-button'>Ethereum Wallet</button>
      </div>
      <div className='wallet-container'>
        <div className='solana-wallet'>{mnemonic && <SolanaWallet mnemonic={mnemonic} />}</div>
        <div className='eth-wallet'>{mnemonic && <EthWallet mnemonic={mnemonic} />}</div>
      </div>
    </>
  )
}

export default App
