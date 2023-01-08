import './CartMenu.css';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { getCookie } from '../Cookie/Cookie';
import { saveCart } from '../../../../../_reducers/user';

import CartMenuDeleteWindow from './CartMenuDeleteWindow';

export default function CartMenu(props) {
    const dispath = useDispatch();
    const [isDeleteWindowOn, setDeleteWindowOn] = useState(false);

    const addQuantity = async() => {
        const token = getCookie('token');
        if (token) {
            await axios.post('https://api.madinbakery.com/user/cart',{
                "token": token,
                "menuId": props.id,
                "quantity": 1,
                "option": props.option,
            }).then((res) => {
                const user = res.data.user;
                dispath(saveCart(user["cart"]));
            });
        }
    }

    const subtractQuantity = async() => {
        const token = getCookie('token');
        if (token) {
            await axios.post('https://api.madinbakery.com/user/cart',{
                "token": token,
                "menuId": props.id,
                "quantity": -1,
                "option": props.option,
            }).then((res) => {
                const user = res.data.user;
                dispath(saveCart(user["cart"]));
            });
        }
    }

    const openDeleteWindow = () => {
        setDeleteWindowOn(true);
    }

    const closeDeleteWindow = () => {
        setDeleteWindowOn(false);
    }

    const resetChecked = async() => {
        const token = getCookie('token');
        if (token) {
            await axios.patch('https://api.madinbakery.com/user/cart',{
                "token": token,
                "menuId": props.id,
                "isChecked": false
            }).then((res) => {
                const user = res.data.user;
                dispath(saveCart(user["cart"]));
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const setChecked = async() => {
        const token = getCookie('token');
        if (token) {
            await axios.patch('https://api.madinbakery.com/user/cart',{
                "token": token,
                "menuId": props.id,
                "isChecked": true
            }).then((res) => {
                const user = res.data.user;
                dispath(saveCart(user["cart"]));
            });
        }
    }

    let CheckButton;
    if (props.isChecked) {
        CheckButton = 
            <button className='cart-menu-select-button' onClick={() => resetChecked()}>
                <img className='cart-menu-select-button-image' alt='check' src={require('../../../icons/check_orange.png')}></img>
            </button>
    } else {
        CheckButton = 
            <button className='cart-menu-select-button' onClick={() => setChecked()}>
                <img className='cart-menu-select-button-image' alt='check' src={require('../../../icons/check_grey.png')}></img>
            </button>
    }

    let MinusButton;
    if (props.quantity === 1) {
        MinusButton = 
            <button className='cart-menu-quantity-button'>
                <img className='cart-menu-quantity-button-image' alt='activated-minus' src={require('../../../icons/minus_grey.png')}></img>
            </button>
    } else {
        MinusButton = 
            <button className='cart-menu-quantity-button' onClick={() => subtractQuantity()}>
                <img className='cart-menu-quantity-button-image' alt='activated-minus' src={require('../../../icons/minus_black.png')}></img>
            </button>
    }

    let menuName;
    let menuPrice;
    if (props.option["name"] !== "basic") {
        menuName = <span className='cart-menu-name'>{props.name} {props.option["name"]}</span>
        menuPrice =
            <h3 className='cart-menu-price'>
                {(props.option["price"]).toLocaleString()}원
            </h3>
    } else {
        menuName = <span className='cart-menu-name'>{props.name}</span>
        menuPrice =
            <h3 className='cart-menu-price'>
                {(props.price*props.quantity).toLocaleString()}원
            </h3>
    }

    return (
        <div className='cart-menu'>
            {CheckButton}
            <div className='cart-menu-horizontal-spacer'></div>
            <img className='cart-menu-image' alt='menu' src={props.image}></img>
            <div className='cart-menu-horizontal-spacer'></div>
            {menuName}
            <div style={{'flex':'1'}}></div>
            <div className='cart-menu-horizontal-spacer'></div>
            <div className='cart-menu-right-container'>
                <div className='cart-menu-quantity-controller'>
                    {MinusButton}
                    <span className='cart-menu-quantity'>{props.quantity}</span>
                    <button className='cart-menu-quantity-button' onClick={() => addQuantity()}>
                        <img className='cart-menu-quantity-button-image' alt='activated-plus' src={require('../../../icons/plus_black.png')}></img>
                    </button>
                </div>
                <div style={{'minHeight':'5px'}}></div>
                {menuPrice}
            </div>
            <button className='cart-menu-delete-button' onClick={() => openDeleteWindow()}>
                <span className='cart-menu-delete-button-text'>삭제하기</span>
            </button>
            <CartMenuDeleteWindow 
                isOn={isDeleteWindowOn} 
                closeEvent={closeDeleteWindow}
                id={props.id}
                option={props.option}></CartMenuDeleteWindow>
        </div>
    )
}