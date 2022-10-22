import './DesktopHeader.css';

import LogoButton from '../../unit/LogoButton/LogoButton';
import Navbar from '../../nav/DesktopNavBar/DesktopNavbar';
import LoginButton from '../../account/LoginButton/LoginButton';

export default function DesktopHeader() {
    return (
        <div className="desktop-header-container">
            <div className='desktop-header'>
                <div className='desktop-header-logo-container'>
                    <LogoButton width={'90px'}></LogoButton>
                </div>
                <div className='desktop-header-navbar-container'>
                    <Navbar></Navbar>
                </div>
                <div className='desktop-header-space'></div>
                <div className='desktop-header-login-button-container'>
                    <LoginButton></LoginButton>
                </div>
            </div>
        </div>
    )
}