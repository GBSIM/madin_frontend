import './DeliveryCart.css';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { saveName, saveCart, login } from '../../../_reducers/user';
import { authUser, KakaoRedirectHandler } from '../../library/ui/units/LoginButton/KakaoLogin';

import Header from '../../library/ui/components/Header/Header';
import Cart from '../../library/ui/units/Cart/Cart';

export default function DeliveryCart() {
    const dispath = useDispatch();
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
            }
        })
    }, []);

    return (
        <div className='page'>
            <Header isLogined={isLogined} name={name} cartNumber={cart.length}></Header>
            <div style={{'minHeight':'60px'}}></div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    )
}