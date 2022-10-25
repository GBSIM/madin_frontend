import './DesktopHeader.css';

import { useDispatch } from 'react-redux';

import { changeUserMenuPopupState } from '../../../../../_reducers/user';

import LogoButton from '../../unit/LogoButton/LogoButton';
import Navbar from '../../nav/DesktopNavBar/DesktopNavbar';
import LoginButton from '../../account/LoginButton/LoginButton';
import UserButton from '../../account/UserButton/UserButton';
import UserPopupMenu from '../../account/UserPopupMenu/UserPopupMenu';

export default function DesktopHeader() {
    const dispatch = useDispatch();
    const userMenuChangeEvent = () => {
        dispatch(changeUserMenuPopupState());
    }

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
                <div className='desktop-header-user-button-container'>
                    <UserButton clickEvent={userMenuChangeEvent}></UserButton>
                </div>
                <div className='desktop-header-popup-user-menu-container'>
                    <UserPopupMenu></UserPopupMenu>
                </div>
            </div>
        </div>
    )
}