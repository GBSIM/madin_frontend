import './PersonalOrder.css';

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { changePage } from '../../../_reducers/nav';
import { UserAuth } from '../../library/function/Auth';

import Header from '../../library/ui/header/Header/Header';
import Footer from '../../library/ui/footer/Footer/Footer';
import PersonalOrderMenus from '../../library/ui/personalorder/PersonalOrderMenus/PersonalOrderMenus';
import { useEffect } from 'react';

export default function PersonalOrder() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLogin } = useSelector(state => state.user);

    UserAuth();

    useEffect(() => {
        if (!isLogin) {
            dispatch(changePage('order'));
            navigate('/personal');
        }
    }, [])
    
    if (isLogin) {
        return (
            <div className='page'>
                <Header></Header>
                <div className='order-contents-container'>
                    <PersonalOrderMenus></PersonalOrderMenus>
                </div>
                <Footer></Footer>
            </div>
        )
    }    
}