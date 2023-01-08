import './Cart.css';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getCookie } from '../Cookie/Cookie';
import { saveCart } from '../../../../../_reducers/user';

import CartMenu from './CartMenu';

export default function Cart(props) {
    const navigate = useNavigate();
    const dispath = useDispatch();

    let isAllChecked = true;
    props.cart.map((menu) => {
        if (!menu["isChecked"]) {
            isAllChecked = false;
        }
    })

    let isNoMenu = false;
    if (props.cart) {
        if (props.cart.length === 0) {
            isAllChecked = false;
            isNoMenu = true;
        }
    }

    let CartAddGuide;
    if (isNoMenu) {
        CartAddGuide =
            <div className='cart-add-guide'>
                <span className='cart-add-guide-text'>
                    장바구니에 상품을 담아주세요.
                </span>
            </div>
    }

    const setAllMenusChecked = async() => {
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

    const setAllMenusUnchecked = async() => {
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

    let AllMenusSelectButton;
    if (!isAllChecked) {
        AllMenusSelectButton = 
            <button className='cart-all-select-button' onClick={()=>setAllMenusChecked()}>
                <img className='cart-all-select-button-image' 
                    alt='check' 
                    src={require('../../../icons/check_grey.png')}></img>
                <span className='cart-all-select-button-text'>전체선택</span>
            </button>
    } else {
        AllMenusSelectButton = 
        <button className='cart-all-select-button' onClick={()=>setAllMenusUnchecked()}>
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
            option={menu["option"]}
            key={'cart_menu_'+String(index)}></CartMenu>
    ))

    let totalPrice = 0;
    props.cart.map((menu) => {
        if (menu["isChecked"]) {
            if (menu["option"]["name"] === "basic") {
                totalPrice = totalPrice + menu["price"] * menu["quantity"];
            } else {
                totalPrice = totalPrice + menu["option"]["price"] * menu["quantity"];
            }
        }
    })

    const moveToOrder = () => {
        navigate('/order');
        window.scrollTo(0,0);
    }

    let CartOrderButton;
    if (totalPrice > 0) {
        CartOrderButton = 
        <button className='cart-order-button' onClick={() => moveToOrder()}>
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
                {AllMenusSelectButton}
            </div>
            <div style={{'minHeight':'10px'}}></div>
            <div style={{'width':'100%','minHeight':'1px','background':'#c6c6c6'}}></div>
            {CartAddGuide}
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