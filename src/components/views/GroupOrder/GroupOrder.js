import './GroupOrder.css';

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { changePage } from '../../../_reducers/nav';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import Orderer from '../../library/ui/order/Orderer/Orderer';
import Shipping from '../../library/ui/order/Shipping/Shipping';
import GroupOrderMenus from '../../library/ui/groupOrder/GroupOrderMenus/GroupOrderMenus';
import GroupOrderPayment from '../../library/ui/groupOrder/GroupOrderPayment/GroupOrderPayment';

export default function GroupOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLogin } = useSelector(state => state.user);

    useEffect(() => {
        if (!isLogin) {
            dispatch(changePage('group'));
            navigate('/group/menu');
        }
    }, [])
    
    if (isLogin) {
        return (
            <div className='page'>
                <Header></Header>
                <div className='order-contents-container'>
                    <GroupOrderMenus></GroupOrderMenus>
                    <Orderer></Orderer>
                    <Shipping></Shipping>
                    <GroupOrderPayment></GroupOrderPayment>
                </div>
                <Footer></Footer>
            </div>
        )
    }    
}