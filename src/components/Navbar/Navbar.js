import '../../styles/Navbar.css';
import '../../styles/style.css';
import '../../styles/html-css/bootstrap.css';
import '../../styles/html-css/swiper.css';
import '../../styles/html-css/dark.css';
import '../../styles/html-css/font-icons.css';
import '../../styles/html-css/animate.css';
import '../../styles/html-css/magnific-popup.css';
import '../../styles/html-css/custom.css';
import logo from '../../assets/html-assets/images-UMG/UMG-Logo-White-Header.png';

const Navbar = (props) => {
    return (
        <header id='header' className='dark'>
            <div id='header-wrap'>
                <div className='container'>
                    <div className='header-row style-2 menu-center'>
                        <div id='logo'>
                            <a href='https://unicornmotorcyclegang.io/main'>
                                <img src={logo} alt='UMG Logo'></img>
                            </a>
                        </div>
                        <div className='header-misc'>
                            <button className='button button-border button-rounded button-fill fill-from-bottom button-light button-mini' onClick={props.func}>
                                {props.value.length > 0 ? (
                                    <span>{"Connected: " +
                                    String(props.value).substring(0, 6) +
                                    "..." +
                                    String(props.value).substring(38)}</span>
                                ) : (
                                    <span>Connect Wallet</span>
                                )}
                            </button>
                        </div>
                        <nav className='primary-menu style-6'>
                            <ul className='menu-container' style={{'display': 'block'}}>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div className='header-wrap-clone'></div>
        </header>

    );
}

export default Navbar;