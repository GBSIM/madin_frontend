import './Menu.css';
import './Cart.css';
import './MenuAddWindow.css';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getCookie } from '../Cookie/Cookie';
import { saveCart } from '../../../../../_reducers/user';
import { SocialLoginBox } from '../LoginButton/LoginButton';

export default function Menu(props) {
    const { isLogined } = useSelector(state => state.user);

    const [isMenuAddWindowDisplayOn, setMenuAddWindowDisplayOn] = useState(false);
    const [isSocialLoginBoxOn, setSocialLoginBoxOn] = useState(false);

    const switchMenuAddWindowDisplay = () => {
        if (isLogined) {
            if (isMenuAddWindowDisplayOn) {
                setMenuAddWindowDisplayOn(false);            
            } else {
                setMenuAddWindowDisplayOn(true);
            } 
        } else {
            setSocialLoginBoxOn(true);   
        }
    }

    const closeSocialLoginBox = () => {
        setSocialLoginBoxOn(false);
    }

    const navigate = useNavigate();
    const moveToMenuDetail = () => {
        navigate('/item/'+props.menuId);
        window.scrollTo(0,0);
    }

    return (
        <div className='menu'>
            <div className='menu-image-container'>
                <button className='menu-image-button' onClick={() => moveToMenuDetail()}>
                    <img className='menu-image' src={props.imageUrl} alt='menu'></img>                
                </button>
                <Cart openMenuAddWindow = {switchMenuAddWindowDisplay}></Cart>
                <SocialLoginBox isOn={isSocialLoginBoxOn} closeEvent={closeSocialLoginBox}></SocialLoginBox>
            </div>
            <span className='menu-name'>{props.name}</span>
            <span className='menu-price'>{props.price.toLocaleString()}원</span>
            <MenuAddWindow 
                isDisplayOn={isMenuAddWindowDisplayOn}
                name={props.name}
                price={props.price}
                menuId={props.menuId}
                closeEvent={switchMenuAddWindowDisplay}></MenuAddWindow>
        </div>
    )
}

function Cart(props) {
    return (
        <button className='cart-button' onClick={() => props.openMenuAddWindow()}>
            <img className='cart-button-image' src={require('../../../icons/cart_white.png')} alt='cart'></img>
        </button>
    )
}

function MenuAddWindow(props) {
    const dispath = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const addQuantity = () => {
        setQuantity(quantity + 1);
    }

    const subtractQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const addCart = async() => {
        const token = getCookie('token');
        if (token) {
            await axios.post('https://api.madinbakery.com/user/cart',{
                "token": token,
                "menuId": props.menuId,
                "quantity": quantity
            }).then((res) => {
                const user = res.data.user;
                dispath(saveCart(user["cart"]));
            });
        }
        props.closeEvent()
    }

    let MinusButtonImage;
    if (quantity === 1) {
        MinusButtonImage = <img className='menu-add-window-quantity-button-image' src={require('../../../icons/minus_grey.png')} alt='deactivated-minus'></img>
    } else {
        MinusButtonImage = <img className='menu-add-window-quantity-button-image' src={require('../../../icons/minus_black.png')} alt='activated-minus'></img>
    }
    
    if (props.isDisplayOn) {
        return (
            <div className='menu-add-window-background'>
                <div className='menu-add-window'>
                    <div className='menu-add-window-info-container'>
                        <span className='menu-add-window-name'>{props.name}</span>
                        <span className='menu-add-window-price'>{props.price.toLocaleString()}원</span>
                    </div>
                    <div style={{'minHeight':'20px'}}></div>
                    <div className='menu-add-window-quantity-container'>
                        <div className='menu-add-window-quantity-controller'>
                            <button className='menu-add-window-quantity-button' onClick={() => subtractQuantity()}>
                                {MinusButtonImage}
                            </button>
                            <span className='menu-add-window-quantity'>{quantity}</span>
                            <button className='menu-add-window-quantity-button' onClick={() => addQuantity()}>
                                <img className='menu-add-window-quantity-button-image' src={require('../../../icons/plus_black.png')} alt='activated-plus'></img>
                            </button>
                        </div>
                    </div>
                    <div style={{'minHeight':'30px'}}></div>
                    <div className='menu-add-window-divider'></div>
                    <div style={{'minHeight':'20px'}}></div>
                    <div className='menu-add-window-info-container'>
                        <span className='menu-add-window-price-title'>합계</span>
                        <h2 className='menu-add-window-total-price'>{(props.price*quantity).toLocaleString()}원</h2>
                    </div>
                    <div style={{'minHeight':'50px'}}></div>
                    <button className='menu-add-window-save-button' onClick={() => {addCart()}}>
                        <span className='menu-add-window-save-button-text'>장바구니에 담기</span>
                    </button>
                    <div style={{'minHeight':'10px'}}></div>
                    <button className='menu-add-window-cancel-button' onClick={() => {props.closeEvent()}}>
                        <span className='menu-add-window-cancel-button-text'>닫기</span>
                    </button>
                </div>
            </div>
        )
    }
}