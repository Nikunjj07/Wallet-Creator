import { useState } from "react";
import { Wallet, HDNodeWallet } from "ethers";
import { mnemonicToSeed } from "bip39";

export const EthWallet = ({ mnemonic }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wallets, setWallets] = useState([]);

    return (
        <div>
            <button className="eth-button" onClick={async function () {
                const seed = await mnemonicToSeed(mnemonic);
                const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
                const hdNode = HDNodeWallet.fromSeed(seed);
                const child = hdNode.derivePath(derivationPath);
                const privateKey = child.privateKey;
                const wallet = new Wallet(privateKey);

                setCurrentIndex(currentIndex + 1);
                setWallets([...wallets, { address: wallet.address, privateKey }]);
            }}>
                Add ETH wallet
            </button>

            {wallets.map((w, index) => (
                <div key={index} className="address">
                    <div>Public Address: <br /> {w.address}</div>
                    <div>Private Key: <br /> {w.privateKey}</div>
                </div>
            ))}
        </div>
    );
};
