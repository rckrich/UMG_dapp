import Web3 from 'web3';
import { ethers } from 'ethers'

const GAS_LIMIT_PER = 200000;

const contractABI = require('../contract-abi.json')
const contractAddress = "0x94D89A3647dFC82BF0207560FD6354B070276b77";

export const connectWallet = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            const obj = {
                status: "👆🏽 Write how many unicorns do you want in the text-field above.",
                address: addressArray[0],
            };
            return obj;
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
            };
        }
    } else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                            You must install Metamask, a virtual Ethereum wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};

export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
        try {
            const addressArray = await window.ethereum.request({
                method: "eth_accounts",
            });
            if (addressArray.length > 0) {
                return {
                    address: addressArray[0],
                    status: "👆🏽 Write how many unicorns do you want in the text-field above.",
                };
            } else {
                return {
                    address: "",
                    status: "🦊 Connect to Metamask using the top right button.",
                };
            }
        } catch (err) {
            return {
                address: "",
                status: "😥 " + err.message,
            };
        }
    } else {
        return {
            address: "",
            status: (
                <span>
                    <p>
                        {" "}
                        🦊{" "}
                        <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                            You must install Metamask, a virtual Ethereum wallet, in your
                            browser.
                        </a>
                    </p>
                </span>
            ),
        };
    }
};

export const mint = async (quantity) => {
    if (window.ethereum) {

        if (quantity <= 0 || quantity > 4) {
            return {
                success: false,
                status: "❗Please make sure you can only mint a quantity between 1 and 4.",
            };
        }

        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
        window.contract = await new web3.eth.Contract(contractABI, contractAddress);//loadContract();

        var price;

        await window.contract.methods.mintPrice().call(function (err, res) {
            const etherValue = Web3.utils.fromWei(res, 'ether');
            price = etherValue * quantity;
        });

        const parsedPrice = ethers.utils.parseEther(price.toString());
        const gaslimitValue = GAS_LIMIT_PER * quantity;

        const transactionParameters = {
            to: contractAddress, // Required except during contract publications.
            from: window.ethereum.selectedAddress, // must match user's active address.
            value: parsedPrice._hex,
            gasLimit: gaslimitValue,
            data: window.contract.methods
                .mint(quantity)
                .encodeABI(),
        };

        try {
            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [transactionParameters],
            });
            return {
                success: true,
                status: (
                    <span>
                        <p>
                            {" "}
                            ✅{" "}
                            <a target="_blank" rel="noreferrer" href={`https://etherscan.io/tx/` + txHash}>
                                Check out your transaction on Etherscan by clicking here!
                                <br />
                                <span>Your transaction: {String(txHash).substring(0, 15) +
                                    "..." +
                                    String(txHash).substring(38)}</span>
                            </a>
                        </p>
                    </span>
                ),
            };
        } catch (error) {
            return {
                success: false,
                status: "😥 Something went wrong: " + error.message,
            };
        }

    }
};