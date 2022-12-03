import './Order.css';
import './DeliveryOrder.css';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { KakaoRedirectHandler, authUser } from '../../library/ui/units/LoginButton/KakaoLogin';

import { login, logout, saveCart, saveName, saveShipping, saveEmail, savePhone } from '../../../_reducers/user';
import { changePage } from '../../../_reducers/nav'

import Header from '../../library/ui/components/Header/Header';
import OrderSheet from '../../library/ui/units/OrderSheet/OrderSheet';
import ShippingList from '../../library/ui/units/Shipping/ShippingList';
import Orderer from '../../library/ui/units/Orderer/Orderer';

export default function DeliveryOrder() {
    const dispath = useDispatch();

    const { isLogined, name, email, phone, cart, shippings } = useSelector(state => state.user);
    const navigate = useNavigate();
    const moveToMain = () => {
        dispath(changePage('main'));
        navigate('/main');
        window.scrollTo(0,0);
    }

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
            } else {
                dispath(logout());
                moveToMain();
            }
        })
    }, []);

    return (
        <div className='page'>
            <Header isLogined={isLogined} name={name} cartNumber={cart.length}></Header>
            <div className='order-container'>
                <OrderSheet cart={cart}></OrderSheet>
                <ShippingList shippings={shippings}></ShippingList>
                <Orderer name={name} email={email} phone={phone}></Orderer>                
            </div>
        </div>
    )
}