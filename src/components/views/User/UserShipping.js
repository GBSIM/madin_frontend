import './User.css';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { authUser, KakaoRedirectHandler } from '../../library/ui/units/LoginButton/KakaoLogin';
import { login, logout, saveUserInfo } from '../../../_reducers/user';
import { changePage } from '../../../_reducers/nav'

import Header from '../../library/ui/components/Header/Header';
import UserClass from '../../library/ui/units/UserClass/UserClass';
import Mileage from '../../library/ui/units/Mileage/Mileage';
import UserNav from '../../library/ui/units/UserNav/UserNav';

export default function UserShipping() {
    const { isLogined, name, cart, userClass, mileage } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const moveToMain = () => {
        dispatch(changePage('main'));
        navigate('/main');
        window.scrollTo(0,0);
    }

    useEffect(() => {
        const href = window.location.href;
        let params = new URL(href).searchParams;
        let code = params.get("code");
        if (code != null) {
            KakaoRedirectHandler().then((user) => {
                dispatch(login());
                dispatch(saveUserInfo(user));
            });
        }
        authUser().then((user) => {
            if (user) {
                dispatch(login());
                dispatch(saveUserInfo(user));
            } else {
                dispatch(logout());
                moveToMain();
            }
        })
    }, []);

    return (
        <div className='page'>
            <Header isLogined={isLogined} name={name} cartNumber={cart.length}></Header>
            <div className='user-container'>
                <UserClass name={name} class={userClass}></UserClass>
                <div style={{'minHeight':'20px'}}></div>
                <Mileage mileage={mileage}></Mileage>
                <div style={{'minHeight':'40px'}}></div>
                <UserNav page='shipping'></UserNav>
            </div>
        </div>
    )
}