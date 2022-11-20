import './UserButton.css';
import './UserMenus.css';
import './UserCart.css';
import './UserLike.css';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getCookie, deleteCookie } from '../Cookie/Cookie';
import { changePage } from '../../../../../_reducers/nav'

export default function UserButton(props) {
    const [isUserMenusOn, setUserMenusOn] = useState(false);

    const switchUserMenus = () => {
        if (isUserMenusOn) {
            setUserMenusOn(false);
        } else {
            setUserMenusOn(true);
        }
    }

    if (props.isLogined) {
        return (
            <div className='user-buttons-container'>
                <UserLike></UserLike>
                <UserCart number={props.cartNumber}></UserCart>
                <div style={{'minWidth':'20px'}}></div>
                <button className='user-button' onClick={() => switchUserMenus()}>
                    <span className='user-button-text'>{props.name}님</span>
                    <img className='user-button-arrow-image' src={require('../../../icons/inequity_down_grey.png')} alt='arrow-down'></img>
                </button>
                <UserMenus isOn={isUserMenusOn}></UserMenus>
            </div>
            
        )
    }
}

function UserMenus(props) {
    if (props.isOn) {
        return (
            <div className='user-menus'>
                <UserMenuButton text='주문내역'></UserMenuButton>
                <UserMenuButton text='배송지 관리'></UserMenuButton>
                <UserMenuButton text='적립금'></UserMenuButton>
                <UserMenuButton text='쿠폰'></UserMenuButton>
                <UserLogoutButton />
            </div>
        )
    }
}

function UserMenuButton(props) {
    return (
        <button className='user-menu-button' onClick={() => props.clickEvent(props.clickEventInput)}>
            <span className='user-menu-button-text'>{props.text}</span>
        </button>
    )
}

function UserLogoutButton() {
    const navigate = useNavigate();
    const dispath = useDispatch();

    const logoutUser = async () => {
        const token = getCookie('token');
        if (token) {
            await axios.post('https://api.madinbakery.com/user/logout',
                {
                "token": token
                }
            );
            deleteCookie('token');
            dispath(changePage('main'));
            navigate('/main');
            window.location.reload();
            window.scrollTo(0,0);
        }
    }

    return (
        <UserMenuButton text='로그아웃' clickEvent={logoutUser}></UserMenuButton>
    )
}

function UserCart(props) {
    let CartNumber;
    if (props.number > 0) {
        CartNumber = <div className='cart-number'><span className='cart-number-text'>{props.number}</span></div>
    }

    return (
        <div className='user-cart-container'>
            <button className='user-cart'>
                <img src={require('../../../icons/cart_grey.png')} className='user-cart-image' alt='cart'></img>
            </button>
            {CartNumber}
        </div>
        
    )
}

function UserLike() {
    return (
        <button className='user-like'>
            <img src={require('../../../icons/heart_grey.png')} className='user-like-image' alt='like'></img>
        </button>
    )
}