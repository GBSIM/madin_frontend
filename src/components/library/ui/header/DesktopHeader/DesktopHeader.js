import './DesktopHeader.css';

import LogoButton from '../../logo/LogoButton/LogoButton';
import Navbar from '../../nav/navbar/Navbar';

export default function DesktopHeader() {
    return (
        <div className="desktop-header-container">
            <div className='desktop-header'>
                <div className='desktop-header-logo-container'>
                    <LogoButton></LogoButton>
                </div>
                <div className='desktop-header-space'></div>
                <div className='desktop-header-navbar-container'>
                    <Navbar></Navbar>
                </div>
            </div>
        </div>
    )
}