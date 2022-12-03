import './UserButton.css';
import './UserMenus.css';
import './UserCart.css';
import './UserLike.css';
import './MobileUserCart.css';

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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const moveToUser = (detailPage) => {
        dispatch(changePage('user'));
        navigate('/user/'+detailPage);
        window.scrollTo(0,0);
    }

    if (props.isOn) {
        return (
            <div className='user-menus'>
                <UserMenuButton text='주문내역' clickEvent={moveToUser} clickEventInput='order'></UserMenuButton>
                <UserMenuButton text='배송지 관리' clickEvent={moveToUser} clickEventInput='shipping'></UserMenuButton>
                <UserMenuButton text='쿠폰' clickEvent={moveToUser} clickEventInput='coupon'></UserMenuButton>
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
    const navigate = useNavigate();
    const moveToCart = () => {
        let cartName;
        switch (window.location.pathname) {
            case "/":
                cartName='delivery';
                break;
            case "/main":
                cartName='delivery';
                break;
            case "/present":
                cartName='present';
                break;
            case "/pickup":
                cartName='pickup';
                break;
            default:
                cartName='delivery';   
        }
        
        navigate('/cart/'+cartName);
        window.scrollTo(0,0);
    }
    let CartNumber;
    if (props.number > 0) {
        CartNumber = 
            <button className='cart-number' onClick={() => moveToCart()}>
                <span className='cart-number-text'>
                    {props.number}
                </span>
            </button>
    }

    return (
        <div className='user-cart-container'>
            <button className='user-cart' onClick={() => moveToCart()}>
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

export function MobileUserCart(props) {
    const navigate = useNavigate();
    const moveToCart = () => {
        let cartName;
        switch (window.location.pathname) {
            case "/":
                cartName='delivery';
                break;
            case "/main":
                cartName='delivery';
                break;
            case "/present":
                cartName='present';
                break;
            case "/pickup":
                cartName='pickup';
                break;
            default:
                cartName='delivery';   
        }
        
        navigate('/cart/'+cartName);
        window.scrollTo(0,0);
    }
    let CartNumber;
    if (props.number > 0) {
        CartNumber = 
            <button className='mobile-cart-number' onClick={() => moveToCart()}>
                <span className='mobile-cart-number-text'>
                    {props.number}
                </span>
            </button>
    }

    return (
        <div className='mobile-user-cart-container'>
            <button className='mobile-user-cart' onClick={() => moveToCart()}>
                <img src={require('../../../icons/mobile_cart_grey.png')} className='mobile-user-cart-image' alt='cart'></img>
            </button>
            {CartNumber}
        </div>
    )
}