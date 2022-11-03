import './Shipping.css';

import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import {  useState } from 'react';

import { saveUserInfo } from '../../../../../_reducers/user';
import { changeShippingUpdateWindow, changeShippingChekcedIndex } from '../../../../../_reducers/order';

import OrangeTag from '../../unit/OrangeTag/OrangeTag';
import OrangeButton from '../../unit/OrangeButton/OrangeButton';
import OrangeLineButton from '../../unit/OrangeLineButton/OrangeLineButton';

export default function Shipping() {
    const dispatch = useDispatch();
    const { shippings } = useSelector(state => state.user);
    const { shippingUpdateWindowOpen, shippingCheckedIndex } = useSelector(state => state.order);

    let ShippingInfoList;
    if (shippings) {
        ShippingInfoList = shippings.map((shipping,index) => (
            <ShippingInfo
                tag = {shipping['tag']}
                name = {shipping['name']}
                address = {shipping['address']}
                phone = {shipping['phone']}
                request = {shipping['request']}
                _id = {shipping['_id']}
                isChecked = {shippingCheckedIndex === index}
                index = {index}
                key = {'shipping_'+index}></ShippingInfo>
        ))
    }

    let ShippingAddGuide;
    if (!shippings) {
        ShippingAddGuide = 
        <div className='shipping-add-guide-container'>
            <span className='shipping-add-guide'>아직 등록된 배송지가 없어요.</span>
            <span className='shipping-add-guide'>배송지를 등록해주세요!</span>
        </div>
    }

    const openShippingUpdateWindow = () => {
        dispatch(changeShippingUpdateWindow());
    }

    return (
        <div className='order-container'>
            <h2 className='order-title'>배송지 고르기</h2>
            <div style={{'minHeight':'30px'}}></div>
            <div style={{'paddingLeft':'40px','paddingRight':'40px','width':'100%'}}>
                {ShippingInfoList}                
            </div>
            {ShippingAddGuide}
            <div className='shipping-add-button-container'>
                <button className='shipping-add-button' onClick={() => openShippingUpdateWindow()}>
                    <div className='shipping-add-button-image-container'>
                        <img className='shipping-add-button-image' src={require('../../../icons/plus_grey.png')} alt='addImage'></img>
                    </div>
                    <span className='shipping-add-button-text'>새로운 주소 추가하기</span>
                </button>
            </div>
            <ShippingUpdateWindow isOpen={shippingUpdateWindowOpen}></ShippingUpdateWindow>
        </div>
    )
}

function ShippingInfo(props) {
    const dispatch = useDispatch();
    const openShippingUpdateWindow = () => {
        dispatch(changeShippingUpdateWindow());
    }
    const setCheckbox = () => {
        dispatch(changeShippingChekcedIndex(props.index))
    }

    let Checkbox;
    if (props.isChecked) {
        Checkbox = 
        <button className='shipping-checkbox-button checked'>
            <img src={require('../../../icons/check_orange.png')} alt='check' className='shipping-checkbox-image'></img>
        </button>
    } else {
        Checkbox = 
        <button className='shipping-checkbox-button unchecked' onClick={() => setCheckbox()}>
            <img src={require('../../../icons/check_grey.png')} alt='check' className='shipping-checkbox-image'></img>
        </button>
    }

    return (
        <div className='shipping-info-container'>
            <div className='shipping-left-container'>
                <div className='shipping-tag-container'>
                    <OrangeTag tag={props.tag}></OrangeTag>
                </div>
                <div className='shipping-info-rows'>
                    <span className='shipping-info'>{props.address}</span>
                    <span className='shipping-info'>{props.name}, {props.phone}</span>
                    <span className='shipping-info'>{props.request}</span>
                </div>
            </div>
            <div className='shipping-right-container'>
                {Checkbox}
            </div>
        </div>
    )
}


function ShippingUpdateWindow(props) {
    const { _id, socialId, token} = useSelector(state => state.user);

    const [nameInput, setNameInput] = useState(props.name);
    const [addressInput, setAddressInput] = useState(props.address);
    const [requestInput, setRequestInput] = useState(props.request);
    const [phoneInput, setPhoneInput] = useState(props.phone);
    const [tagInput, setTagInput] = useState(props.tag);

    const dispatch = useDispatch();

    const closeShippingUpdateWindow = () => {
        dispatch(changeShippingUpdateWindow());

        setNameInput(null);
        setAddressInput(null);
        setRequestInput(null);
        setPhoneInput(null);
        setTagInput(null);
    }

    const updateName = (e) => {
        dispatch(setNameInput(e.target.value));
    }

    const updateAddress = (e) => {
        dispatch(setAddressInput(e.target.value));
    }

    const updateRequest = (e) => {
        dispatch(setRequestInput(e.target.value));
    }

    const updatePhone = (e) => {
        dispatch(setPhoneInput(e.target.value));
    }

    const updateTag = (e) => {
        dispatch(setTagInput(e.target.value));
    }

    const addShippingInfo = async() => {
        await axios.post('https://api.madinbakery.com/shipping/'+ _id, {
            "name": nameInput,
            "phone": phoneInput,
            "address": addressInput,
            "request": requestInput,
            "tag": tagInput,
            "token": token
        });
        const userGetResponse = await axios.post('https://api.madinbakery.com/user/auth/'+ socialId, {
            "token": token
        })
        dispatch(saveUserInfo(userGetResponse.data.user));
        dispatch(changeShippingUpdateWindow());

        setNameInput(null);
        setAddressInput(null);
        setRequestInput(null);
        setPhoneInput(null);
        setTagInput(null);
    }

    if (props.isOpen) {
        return (
            <div className='orderer-update-window-container'>
                <div className='orderer-update-window'>
                    <h2 className='order-title'>새로운 주소 추가하기</h2>
                    <div style={{'minHeight':'30px'}}></div>
                    <div className='orderer-update-row-container'>
                        <span className='orderer-update-row-title'>받는 사람</span>
                        <div className='orderer-update-box'>
                            <input className='orderer-update-input' value={nameInput} onChange={updateName}></input>
                        </div>
                    </div>
                    <div style={{'minHeight':'20px'}}></div>
                    <div className='orderer-update-row-container'>
                        <span className='orderer-update-row-title'>핸드폰 번호</span>
                        <div className='orderer-update-box'>
                            <input className='orderer-update-input' value={phoneInput} onChange={updatePhone}></input>
                        </div>
                    </div>
                    <div style={{'minHeight':'20px'}}></div>
                    <div className='orderer-update-row-container'>
                        <span className='orderer-update-row-title'>주소</span>
                        <div className='orderer-update-box'>
                            <input className='orderer-update-input' value={addressInput} onChange={updateAddress}></input>
                        </div>
                    </div>
                    <div style={{'minHeight':'20px'}}></div>
                    <div className='orderer-update-row-container'>
                        <span className='orderer-update-row-title'>요청사항</span>
                        <div className='orderer-update-box'>
                            <input className='orderer-update-input' value={requestInput} onChange={updateRequest}></input>
                        </div>
                    </div>
                    <div style={{'minHeight':'20px'}}></div>
                    <div className='orderer-update-row-container'>
                        <span className='orderer-update-row-title'>별명</span>
                        <div className='orderer-update-box'>
                            <input className='orderer-update-input' value={tagInput} onChange={updateTag}></input>
                        </div>
                    </div>
                    <div style={{'flex':'1','minHeight':'30px'}}></div>
                    <OrangeButton width='320px' height='40px' borderRadius='6px' text='추가하기' clickEvent={addShippingInfo}></OrangeButton>
                    <div style={{'minHeight':'10px'}}></div>
                    <OrangeLineButton width='320px' height='40px' borderRadius='6px' text='닫기' clickEvent={closeShippingUpdateWindow}></OrangeLineButton>
                </div>
            </div>
        )
    }
}