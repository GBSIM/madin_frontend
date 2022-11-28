import './Shipping.css';
import './ShippingInfo.css';
import './ShippingAddButton.css';
import './ShippingAddWindow.css';

import DaumPostcode from 'react-daum-postcode';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { getCookie } from '../Cookie/Cookie';
import { authUser } from '../LoginButton/KakaoLogin';
import { saveShipping } from '../../../../../_reducers/user';

export default function Shipping(props) {
    const [isShippingAddWindowOn, setShippingAddWindowOn] = useState(false);

    const openShippingAddWindow = () => {
        setShippingAddWindowOn(true);
    }

    const closeShippingAddWindow= () => {
        setShippingAddWindowOn(false);
    }

    let ShippingInfos;
    if (props.shippings) {
        ShippingInfos = props.shippings.map((shipping,index) => (
            <ShippingInfo
                name={shipping["tag"]}
                address={shipping["basicAddress"]+' '+shipping["detailAddress"]}
                phone={shipping["phone"]}
                receiver={shipping["name"]}
                key={'shipping_'+String(index)}></ShippingInfo>
        ))
    } else {
        ShippingInfos = 
            <span className='shipping-infos-guide'>
                아직 등록된 배송지가 없어요.
            </span>
    }

    return (
        <div className='shipping'>
            <h1 className='shipping-title'>배송지</h1>
            <div style={{'minHeight':'30px'}}></div>
            <div style={{'width':'100%','minHeight':'1px','background':'#c6c6c6'}}></div>
            {ShippingInfos}
            <div style={{'minHeight':'20px'}}></div>
            <ShippingAddButton clickEvent={openShippingAddWindow}></ShippingAddButton>
            <ShippingAddWindow isOn={isShippingAddWindowOn} closeEvent={closeShippingAddWindow}></ShippingAddWindow>
        </div>
    )
}

function ShippingInfo(props) {
    return (
        <div className='shipping-info'>
            <div className='shipping-info-left-container'>
                <div className='shipping-info-name-container'>
                    <span className='shipping-info-name'>{props.name}</span>
                </div>
                <div style={{'minHeight':'10px'}}></div>
                <div className='shipping-info-text'>{props.address}</div>
                <div style={{'minHeight':'5px'}}></div>
                <div className='shipping-info-text'>{props.receiver}, {props.phone}</div>
                <div style={{'minHeight':'5px'}}></div>
                <div className='shipping-info-text'>{props.request}</div>
            </div>
            <div style={{'flex':'1'}}></div>
            <div className='shipping-info-right-container'>
                <button className='shipping-info-check-button'>
                    <img 
                        className='shipping-info-check-button-image'
                        src={require('../../../icons/check_grey.png')}
                        alt='check'></img>
                </button>
            </div>
        </div>
    )
}

function ShippingAddButton(props) {
    return (
        <button className='shipping-add-button' onClick={() => props.clickEvent()}>
            <img className='shipping-add-button-image' src={require('../../../icons/plus_grey.png')} alt='add'></img>
            <span className='shipping-add-button-guide'>새로운 주소 추가하기</span>
        </button>
    )
}

function ShippingAddWindow(props) {
    const dispatch = useDispatch();
    const [isBasicAddressSelected, setBasicAddressSelected] = useState(false);
    const [isDetailAddressSelected, setDetailAddressSelected] = useState(false);
    const [basicAddress, setBasicAddress] = useState(null);
    const [detailAddress, setDetailAddress] = useState(null);
    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);

    const updateDetailAddress = (e) => {
        dispatch(setDetailAddress(e.target.value));
    }

    const updateName = (e) => {
        dispatch(setName(e.target.value));
    }

    const updatePhone = (e) => {
        dispatch(setPhone(e.target.value));
    }
    
    const completeSetBasicAddress = (data) => {
        setBasicAddressSelected(true);
        setBasicAddress(data.address);
    }

    const completeSetDetailAddress = () => {
        setDetailAddressSelected(true);
    }

    const completeAddAddress = async() => {
        const token = getCookie('token');
        await axios.post('https://api.madinbakery.com/shipping', {
            "name": name,
            "phone": phone,
            "basicAddress": basicAddress,
            "detailAddress": detailAddress,
            "token": token,
            "tag": "배송지",
        });
        const user = await authUser();
        dispatch(saveShipping(user["shippings"]));
        props.closeEvent();
    }

    let DaumAddressAPI;
    if (!isBasicAddressSelected) {
        DaumAddressAPI = <DaumPostcode onComplete={completeSetBasicAddress} autoClose={false}></DaumPostcode>
    }

    let DetailAddressInput;
    if (isBasicAddressSelected && !isDetailAddressSelected) {
        DetailAddressInput = 
            <div className='shipping-add-window-detail-address-input-container'>
                <div className='shipping-add-window-basic-address-frame'>
                    <span className='shipping-add-window-basic-address'>{basicAddress}</span>
                </div>
                <div className='shipping-add-window-detail-address-input-row'>
                    <span className='shipping-add-window-detail-address-title'>상세 주소</span>
                    <div className='shipping-add-window-detail-address-input-frame'>
                        <input className='shipping-add-window-detail-address' value={detailAddress} onChange={updateDetailAddress}></input>
                    </div>
                </div>
                <div style={{'minHeight':'50px'}}></div>
                <button className='shipping-add-window-save-button' onClick={() => completeSetDetailAddress()}>
                    <span className='shipping-add-window-save-button-text'>다음</span>
                </button>
            </div>
    }

    let ReceiverInput;
    if (isDetailAddressSelected) {
        ReceiverInput = 
            <div className='shipping-add-window-detail-address-input-container'>
                <div className='shipping-add-window-basic-address-frame'>
                    <span className='shipping-add-window-basic-address'>{basicAddress}</span>
                </div>
                <div className='shipping-add-window-basic-address-frame'>
                    <span className='shipping-add-window-basic-address'>{detailAddress}</span>
                </div>
                <div className='shipping-add-window-detail-address-input-row'>
                    <span className='shipping-add-window-detail-address-title'>받는 사람</span>
                    <div className='shipping-add-window-detail-address-input-frame'>
                        <input className='shipping-add-window-detail-address' value={name} onChange={updateName}></input>
                    </div>
                </div>
                <div className='shipping-add-window-detail-address-input-row'>
                    <span className='shipping-add-window-detail-address-title'>연락처</span>
                    <div className='shipping-add-window-detail-address-input-frame'>
                        <input className='shipping-add-window-detail-address' value={phone} onChange={updatePhone}></input>
                    </div>
                </div>
                <div style={{'minHeight':'30px'}}></div>
                <button className='shipping-add-window-save-button' onClick={() => completeAddAddress()}>
                    <span className='shipping-add-window-save-button-text'>완료</span>
                </button>
            </div>
    }

    if (props.isOn) {
        return (
            <div className='shipping-add-window-background'>
                <div className='shipping-add-window'>
                    {DaumAddressAPI}
                    {DetailAddressInput}
                    {ReceiverInput}
                    <div style={{'minHeight':'10px'}}></div>
                    <button className='shipping-add-window-cancel-button' onClick={() => {props.closeEvent()}}>
                        <span className='shipping-add-window-cancel-button-text'>닫기</span>
                    </button>
                </div>
            </div>
        )
    }
}