import './Header.css';
import './DesktopHeader.css';
import './DesktopNavContainer.css';

import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';

import { getCookie } from '../../units/Cookie/Cookie';
import { KakaoRedirectHandler } from '../../units/LoginButton/KakaoLogin';

import TextNavButton from '../../units/TextNavButton/TextNavButton';
import LoginButton from '../../units/LoginButton/LoginButton';
import UserButton from '../../units/UserButton/UserButton';

import { changePage } from '../../../../../_reducers/nav';

export default function Header() {
    return (
        <div className='header'>
            <DesktopHeader />
        </div>
    )
}

function DesktopHeader() {
    return (
        <div className='desktop-header'>
            <div className='desktop-header-brand-icon-container'>
                <img src={require('../../../images/logo_text.png')}></img>
            </div>
            <div className='desktop-header-nav-container'>
                <DesktopNavContainer />
            </div>
            <div className='desktop-header-spacer'></div>
            <DesktopAccountButtons />
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
            <TextNavButton isOn={page==='main'} text='개인구매' clickEvent={movePage} clickEventInput={'main'}></TextNavButton>
            <div className='desktop-nav-button-divider'></div>
            <TextNavButton isOn={page==='present'} text='선물하기' clickEvent={movePage} clickEventInput={'present'}></TextNavButton>
            <div className='desktop-nav-button-divider'></div>
            <TextNavButton isOn={page==='pickup'} text='픽업예약' clickEvent={movePage} clickEventInput={'pickup'}></TextNavButton>
        </div>
    )
}

function DesktopAccountButtons() {
    const [isLogined, setIsLogined] = useState(false);
    const [name, setName] = useState(null);

    useEffect(() => {
        const href = window.location.href;
        let params = new URL(href).searchParams;
        let code = params.get("code");
        if (code != null) {
            KakaoRedirectHandler().then((user) => {
                setIsLogined(true);
                setName(user["name"]);
            });
        }
        const authUser  = async() => {
            try {
                const token = getCookie('token');
                if (token) {
                    const authResponse = await axios.post('https://api.madinbakery.com/user/auth',
                    {
                    "token": token
                    });
                    console.log(authResponse);
                    if (authResponse.data.user) {
                        setIsLogined(true);
                        setName(authResponse.data.user["name"]);
                    }
                }
            } catch(err) {
                console.log(err);
            }
        };
        authUser();
    }, []);
    
    return (
        <div className='desktop-header-account-container'>
            <LoginButton isLogined={isLogined}/>
            <UserButton isLogined={isLogined} name={name}/>
        </div>
    )
}