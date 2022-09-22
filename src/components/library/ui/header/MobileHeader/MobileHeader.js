import './MobileHeader.css';

import LogoButton from '../../logo/LogoButton/LogoButton';
import ProfileButton from '../../unit/ProfileButton/ProfileButton';

export default function MobileHeader() {
    return (
        <div className="mobile-header-container">
            <div className='mobile-header-logo-container'>
                <LogoButton width={'70px'}></LogoButton>
            </div>
            <div className='mobile-header-button-container'>
                <ProfileButton></ProfileButton>
            </div>
        </div>
    )
}