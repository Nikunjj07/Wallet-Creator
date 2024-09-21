import { useState } from "react"
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl"

export function SolanaWallet({ mnemonic }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [publicKeys, setPublicKeys] = useState([]);
    const [privateKeys, setPrivateKeys] = useState([])

    return <div>
        <button className="sol-button" onClick={function() {
            const seed = mnemonicToSeed(mnemonic);
            const path = `m/44'/501'/${currentIndex}'/0'`;
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            const keypair = Keypair.fromSecretKey(secret);
            setCurrentIndex(currentIndex + 1);
            setPublicKeys([...publicKeys, keypair.publicKey]);
            setPrivateKeys([...privateKeys, secret]);
        }}>
            Add Solana Wallet
        </button>

        {publicKeys.map((p, index) => (
                <div key={index} className="address">
                    <div>Public Address: <br />{p.toBase58()}</div>
                    <div>Private Key: {Buffer.from(privateKeys[index]).toString("hex")}</div>
                </div>
            ))}
    </div>
}