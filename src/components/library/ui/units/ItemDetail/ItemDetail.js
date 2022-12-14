import './ItemDetail.css';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { getCookie } from '../Cookie/Cookie';
import { saveUserInfo } from '../../../../../_reducers/user';

import SocialLoginBox from '../LoginButton/SocialLoginBox';

export default function ItemDetail(props) {
    const dispath = useDispatch();

    const [ quantity, setQuantity ] = useState(1);
    const [ isSocialLoginBoxDisplayOn, setSocialLoginBoxDisplayOn ] = useState(false);
    const [isMenuAddAlarmOn, setMenuAddAlarmOn] = useState(false);
    const [option, setOption] = useState({"name":"basic","price":0});
    const [price, setPrice] = useState(props.price);

    let totalPrice;
    if (price > 0) {
        totalPrice = quantity * price;
    } else {
        totalPrice = quantity * props.price;
    }

    const addQuantity = () => {
        setQuantity(quantity + 1);
    }

    const subtractQuantity = () => {
        if (quantity > 1) setQuantity(quantity-1);
    }

    const addCart = async() => {
        const token = getCookie('token');
        if (token) {
            let itemOption;
            if (option["name"] === "basic" && props.options.length) {
                itemOption = props.options[0];
            } else {
                itemOption = option;
            }
            await axios.post('https://api.madinbakery.com/user/cart',{
                "token": token,
                "menuId": props.menuId,
                "quantity": quantity,
                "option": itemOption
            }).then((res) => {
                const user = res.data.user;
                dispath(saveUserInfo(user));
                setMenuAddAlarmOn(true);
                setTimeout(() => setMenuAddAlarmOn(false),2000);
            });
        } else {
            setSocialLoginBoxDisplayOn(true);
        }
    }

    const closeSocialLoginBox = () => {
        setSocialLoginBoxDisplayOn(false);
    }

    const { likes } = useSelector(state => state.user);

    let isLiked = false;
    if (likes.includes(props.menuId)) isLiked = true;

    const likeMenu = async() => {
        const token = getCookie('token');
        if (token) {
            await axios.post('https://api.madinbakery.com/user/like',{
                "token": token,
                "menuId": props.menuId, 
            }).then((res) => {
                const user = res.data.user;
                dispath(saveUserInfo(user));
            });
        } else {
            setSocialLoginBoxDisplayOn(true);
        }
    }

    const unlikeMenu = async() => {
        const token = getCookie('token');
        if (token) {
            await axios.delete('https://api.madinbakery.com/user/like',{
                data: {
                    "token": token,
                    "menuId": props.menuId
                }
            }).then((res) => {
                const user = res.data.user;
                dispath(saveUserInfo(user));
            });
        } else {
            setSocialLoginBoxDisplayOn(true);
        }
    }

    let LikeButton;
    if (isLiked) {
        LikeButton =
            <button className='item-like-button' onClick={() => unlikeMenu()}>
                <img className='item-like-button-image' src={require('../../../icons/heart_red.png')} alt='like'></img>
            </button>
    } else {
        LikeButton =
        <button className='item-like-button' onClick={() => likeMenu()}>
            <img className='item-like-button-image' src={require('../../../icons/heart_grey.png')} alt='like'></img>
        </button>   
    }

    let MinusButton;
    if (quantity > 1) {
        MinusButton = 
            <button className='item-detail-quantity-button' onClick={() => subtractQuantity()}>
                <img src={require('../../../icons/minus_black.png')} className='item-detail-quantity-button' alt='minus'></img>
            </button>
    } else {
        MinusButton =
            <button className='item-detail-quantity-button'>
                <img src={require('../../../icons/minus_grey.png')} className='item-detail-quantity-button' alt='minus'></img>
            </button>
    }

    const selectOption = (e) => {
        setOption(
            {"name":props.options[e.target.selectedIndex]["name"],
             "price":props.options[e.target.selectedIndex]["price"]});
        setPrice(props.options[e.target.selectedIndex]["price"]);
    }

    let menuSelectContainer;
    if (props.options && Array.isArray(props.options) && props.options.length) {
        const options = props.options.map((option) => (
            <option 
                className='item-detail-option'
                value={option["name"]} 
                key={option["name"]}>
                {option["name"]} --- {option["price"].toLocaleString()}???
            </option>
        ))
        menuSelectContainer =
            <select name='option' className='item-detail-option-container' onChange={selectOption}>
                {options}
            </select>
    }

    let typeText;
    let GetType;
    let typeTitle;
    let type;
    let typeIntro1;
    let typeIntro2;
    switch(props.type) {
        case "delivery":
            typeTitle = "??????"
            type = "????????????";
            typeIntro1 = "14??? ??? ????????? ?????? ?????? ??????";
            typeIntro2 = "????????? ??????~?????? ?????????.";
            typeText = "???????????? ??????";
            break;
        case "present":
            typeTitle = "??????"
            type = "??? ??????";
            typeIntro1 = "???????????? ?????? ?????? ?????? ????????? ?????? ??????????????????.";
            typeIntro2 = "?????? ????????? ????????? ???????????????.";
            typeText = "???????????? ??????";
            break;
        case "pickup":
            typeTitle = "??????"
            type = "????????? ??????";
            typeIntro1 = "?????? ??? ????????? ????????? ????????? ??????????????????.";
            typeIntro2 = "????????? ?????? ????????? ???????????????.";
            typeText = "???????????? ??????";
            break;
        default:
            typeTitle = "??????"
            type = "????????????";
            typeIntro1 = "14??? ??? ????????? ?????? ?????? ??????";
            typeIntro2 = "????????? ??????~?????? ?????????.";
            typeText = "???????????? ??????";
    }

    GetType =
        <div className='item-detail-get-type-container'>
            <span className='item-detail-get-type-title'>{typeTitle}</span>
            <div className='item-detail-get-type-right-container'>
                <span className='item-detail-get-type'>{type}</span>
                <span className='item-detail-get-type-intro'>{typeIntro1}</span>
                <span className='item-detail-get-type-intro'>{typeIntro2}</span>
            </div>
        </div>

    let MenuAddAlarm;
    if (isMenuAddAlarmOn) {
        MenuAddAlarm =
            <div className='item-detail-menu-add-alarm'>
                <span className='item-detail-menu-add-alarm-text'>{props.name} {quantity}?????? ????????????. </span>
            </div>
    }

    let itemPrice;
    if (price === 0) {
        itemPrice = <h2 className='item-detail-price'>{props.price.toLocaleString()}???</h2>
    } else {
        itemPrice = <h2 className='item-detail-price'>{price.toLocaleString()}???</h2>
    }

    return (
        <div className='item-detail'>
            <img src={props.image} alt='menu' className='item-detail-mobile-image'></img>
            <div className='item-detail-top-container'>
                <img src={props.image} className='item-detail-image' alt='menu'></img>
                <div className='item-detail-top-contents-container'>
                    <span className='item-detail-type'>{typeText}</span>
                    <div style={{'minHeight':'3px'}}></div>
                    <div className='item-detail-name-container'>
                        <h2 className='item-detail-name'>{props.name}</h2>
                        {LikeButton}
                    </div>
                    <div className='item-detail-price-container'>
                        {menuSelectContainer}
                        <span className='item-detail-intro'>{props.intro}</span>
                        {itemPrice}
                    </div>
                    {GetType}
                    <div className='item-detail-cart-container'>
                        <div className='item-detail-cart-quantity-container'>
                            <span className='item-detail-cart-title'>????????????</span>
                            <div className='item-detail-quantity-controller'>
                                {MinusButton}
                                <span className='item-detail-quantity'>{quantity}</span>
                                <button className='item-detail-quantity-button' onClick={() => addQuantity()}>
                                    <img src={require('../../../icons/plus_black.png')} className='item-detail-quantity-button' alt='plus'></img>
                                </button>
                            </div>
                        </div>
                        <div className='item-detail-cart-price-container'>
                            <h2 className='item-detail-cart-price'>{totalPrice.toLocaleString()}???</h2>
                        </div>
                        <button className='item-detail-cart-button' onClick={() => {addCart()}}>
                            <span className='item-detail-cart-button-text'>???????????? ??????</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='item-detail-tip-container'>
                <h2 className='item-detail-tip-title'>????????? ?????? ???</h2>
                <div className='item-detail-tips'>
                    <span className='item-detail-tip'>?????? ????????? ??? ??????, ?????? ??? ?????? ????????? ????????? ?????? ????????????.</span>
                    <span className='item-detail-tip'>3??? ?????? ?????? ??? ?????? ????????? ???????????? ?????? ??? ???????????? ?????????.</span>
                </div>
            </div>
            <div className='item-detail-mobile-cart-button-container'>
                <button className='item-detail-mobile-cart-button' onClick={() => {addCart()}}>
                    <h3 className='item-detail-mobile-cart-button-text'>???????????? ??????</h3>
                </button>
            </div>
            <SocialLoginBox 
                isOn={isSocialLoginBoxDisplayOn}
                closeEvent={closeSocialLoginBox}></SocialLoginBox>
            {MenuAddAlarm}
        </div>
    )
}