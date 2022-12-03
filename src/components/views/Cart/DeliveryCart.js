import './Cart.css';
import './DeliveryCart.css';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { saveName, saveCart, login, logout } from '../../../_reducers/user';
import { authUser, KakaoRedirectHandler } from '../../library/ui/units/LoginButton/KakaoLogin';
import { changePage } from '../../../_reducers/nav'

import Header from '../../library/ui/components/Header/Header';
import Cart from '../../library/ui/units/Cart/Cart';

export default function DeliveryCart() {
    const dispath = useDispatch();
    const navigate = useNavigate();
    const moveToMain = () => {
        dispath(changePage('main'));
        navigate('/main');
        window.scrollTo(0,0);
    }
    const { isLogined, name, cart } = useSelector(state => state.user);

    useEffect(() => {
        const href = window.location.href;
        let params = new URL(href).searchParams;
        let code = params.get("code");
        if (code != null) {
            KakaoRedirectHandler().then((user) => {
                dispath(login());
                dispath(saveName(user["name"]));
                dispath(saveCart(user["cart"]));
            });
        }
        authUser().then((user) => {
            if (user) {
                dispath(login());
                dispath(saveName(user["name"]));
                dispath(saveCart(user["cart"]));
            } else {
                dispath(logout());
                moveToMain();
            }
        })
    }, []);

    return (
        <div className='page'>
            <Header isLogined={isLogined} name={name} cartNumber={cart.length}></Header>
            <div className='delivery-cart-top-spacer'></div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    )
}