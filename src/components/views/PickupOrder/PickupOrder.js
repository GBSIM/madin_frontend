import './PickupOrder.css';

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { changePage } from '../../../_reducers/nav';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import PickupOrderMenus from '../../library/ui/pickuporder/PickupOrderMenus/PickupOrderMenus';
import Orderer from '../../library/ui/order/Orderer/Orderer';
import PickupOrderPayment from '../../library/ui/pickuporder/PersonalOrderPayment/PickupOrderPayment';

export default function PickupOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLogin } = useSelector(state => state.user);

    useEffect(() => {
        if (!isLogin) {
            dispatch(changePage('pickup'));
            navigate('/pickup');
        }
    }, [])
    
    if (isLogin) {
        return (
            <div className='page'>
                <Header></Header>
                <div className='order-contents-container'>
                    <PickupOrderMenus></PickupOrderMenus>
                    <Orderer></Orderer>
                    <PickupOrderPayment></PickupOrderPayment>
                </div>
                <Footer></Footer>
            </div>
        )
    }    
}