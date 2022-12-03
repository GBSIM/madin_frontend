import './Header.css';
import './DesktopHeader.css';
import './DesktopNavContainer.css';
import './MobileHeader.css';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import TextNavButton from '../../units/TextNavButton/TextNavButton';
import LoginButton from '../../units/LoginButton/LoginButton';
import UserButton from '../../units/UserButton/UserButton';
import { MobileUserCart } from '../../units/UserButton/UserButton';

import { changePage } from '../../../../../_reducers/nav';

export default function Header(props) {
    return (
        <div className='header'>
            <DesktopHeader isLogined={props.isLogined} name={props.name} cartNumber={props.cartNumber}/>
            <MobileHeader isLogined={props.isLogined} cartNumber={props.cartNumber}></MobileHeader>
        </div>
    )
}

function DesktopHeader(props) {
    return (
        <div className='desktop-header'>
            <div className='desktop-header-brand-icon-container'>
                <img src={require('../../../images/logo_text.png')} alt='logo'></img>
            </div>
            <div className='desktop-header-nav-container'>
                <DesktopNavContainer />
            </div>
            <div className='desktop-header-spacer'></div>
            <DesktopAccountButtons isLogined={props.isLogined} name={props.name} cartNumber={props.cartNumber}/>
        </div>
    )
}

function DesktopNavContainer() {
    const navigate = useNavigate();
    const dispath = useDispatch();
    const { page } = useSelector(state => state.nav);

    const movePage = (nextPage) => {
        dispath(changePage(nextPage));
        navigate('/'+nextPage);
        window.scrollTo(0,0);
    }

    return (
        <div className='desktop-nav-container'>
            <TextNavButton isOn={page==='main'} text='배송구매' clickEvent={movePage} clickEventInput={'main'}></TextNavButton>
            <div className='desktop-nav-button-divider'></div>
            <TextNavButton isOn={page==='present'} text='선물하기' clickEvent={movePage} clickEventInput={'present'}></TextNavButton>
            <div className='desktop-nav-button-divider'></div>
            <TextNavButton isOn={page==='pickup'} text='픽업예약' clickEvent={movePage} clickEventInput={'pickup'}></TextNavButton>
        </div>
    )
}

function DesktopAccountButtons(props) {
    return (
        <div className='desktop-header-account-container'>
            <LoginButton isLogined={props.isLogined}/>
            <UserButton isLogined={props.isLogined} name={props.name} cartNumber={props.cartNumber}/>
        </div>
    )
}

function MobileHeader(props) {
    let UserButtons;
    if (props.isLogined) {
        UserButtons =
        <div>
            <MobileUserCart cartNumber={props.cartNumber}></MobileUserCart>
            <div style={{'minWidth':'5px'}}></div>
            <button className='mobile-header-alert-button'>
                <img className='mobile-hedaer-alert-button-image' src={require('../../../icons/alert_grey.png')} alt='alert'></img>
            </button>
        </div>
    }
    return (
        <div className='mobile-header'>
            <div className='mobile-header-brand-icon-container'>
                <img src={require('../../../images/logo_text.png')} alt='logo'></img>
            </div>
            <div style={{'flex':'1'}}></div>
            {UserButtons}
        </div>
    )
}