import './Order.css';
import './DeliveryOrder.css';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { KakaoRedirectHandler, authUser } from '../../library/ui/units/LoginButton/KakaoLogin';

import { login, saveCart, saveName, saveShipping } from '../../../_reducers/user';

import Header from '../../library/ui/components/Header/Header';
import OrderSheet from '../../library/ui/units/OrderSheet/OrderSheet';
import Shipping from '../../library/ui/units/Shipping/Shipping';

export default function DeliveryOrder() {
    const dispath = useDispatch();

    const { isLogined, name, cart, shippings } = useSelector(state => state.user);

    useEffect(() => {
        const href = window.location.href;
        let params = new URL(href).searchParams;
        let code = params.get("code");
        if (code != null) {
            KakaoRedirectHandler().then((user) => {
                dispath(login());
                dispath(saveName(user["name"]));
                dispath(saveCart(user["cart"]));
                dispath(saveShipping(user["shippings"]));
            });
        }
        authUser().then((user) => {
            if (user) {
                dispath(login());
                dispath(saveName(user["name"]));
                dispath(saveCart(user["cart"]));
                dispath(saveShipping(user["shippings"]));
            }
        })
    }, []);

    return (
        <div className='page'>
            <Header isLogined={isLogined} name={name} cartNumber={cart.length}></Header>
            <div className='order-container'>
                <div style={{'minHeight':'60px'}}></div>
                <OrderSheet cart={cart}></OrderSheet>
                <div style={{'minHeight':'60px'}}></div>
                <Shipping shippings={shippings}></Shipping>
                <div style={{'minHeight':'100px'}}></div>
            </div>
        </div>
    )
}