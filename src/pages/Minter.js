import { useEffect, useState } from 'react';
import { connectWallet, getCurrentWalletConnected, mint } from '../utils/interact.js';
import Navbar from '../components/Navbar/Navbar.js';
import Footer from '../components/Footer/Footer.js';

const Minter = (props) => {

    const [walletAddress, setWallet] = useState("");
    const [status, setStatus] = useState("");
    const [quantity, setQuantity] = useState("");

    useEffect(() => {
        async function fetchWalletConnected() {
            const { address, status } = await getCurrentWalletConnected();
            setWallet(address);
            setStatus(status);
        }
        fetchWalletConnected();
        addWalletListener();
    }, []);

    function addWalletListener() {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setWallet(accounts[0]);
                    setStatus("👆🏽 Write how many unicorns do you want in the text-field above.");
                } else {
                    setWallet("");
                    setStatus("🦊 Connect to Metamask using the top right button.");
                }
            });
        } else {
            setStatus(
                <p>
                    {" "}
                    🦊{" "}
                    <a target="_blank" rel='noreferrer' href={`https://metamask.io/download.html`}>
                        You must install Metamask, a virtual Ethereum wallet, in your
                        browser.
                    </a>
                </p>
            );
        }
    }

    const connectWalletPressed = async () => {
        const walletResponse = await connectWallet();
        setStatus(walletResponse.status);
        setWallet(walletResponse.address);
    };

    const onMintPressed = async () => {
        const { status } = await mint(quantity);
        setStatus(status);
    };

    return (
        <div className='stretched' style={{ 'backgroundColor': 'black' }}>
            <div id='wrapper' className='clearfix' style={{ 'backgroundColor': 'black' }}>
                <style>{'body {background-color: black;}'}</style>
                <div className='App'>
                    <Navbar func={connectWalletPressed} value={walletAddress}></Navbar>
                    <section id='content' style={{ 'backgroundColor': 'black' }}>
                        <div className='content-wrap'>
                            <div className='container'>
                                <div id='mintAUnicorn' className='row'>
                                    <div className='col-sm'>
                                        <h2 style={{ 'color': 'white' }}>Mint Instructions</h2>
                                        <p style={{ 'color': 'rgb(230, 230, 230)', 'textAlign': 'justify' }}>
                                            <span style={{ 'color': 'aquamarine', 'fontSize': 'x-large', 'fontWeight': 'bold' }}>THE WALLET.</span>
                                            <br />
                                            The first thing you need to do is connect you MetaMask wallet to the site, if everything goes smooth, as a colld beer, you'll see your wallet in the right section of the site.
                                            <br />
                                            <br />
                                            <span style={{ 'color': 'aquamarine', 'fontSize': 'x-large', 'fontWeight': 'bold' }}>THE UNICORN.</span>
                                            <br />
                                            After connecting your wallet, select a number between one and four these are the unicorns that you want to get, you can only mint four per wallet. Please check the status section in the right to get the ethersanc link to your transaction.
                                        </p>
                                    </div>
                                    <div className='col-sm'>
                                        <div className='row justify-content-center'>
                                            <div className='col-sm-6' style={{ 'objectFit': 'cover', 'height': '90%', 'width': '90%', 'borderRadius': '10px' }}>
                                                <span style={{ 'color': 'rgb(190, 190, 190)' }}>
                                                    <h2 style={{ 'color': 'white' }}>Your Wallet</h2>
                                                    <span>
                                                        {walletAddress.length > 0 ? (
                                                            "Connected: " +
                                                            String(walletAddress).substring(0, 15) +
                                                            "..." +
                                                            String(walletAddress).substring(38)
                                                        ) : (
                                                            <span>Currently not connected.</span>
                                                        )}
                                                    </span>
                                                </span>
                                                <br />
                                                <br />
                                            </div>
                                            <div className='col-sm center' style={{ 'backgroundColor': 'rgb(127, 255, 212)', 'objectFit': 'cover', 'height': '100%', 'width': '90%', 'borderRadius': '10px' }}>
                                                <br />
                                                <span className='col-sm'>
                                                    <h2 style={{ 'color': 'rgb(0, 0, 0)', 'fontSize': 'x-large', 'fontWeight': 'bold' }}>🦄 MINT A UNICORN 🦄</h2>
                                                </span>
                                                <br />
                                                <input
                                                    type='text'
                                                    placeholder="Quantity between 1 and 4..."
                                                    style={{'width': '50%', 'borderRadius': '50px', 'textAlign': 'center'}}
                                                    onChange={(event) => setQuantity(event.target.value)}
                                                />
                                                <br />
                                                <button id='tokenURIButton' data-lightbox='inline' className='button button-border button-rounded button-fill fill-from-right button-black' onClick={onMintPressed} >
                                                    <span>Mint Random Token</span>
                                                </button>
                                                <br />
                                                <br />
                                            </div>
                                            <div className='col-sm-6' style={{ 'objectFit': 'cover', 'height': '90%', 'width': '90%', 'borderRadius': '10px' }}>
                                                <br />
                                                <span style={{ 'color': 'rgb(190, 190, 190)' }}>
                                                    <h2 style={{ 'color': 'white' }}>Status</h2>
                                                    <span id='status'>{status}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Footer></Footer>
                </div>
            </div>
        </div>
    );
}

export default Minter;