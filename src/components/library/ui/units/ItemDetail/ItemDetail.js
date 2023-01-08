import './ItemDetail.css';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { getCookie } from '../Cookie/Cookie';
import { saveUserInfo } from '../../../../../_reducers/user';

import { SocialLoginBox } from '../LoginButton/LoginButton';

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
                {option["name"]} --- {option["price"].toLocaleString()}원
            </option>
        ))
        menuSelectContainer =
            <select name='option' className='item-detail-option-container' onChange={selectOption}>
                {options}
            </select>
    }

    let typeText;
    let GetType;
    switch(props.type) {
        case "delivery":
            typeText = "배송주문 상품";
            GetType =
                <div className='item-detail-get-type-container'>
                    <span className='item-detail-get-type-title'>배송</span>
                    <div className='item-detail-get-type-right-container'>
                        <span className='item-detail-get-type'>택배배송</span>
                        <span className='item-detail-get-type-intro'>14시 전 주문은 당일 배송 시작</span>
                        <span className='item-detail-get-type-intro'>배송은 하루~이틀 걸려요.</span>
                    </div>
                </div>
            break;
        case "present":
            typeText = "선물주문 상품";
            GetType =
            <div className='item-detail-get-type-container'>
                <span className='item-detail-get-type-title'>선물</span>
                <div className='item-detail-get-type-right-container'>
                    <span className='item-detail-get-type'>퀵 배송</span>
                    <span className='item-detail-get-type-intro'>받으시고 싶은 날짜 최소 일주일 전에 주문해주세요.</span>
                    <span className='item-detail-get-type-intro'>해당 날짜에 퀵으로 보내드려요.</span>
                </div>
            </div>
            break;
        case "pickup":
            typeText = "픽업주문 상품";
            GetType =
            <div className='item-detail-get-type-container'>
                <span className='item-detail-get-type-title'>픽업</span>
                <div className='item-detail-get-type-right-container'>
                    <span className='item-detail-get-type'>가게로 픽업</span>
                    <span className='item-detail-get-type-intro'>주문 시 원하는 날짜와 시간을 선택해주세요.</span>
                    <span className='item-detail-get-type-intro'>시간에 맞춰 가게에 들러주세요.</span>
                </div>
            </div>
            break;
        default:
            typeText = "배송주문 상품";
            GetType =
            <div className='item-detail-get-type-container'>
                <span className='item-detail-get-type-title'>배송</span>
                <div className='item-detail-get-type-right-container'>
                    <span className='item-detail-get-type'>택배배송</span>
                    <span className='item-detail-get-type-intro'>14시 전 주문은 당일 배송 시작</span>
                    <span className='item-detail-get-type-intro'>배송은 하루~이틀 걸려요.</span>
                </div>
            </div>
    }

    let MenuAddAlarm;
    if (isMenuAddAlarmOn) {
        MenuAddAlarm =
            <div className='item-detail-menu-add-alarm'>
                <span className='item-detail-menu-add-alarm-text'>{props.name} {quantity}개를 담았어요. </span>
            </div>
    }

    let itemPrice;
    if (price === 0) {
        itemPrice = <h2 className='item-detail-price'>{props.price.toLocaleString()}원</h2>
    } else {
        itemPrice = <h2 className='item-detail-price'>{price.toLocaleString()}원</h2>
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
                            <span className='item-detail-cart-title'>상품담기</span>
                            <div className='item-detail-quantity-controller'>
                                {MinusButton}
                                <span className='item-detail-quantity'>{quantity}</span>
                                <button className='item-detail-quantity-button' onClick={() => addQuantity()}>
                                    <img src={require('../../../icons/plus_black.png')} className='item-detail-quantity-button' alt='plus'></img>
                                </button>
                            </div>
                        </div>
                        <div className='item-detail-cart-price-container'>
                            <h2 className='item-detail-cart-price'>{totalPrice.toLocaleString()}원</h2>
                        </div>
                        <button className='item-detail-cart-button' onClick={() => {addCart()}}>
                            <span className='item-detail-cart-button-text'>장바구니 담기</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='item-detail-tip-container'>
                <h2 className='item-detail-tip-title'>맛있게 먹는 법</h2>
                <div className='item-detail-tips'>
                    <span className='item-detail-tip'>배송 받으신 후 바로, 또는 그 다음 날까지 먹어야 가장 맛있어요.</span>
                    <span className='item-detail-tip'>3일 이상 보관 후 드실 분들은 냉동실에 보관 후 해동해서 드세요.</span>
                </div>
            </div>
            <div className='item-detail-mobile-cart-button-container'>
                <button className='item-detail-mobile-cart-button' onClick={() => {addCart()}}>
                    <h3 className='item-detail-mobile-cart-button-text'>장바구니 담기</h3>
                </button>
            </div>
            <SocialLoginBox 
                isOn={isSocialLoginBoxDisplayOn}
                closeEvent={closeSocialLoginBox}></SocialLoginBox>
            {MenuAddAlarm}
        </div>
    )
}