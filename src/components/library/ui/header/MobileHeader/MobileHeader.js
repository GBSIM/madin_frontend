import './MobileHeader.css';

import LogoButton from '../../logo/LogoButton/LogoButton';

export default function MobileHeader() {
    return (
        <div className="mobile-header-container">
           <div className='mobile-header-logo-container'>
                <LogoButton width={'70px'}></LogoButton>
            </div>
        </div>
    )
}