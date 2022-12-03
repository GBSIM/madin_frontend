import './User.css';

import axios from 'axios';
import { useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authUser, KakaoRedirectHandler } from '../../library/ui/units/LoginButton/KakaoLogin';
import { login, logout, saveName, saveCart, saveUserClass } from '../../../_reducers/user';
import { changePage } from '../../../_reducers/nav'

import Header from '../../library/ui/components/Header/Header';
import UserClass from '../../library/ui/units/UserClass/UserClass';

export default function UserOrder() {
    const { isLogined, name, cart, userClass } = useSelector(state => state.user);

    const dispath = useDispatch();
    const navigate = useNavigate();
    const moveToMain = () => {
        dispath(changePage('main'));
        navigate('/main');
        window.scrollTo(0,0);
    }

    useEffect(() => {
        const href = window.location.href;
        let params = new URL(href).searchParams;
        let code = params.get("code");
        if (code != null) {
            KakaoRedirectHandler().then((user) => {
                dispath(login());
                dispath(saveName(user["name"]));
                dispath(saveCart(user["cart"]));
                dispath(saveUserClass(user["class"]));
            });
        }
        authUser().then((user) => {
            if (user) {
                dispath(login());
                dispath(saveName(user["name"]));
                dispath(saveCart(user["cart"]));
                dispath(saveUserClass(user["class"]));
            } else {
                dispath(logout());
                moveToMain();
            }
        })
    }, []);

    return (
        <div className='page'>
            <Header isLogined={isLogined} name={name} cartNumber={cart.length}></Header>
            <div className='user-container'>
                <UserClass name={name} class={userClass}></UserClass>
            </div>
        </div>
    )
}