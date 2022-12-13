import './ItemDetail.css';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { getCookie } from '../Cookie/Cookie';
import { saveCart } from '../../../../../_reducers/user';

export default function ItemDetail(props) {
    const dispath = useDispatch();
    const [ quantity, setQuantity ] = useState(1);
    const [ isCartAddWindowOpen, setCartAddWindowOpen ] = useState(false);
    
    let totalPrice = quantity * props.price;
    const addQuantity = () => {
        setQuantity(quantity + 1);
    }
    const subtractQuantity = () => {
        if (quantity > 1) setQuantity(quantity-1);
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

    let MinusButton;
    if (quantity > 1) {
        MinusButton = 
            <button className='item-detail-quantity-button' onClick={() => subtractQuantity()}>
                <img src={require('../../../icons/minus_black.png')} className='item-detail-quantity-button'></img>
            </button>
    } else {
        MinusButton =
            <button className='item-detail-quantity-button'>
                <img src={require('../../../icons/minus_grey.png')} className='item-detail-quantity-button'></img>
            </button>
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
                <span className='item-detail-get-type-title'>배송</span>
                <div className='item-detail-get-type-right-container'>
                    <span className='item-detail-get-type'>택배배송</span>
                    <span className='item-detail-get-type-intro'>14시 전 주문은 당일 배송 시작</span>
                    <span className='item-detail-get-type-intro'>배송은 하루~이틀 걸려요.</span>
                </div>
            </div>
            break;
        case "pickup":
            typeText = "픽업주문 상품";
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
                        <button className='item-like-button'>
                            <img className='item-like-button-image' src={require('../../../icons/heart_black.png')}></img>
                        </button>
                    </div>
                    <div className='item-detail-price-container'>
                        <span className='item-detail-intro'>{props.intro}</span>
                        <h2 className='item-detail-price'>{props.price.toLocaleString()}원</h2>
                    </div>
                    {GetType}
                    <div className='item-detail-cart-container'>
                        <div className='item-detail-cart-quantity-container'>
                            <span className='item-detail-cart-title'>상품담기</span>
                            <div className='item-detail-quantity-controller'>
                                {MinusButton}
                                <span className='item-detail-quantity'>{quantity}</span>
                                <button className='item-detail-quantity-button' onClick={() => addQuantity()}>
                                    <img src={require('../../../icons/plus_black.png')} className='item-detail-quantity-button'></img>
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
                <button className='item-detail-mobile-cart-button'>
                    <span className='item-detail-mobile-cart-button-text'>장바구니 담기</span>
                </button>
            </div>
        </div>
    )
}