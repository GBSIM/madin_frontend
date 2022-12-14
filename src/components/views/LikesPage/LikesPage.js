import './LikesPage.css';

import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { saveUserInfo, login, logout } from '../../../_reducers/user';
import { authUser, KakaoRedirectHandler } from '../../library/ui/units/LoginButton/KakaoLogin';
import { changePage } from '../../../_reducers/nav'

import Header from '../../library/ui/components/Header/Header';
import Likes from '../../library/ui/units/Likes/Likes';

export default function LikesPages() {
    const dispath = useDispatch();
    const navigate = useNavigate();
    const moveToMain = () => {
        dispath(changePage('main'));
        navigate('/main');
        window.scrollTo(0,0);
    }
    const [menus, setMenus] = useState([]);
    const { isLogined, name, cart, likes } = useSelector(state => state.user);

    useEffect(() => {
        const loadMenu  = async() => {
            try {
                const response = await axios.get('https://api.madinbakery.com/menu');
                setMenus(response.data.menu);
            } catch(err) {
                console.log(err);
            }
        };
        loadMenu();
        const href = window.location.href;
        let params = new URL(href).searchParams;
        let code = params.get("code");
        if (code != null) {
            KakaoRedirectHandler().then((user) => {
                dispath(login());
                dispath(saveUserInfo(user));
            });
        }
        authUser().then((user) => {
            if (user) {
                dispath(login());
                dispath(saveUserInfo(user));
            } else {
                dispath(logout());
                moveToMain();
            }
        })
    }, []);

    return (
        <div className='page'>
            <Header isLogined={isLogined} name={name} cartNumber={cart.length}></Header>
            <div className='likes-top-spacer'></div>
            <div className='likes-container'>
                <Likes 
                    menus={menus}
                    likes={likes}></Likes>
            </div>
            
        </div>
    )
}