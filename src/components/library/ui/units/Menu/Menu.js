import './Menu.css';
import './Cart.css';
import './MenuAddWindow.css';

import { useState, useEffect } from 'react';
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

    let priceText;
    if (props.options && Array.isArray(props.options) && props.options.length) {
        const maxPriceObj = props.options.reduce( (prev, value) => {
            return prev.price >= value.price ? prev : value
        });
        const maxPrice = maxPriceObj["price"];
        const minPriceObj = props.options.reduce( (prev, value) => {
            return prev.price < value.price ? prev : value
        });
        const minPrice = minPriceObj["price"];
        priceText = <span className='menu-price'>{minPrice.toLocaleString()} ~ {maxPrice.toLocaleString()}원</span>
    } else {
        priceText = <span className='menu-price'>{props.price.toLocaleString()}원</span>
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
            {priceText}
            <MenuAddWindow 
                isDisplayOn={isMenuAddWindowDisplayOn}
                name={props.name}
                price={props.price}
                menuId={props.menuId}
                options={props.options}
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

export function MenuAddWindow(props) {
    const dispath = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [isMenuAddAlarmOn, setMenuAddAlarmOn] = useState(false);
    const [option, setOption] = useState("basic");
    const [price, setPrice] = useState(props.price);

    useEffect(() => {
        if (props.options && Array.isArray(props.options) && props.options.length) {
            setOption(props.options[0]["name"]);
            setPrice(props.options[0]["price"]);
        }
    }, []);

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
                "quantity": quantity,
                "option": option,
            }).then((res) => {
                const user = res.data.user;
                dispath(saveCart(user["cart"]));
                setMenuAddAlarmOn(true);
                setTimeout(() => setMenuAddAlarmOn(false),2000);
            });
        }
        props.closeEvent()
    }

    const selectOption = (e) => {
        setOption(props.options[e.target.selectedIndex]["name"]);
        setPrice(props.options[e.target.selectedIndex]["price"]);

    }

    let MinusButtonImage;
    if (quantity === 1) {
        MinusButtonImage = <img className='menu-add-window-quantity-button-image' src={require('../../../icons/minus_grey.png')} alt='deactivated-minus'></img>
    } else {
        MinusButtonImage = <img className='menu-add-window-quantity-button-image' src={require('../../../icons/minus_black.png')} alt='activated-minus'></img>
    }

    let menuSelectContainer;
    let menuInfo;
    if (props.options && Array.isArray(props.options) && props.options.length) {
        const options = props.options.map((option) => (
            <option 
                className='menu-add-window-option'
                value={option["name"]} 
                key={option["name"]}>
                {option["name"]} --- {option["price"].toLocaleString()}원
            </option>
        ))
        menuSelectContainer =
            <select name='option' className='menu-add-window-option-container' onChange={selectOption}>
                {options}
            </select>
        menuInfo = 
            <div className='menu-add-window-info-container'>
                <span className='menu-add-window-name'>{props.name} {option}</span>
                <span className='menu-add-window-price'>{price.toLocaleString()}원</span>
            </div>
    } else {
        menuInfo = 
            <div className='menu-add-window-info-container'>
                <span className='menu-add-window-name'>{props.name}</span>
                <span className='menu-add-window-price'>{price.toLocaleString()}원</span>
            </div>
    }
    
    let AddWindow;
    if (props.isDisplayOn) {
        AddWindow = 
            <div className='menu-add-window-background'>
                <div className='menu-add-window'>
                    {menuSelectContainer}
                    <div style={{'minHeight':'20px'}}></div>
                    {menuInfo}
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
                        <h2 className='menu-add-window-total-price'>{(price*quantity).toLocaleString()}원</h2>
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
    }

    let MenuAddAlarm;
    if (isMenuAddAlarmOn) {
        MenuAddAlarm =
            <div className='menu-add-alarm'>
                <span className='menu-add-alarm-text'>{props.name} {quantity}개를 담았어요. </span>
            </div>
    } else {
        MenuAddAlarm =
            <div className='menu-add-alarm off'>
                <span className='menu-add-alarm-text'>{props.name} {quantity}개를 담았어요. </span>
            </div>
    }

    return (
        <div>
            {AddWindow}
            {MenuAddAlarm}
        </div>
    )
}