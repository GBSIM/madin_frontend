import './Header.css';

import DesktopHeader from '../DesktopHeader/DesktopHeader';
import MobileHeader from '../MobileHeader/MobileHeader';

export default function Header() {
    return (
        <div className='header'>
            <DesktopHeader></DesktopHeader>
            <MobileHeader></MobileHeader>
        </div>
    )
}