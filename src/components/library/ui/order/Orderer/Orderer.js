import './Orderer.css';

import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { changePeronalOrdererUpdateWindow } from '../../../../../_reducers/order';
import { saveUserInfo } from '../../../../../_reducers/user';

import GreyLineButton from '../../unit/GreyLineButton/GreyLineButton';
import OrangeButton from '../../unit/OrangeButton/OrangeButton';
import OrangeLineButton from '../../unit/OrangeLineButton/OrangeLineButton';
import { useState } from 'react';

export default function Orderer() {
    const { name,email, phone} = useSelector(state => state.user);
    const { personalOrdererUpdateOpen} = useSelector(state => state.order);

    const dispatch = useDispatch();

    const openOrdrerUpdateWindow = () => {
        dispatch(changePeronalOrdererUpdateWindow());
    }
    
    return (
        <div className='order-container'>
            <div className='orderer-update-button-container'>
                <div>
                    <GreyLineButton text='수정하기' clickEvent={openOrdrerUpdateWindow}></GreyLineButton>
                </div>
            </div>
            <h2 className='order-title'>주문자 정보</h2>
            <div style={{'minHeight':'30px'}}></div>
            <OrdererContent
                title='보내는 사람'
                content={name}></OrdererContent>
            <div style={{'minHeight':'10px'}}></div>
            <OrdererContent
                title='핸드폰 번호'
                content={phone}></OrdererContent>
            <div style={{'minHeight':'10px'}}></div>
            <OrdererContent
                title='이메일'
                content={email}></OrdererContent>
            <OrdererUpdateWindow 
                isOpen={personalOrdererUpdateOpen}></OrdererUpdateWindow>
        </div>
    )
}

function OrdererContent(props) {
    return (
        <div className='orderer-content-container'>
            <span className='orderer-content-title'>{props.title}</span>
            <span className='orderer-content'>{props.content}</span>
        </div>
    )
}

function OrdererUpdateWindow(props) {
    const { name,email, phone, _id, token} = useSelector(state => state.user);

    const [nameInput, setNameInput] = useState(name);
    const [emailInput, setEmailInput] = useState(email);
    const [phoneInput, setPhoneInput] = useState(phone);


    const dispatch = useDispatch();

    const closeOrdrerUpdateWindow = () => {
        dispatch(changePeronalOrdererUpdateWindow());
    }

    const updateUserName = (e) => {
        dispatch(setNameInput(e.target.value));
    }

    const updateUserEmail = (e) => {
        dispatch(setEmailInput(e.target.value));
    }

    const updateUserPhone = (e) => {
        dispatch(setPhoneInput(e.target.value));
    }

    const updateUserInfo = async() => {
        const userUpdateResponse = await axios.patch('https://api.madinbakery.com/user/'+ _id, {
            "name": nameInput,
            "email": emailInput,
            "phone": phoneInput,
            "token": token
        });
        dispatch(saveUserInfo(userUpdateResponse.data.user));
        dispatch(changePeronalOrdererUpdateWindow());
    }

    if (props.isOpen) {
        return (
            <div className='orderer-update-window-container'>
                <div className='orderer-update-window'>
                    <h2 className='order-title'>주문자 수정하기</h2>
                    <div style={{'minHeight':'30px'}}></div>
                    <div className='orderer-update-row-container'>
                        <span className='orderer-update-row-title'>보내는 사람</span>
                        <div className='orderer-update-box'>
                            <input className='orderer-update-input' value={nameInput} onChange={updateUserName}></input>
                        </div>
                    </div>
                    <div style={{'minHeight':'20px'}}></div>
                    <div className='orderer-update-row-container'>
                        <span className='orderer-update-row-title'>핸드폰 번호</span>
                        <div className='orderer-update-box'>
                            <input className='orderer-update-input' value={phoneInput} onChange={updateUserPhone}></input>
                        </div>
                    </div>
                    <div style={{'minHeight':'20px'}}></div>
                    <div className='orderer-update-row-container'>
                        <span className='orderer-update-row-title'>이메일</span>
                        <div className='orderer-update-box'>
                            <input className='orderer-update-input' value={emailInput} onChange={updateUserEmail}></input>
                        </div>
                    </div>
                    <div style={{'flex':'1','minHeight':'30px'}}></div>
                    <OrangeButton width='320px' height='40px' borderRadius='6px' text='수정하기' clickEvent={updateUserInfo}></OrangeButton>
                    <div style={{'minHeight':'10px'}}></div>
                    <OrangeLineButton width='320px' height='40px' borderRadius='6px' text='닫기' clickEvent={closeOrdrerUpdateWindow}></OrangeLineButton>
                </div>
            </div>
        )
    }
}