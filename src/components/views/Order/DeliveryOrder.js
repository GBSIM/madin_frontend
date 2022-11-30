import './Order.css';
import './DeliveryOrder.css';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { KakaoRedirectHandler, authUser } from '../../library/ui/units/LoginButton/KakaoLogin';

import { login, saveCart, saveName, saveShipping, saveEmail, savePhone } from '../../../_reducers/user';

import Header from '../../library/ui/components/Header/Header';
import OrderSheet from '../../library/ui/units/OrderSheet/OrderSheet';
import ShippingList from '../../library/ui/units/Shipping/ShippingList';
import Orderer from '../../library/ui/units/Orderer/Orderer';

export default function DeliveryOrder() {
    const dispath = useDispatch();

    const { isLogined, name, email, phone, cart, shippings } = useSelector(state => state.user);

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
                dispath(saveEmail(user["email"]));
                dispath(savePhone(user["phone"]));
            });
        }
        authUser().then((user) => {
            if (user) {
                dispath(login());
                dispath(saveName(user["name"]));
                dispath(saveCart(user["cart"]));
                dispath(saveShipping(user["shippings"]));
                dispath(saveEmail(user["email"]));
                dispath(savePhone(user["phone"]));
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
                <ShippingList shippings={shippings}></ShippingList>
                <div style={{'minHeight':'60px'}}></div>
                <Orderer name={name} email={email} phone={phone}></Orderer>
                <div style={{'minHeight':'100px'}}></div>
            </div>
        </div>
    )
}