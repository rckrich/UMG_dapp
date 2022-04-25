import '../../styles/Footer.css';
import '../../styles/style.css';
import '../../styles/html-css/bootstrap.css';
import '../../styles/html-css/swiper.css';
import '../../styles/html-css/dark.css';
import '../../styles/html-css/font-icons.css';
import '../../styles/html-css/animate.css';
import '../../styles/html-css/magnific-popup.css';
import '../../styles/html-css/custom.css';
import logo from '../../assets/html-assets/images-UMG/UMG-Logo-White.png';

const Footer = (props) => {
    return (
        <footer id="footer" className='dark'>
            <div className='container'></div>
            <div id='copyrights'>
                <div className='container'>
                    <div className='text-center'>
                        <div className='text-center'>
                            <a href='https://discord.gg/xpkERmUtQh' className='social-icon inline-block si-borderless mb-0 si-yahoo' target='_blank' rel='noopener noreferrer'>
                                <i className='icon-discord'></i>
                                <i className='icon-discord'></i>
                            </a>

                            <a href='https://twitter.com/UMGbar' className='social-icon inline-block si-borderless mb-0 si-twitter' target='_blank' rel='noopener noreferrer'>
                                <i className='icon-twitter'></i>
                                <i className='icon-twitter'></i>
                            </a>
                        </div>

                        <p>
                            Unicorn Motorcycle Gang
                            <br />Copyrights &copy; 2022 All Rights Reserved
                        </p>

                        <img src={logo} alt='UMG Logo' className='mb-4' style={{ 'maxWidth': '120px' }}></img>
                    </div>
                </div>
            </div>

        </footer>
    );
}

export default Footer;