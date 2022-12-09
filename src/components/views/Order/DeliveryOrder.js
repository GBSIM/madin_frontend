import './Order.css';
import './DeliveryOrder.css';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { KakaoRedirectHandler, authUser } from '../../library/ui/units/LoginButton/KakaoLogin';

import { login, logout, saveUserInfo } from '../../../_reducers/user';
import { changePage } from '../../../_reducers/nav'

import Header from '../../library/ui/components/Header/Header';
import OrderSheet from '../../library/ui/units/OrderSheet/OrderSheet';
import ShippingList from '../../library/ui/units/Shipping/ShippingList';
import Orderer from '../../library/ui/units/Orderer/Orderer';
import Payment from '../../library/ui/units/Payment/Payment';
import OrderButton from '../../library/ui/units/OrderButton/OrderButton';

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
                dispath(saveUserInfo(user));
            });
        }
        authUser().then((user) => {
            if (user) {
                dispath(login());
                dispath(saveUserInfo(user));
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
                <Payment></Payment>    
                <OrderButton cart={cart}></OrderButton>       
            </div>
        </div>
    )
}