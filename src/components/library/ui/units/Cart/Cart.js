import './Cart.css';
import './CartMenu.css';
import './DeleteWindow.css';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { getCookie } from '../Cookie/Cookie';
import { saveCart } from '../../../../../_reducers/user';

export default function Cart(props) {
    const dispath = useDispatch();
    let isAllChecked = true;
    props.cart.map((menu) => {
        if (!menu["isChecked"]) {
            isAllChecked = false;
        }
    })

    const setAllChecked = async() => {
        const token = getCookie('token');
        if (token) {
            await axios.patch('https://api.madinbakery.com/user/cart',{
                "token": token,
                "isChecked": true,
                "isAllMenus": true
            }).then((res) => {
                const user = res.data.user;
                dispath(saveCart(user["cart"]));
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const setAllUnchecked = async() => {
        const token = getCookie('token');
        if (token) {
            await axios.patch('https://api.madinbakery.com/user/cart',{
                "token": token,
                "isChecked": false,
                "isAllMenus": true
            }).then((res) => {
                const user = res.data.user;
                dispath(saveCart(user["cart"]));
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    let AllSelectButton;
    if (!isAllChecked) {
        AllSelectButton = 
            <button className='cart-all-select-button' onClick={()=>setAllChecked()}>
                <img className='cart-all-select-button-image' 
                    alt='check' 
                    src={require('../../../icons/check_grey.png')}></img>
                <span className='cart-all-select-button-text'>전체선택</span>
            </button>
    } else {
        AllSelectButton = 
        <button className='cart-all-select-button' onClick={()=>setAllUnchecked()}>
            <img className='cart-all-select-button-image' 
                alt='check' 
                src={require('../../../icons/check_orange.png')}></img>
            <span className='cart-all-select-button-text'>전체선택</span>
        </button>
    }
    

    const CartMenus = props.cart.map((menu,index) => (
        <CartMenu
            isChecked={menu["isChecked"]}
            name={menu["name"]}
            price={menu["price"]}
            image={menu["imageUrl"]}
            id={menu["_id"]}
            quantity={menu["quantity"]}
            key={'cart_menu_'+String(index)}></CartMenu>
    ))

    let totalPrice = 0;
    props.cart.map((menu) => {
        if (menu["isChecked"]) {
            totalPrice = totalPrice + menu["price"] * menu["quantity"];
        }
    })

    let CartOrderButton;
    if (totalPrice > 0) {
        CartOrderButton = 
        <button className='cart-order-button'>
            <span className='cart-order-button-text'>주문하기</span>
        </button>
    } else {
        CartOrderButton =
        <button className='cart-order-button deactivated'>
            <span className='cart-order-button-text'>주문하기</span>
        </button>
    }

    return (
        <div className='cart'>
            <h1 className='cart-title'>장바구니</h1>
            <div style={{'minHeight':'30px'}}></div>
            <div className='cart-all-select-button-container'>
                {AllSelectButton}
            </div>
            <div style={{'minHeight':'10px'}}></div>
            <div style={{'width':'100%','minHeight':'1px','background':'#c6c6c6'}}></div>
            {CartMenus}
            <div style={{'minHeight':'20px'}}></div>
            <div className='cart-order-button-container'>
                <h2 className='cart-total-price'>총 {totalPrice.toLocaleString()}원</h2>
                <div style={{'minWidth':'15px'}}></div>
                {CartOrderButton}
            </div>
            <div style={{'minHeight':'100px'}}></div>
            
        </div>
    )
}

function CartMenu(props) {
    const dispath = useDispatch();
    const [isDeleteWindowOn, setDeleteWindowOn] = useState(false);

    const addQuantity = async() => {
        const token = getCookie('token');
        if (token) {
            await axios.post('https://api.madinbakery.com/user/cart',{
                "token": token,
                "menuId": props.id,
                "quantity": 1
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
                "quantity": -1
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
    return (
        <div className='cart-menu'>
            {CheckButton}
            <div style={{'minWidth':'20px'}}></div>
            <img className='cart-menu-image' alt='menu' src={props.image}></img>
            <div style={{'minWidth':'20px'}}></div>
            <span className='cart-menu-name'>{props.name}</span>
            <div style={{'flex':'1'}}></div>
            <div className='cart-menu-right-container'>
                <div className='cart-menu-quantity-controller'>
                    {MinusButton}
                    <span className='cart-menu-quantity'>{props.quantity}</span>
                    <button className='cart-menu-quantity-button' onClick={() => addQuantity()}>
                        <img className='cart-menu-quantity-button-image' alt='activated-plus' src={require('../../../icons/plus_black.png')}></img>
                    </button>
                </div>
                <div style={{'minHeight':'5px'}}></div>
                <h3 className='cart-menu-price'>
                    {(props.price*props.quantity).toLocaleString()}원
                </h3>
            </div>
            <button className='cart-menu-delete-button' onClick={() => openDeleteWindow()}>
                <span className='cart-menu-delete-button-text'>삭제하기</span>
            </button>
            <DeleteWindow 
                isOn={isDeleteWindowOn} 
                closeEvent={closeDeleteWindow}
                id={props.id}></DeleteWindow>
        </div>
    )
}

function DeleteWindow(props) {
    const dispath = useDispatch();
    const deleteMenu = async() => {
        const token = getCookie('token');
        if (token) {
            await axios.delete('https://api.madinbakery.com/user/cart',{
                data: {
                    "token": token,
                    "menuId": props.id
                }
            }).then((res) => {
                console.log(res);
                const user = res.data.user;
                dispath(saveCart(user["cart"]));
                props.closeEvent();
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    if (props.isOn) {
        return (
            <div className='delete-window-container'>
                <div className='delete-window'>
                    <span className='delete-window-guide'>장바구니에서 삭제하시겠어요?</span>
                    <div style={{'minHeight':'60px'}}></div>
                    <button className='delete-window-delete-button' onClick={() => deleteMenu()}>
                        <span className='delete-window-delete-button-text'>삭제하기</span>
                    </button>
                    <div style={{'minHeight':'10px'}}></div>
                    <button className='delete-window-cancel-button' onClick={() => {props.closeEvent()}}>
                        <span className='delete-window-cancel-button-text'>닫기</span>
                    </button>
                </div>
            </div>
        )        
    }
}