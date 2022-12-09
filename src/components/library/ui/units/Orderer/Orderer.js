import './Orderer.css';
import './OrdererEditWindow.css';

import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { getCookie } from '../Cookie/Cookie';
import { authUser } from '../LoginButton/KakaoLogin';
import { saveName, savePhone, saveEmail } from '../../../../../_reducers/user';

export default function Orderer(props) {
    const [isOrdererEditWindowOn, setOrdererEditWindowOn] = useState(false);

    const openOrdererEditWindow = () => {
        setOrdererEditWindowOn(true);
    }
    
    const closeOrdererEditWindow = () => {
        setOrdererEditWindowOn(false);
    }

    let OrdererUpdateWindow;
    if (props.name && props.phone && props.email) {
        OrdererUpdateWindow = 
        <OrdererEditWindow
            isOn={isOrdererEditWindowOn}
            closeEvent={closeOrdererEditWindow}
            name={props.name}
            phone={props.phone}
            email={props.email}></OrdererEditWindow>
    }

    return (
        <div className='orderer'>
            <h1 className='orderer-title'>주문자 정보</h1>
            <div style={{'minHeight':'30px'}}></div>
            <div style={{'width':'100%','minHeight':'1px','background':'#c6c6c6'}}></div>
            <div className='orderer-items-container'>
                <div className='orderer-item'>
                    <span className='orderer-item-text'>보내는 사람</span>
                    <span className='orderer-itme-text'>{props.name}</span>
                </div>
                <div className='orderer-item'>
                    <span className='orderer-item-text'>연락처</span>
                    <span className='orderer-itme-text'>{props.phone}</span>
                </div>
                <div className='orderer-item'>
                    <span className='orderer-item-text'>이메일</span>
                    <span className='orderer-itme-text'>{props.email}</span>
                </div>
            </div>
            <div style={{'width':'100%','minHeight':'1px','background':'#eee'}}></div>
            <button className='orderer-edit-button' onClick={() => openOrdererEditWindow()}>
                <span className='orderer-edit-button-text'>편집하기</span>
            </button>
            {OrdererUpdateWindow}
        </div>
    )
}

function OrdererEditWindow(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState(props.name);
    const [phone, setPhone] = useState(props.phone);
    const [email, setEmail] = useState(props.email);
    
    const updateName = (e) => {
        dispatch(setName(e.target.value));
    }

    const updatePhone = (e) => {
        dispatch(setPhone(e.target.value));
    }

    const updateEmail = (e) => {
        dispatch(setEmail(e.target.value));
    }

    const completeEditOrderer = async() => {
        const token = getCookie('token');
        await axios.patch('https://api.madinbakery.com/user', {
            "name": name,
            "phone": phone,
            "token": token,
            "email": email
        });
        const user = await authUser();
        dispatch(saveName(user["name"]));
        dispatch(savePhone(user["phone"]));
        dispatch(saveEmail(user["email"]));
        props.closeEvent();
    }

    if (props.isOn) {
        return (
            <div className='orderer-edit-window-background'>
                <div className='orderer-edit-window'>
                    <div className='orderer-edit-window-input-container'>
                        <div className='orderer-edit-window-input-row'>
                            <span className='orderer-edit-window-title'>보내는 사람</span>
                            <div className='orderer-edit-window-input-frame'>
                                <input className='orderer-edit-window-input' value={name} onChange={updateName}></input>
                            </div>
                        </div>
                        <div className='orderer-edit-window-input-row'>
                            <span className='orderer-edit-window-title'>연락처</span>
                            <div className='orderer-edit-window-input-frame'>
                                <input className='orderer-edit-window-input' value={phone} onChange={updatePhone}></input>
                            </div>
                        </div>
                        <div className='orderer-edit-window-input-row'>
                            <span className='orderer-edit-window-title'>이메일</span>
                            <div className='orderer-edit-window-input-frame'>
                                <input className='orderer-edit-window-input' value={email} onChange={updateEmail}></input>
                            </div>
                        </div>
                        <div style={{'minHeight':'30px'}}></div>
                        <button className='orderer-edit-window-save-button' onClick={() => completeEditOrderer()}>
                            <span className='orderer-edit-window-save-button-text'>저장하기</span>
                        </button>
                        <button className='orderer-edit-window-cancel-button' onClick={() => {props.closeEvent()}}>
                            <span className='orderer-edit-window-cancel-button-text'>닫기</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}