import './ShippingList.css';
import './Shipping.css';
import './ShippingAddButton.css';
import './ShippingAddWindow.css';
import './ShippingEditWindow.css';
import './ShippingDeleteWindow.css';

import DaumPostcode from 'react-daum-postcode';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { getCookie } from '../Cookie/Cookie';
import { authUser } from '../LoginButton/KakaoLogin';
import { saveShipping } from '../../../../../_reducers/user';

export default function ShippingList(props) {
    const [isShippingAddWindowOn, setShippingAddWindowOn] = useState(false);
    const [selectedShippingIndex, setSelectedShippingIndex] = useState(0);

    const openShippingAddWindow = () => {
        setShippingAddWindowOn(true);
    }

    const closeShippingAddWindow= () => {
        setShippingAddWindowOn(false);
    }

    const changeShippgngIndex = (index) => {
        setSelectedShippingIndex(index);
    }

    let Shippings;
    if (props.shippings) {
        if (props.shippings.length > 0) {
            Shippings = props.shippings.map((shipping,index) => (
                <Shipping
                    index={index}
                    isChekced={index===selectedShippingIndex}
                    id={shipping["_id"]}
                    tag={shipping["tag"]}
                    basicAddress={shipping["basicAddress"]}
                    detailAddress={shipping["detailAddress"]}
                    phone={shipping["phone"]}
                    name={shipping["name"]}
                    request={shipping["request"]}
                    key={'shipping_'+String(index)}
                    checkButtonEvent={changeShippgngIndex}></Shipping>
            ))
        } else {
            Shippings = 
            <span className='shipping-list-guide'>
                아직 등록된 배송지가 없어요.
            </span>
        }
    } else {
        Shippings = 
            <span className='shipping-list-guide'>
                아직 등록된 배송지가 없어요.
            </span>
    }

    return (
        <div className='shipping-list'>
            <h1 className='shipping-list-title'>배송지</h1>
            <div style={{'minHeight':'30px'}}></div>
            <div style={{'width':'100%','minHeight':'1px','background':'#c6c6c6'}}></div>
            {Shippings}
            <div style={{'minHeight':'20px'}}></div>
            <ShippingAddButton clickEvent={openShippingAddWindow}></ShippingAddButton>
            <ShippingAddWindow isOn={isShippingAddWindowOn} closeEvent={closeShippingAddWindow}></ShippingAddWindow>
        </div>
    )
}

function Shipping(props) {
    const [isShippingEditWindowOn, setShippingEditWindowOn] = useState(false);
    const [isShippingDeleteWindowOn, setShippingDeleteWindowOn] = useState(false);

    const openShippingEditWindow = () => {
        setShippingEditWindowOn(true);
    }

    const closeShippingEditWindow= () => {
        setShippingEditWindowOn(false);
    }

    const openShippingDeleteWindow = () => {
        setShippingDeleteWindowOn(true);
    }

    const closeShippingDeleteWindow= () => {
        setShippingDeleteWindowOn(false);
    }

    let ShippingCheckButtonImage;
    if (props.isChekced) {
        ShippingCheckButtonImage = 
            <img 
                className='shipping-check-button-image'
                src={require('../../../icons/check_orange.png')}
                alt='check'></img>
    } else {
        ShippingCheckButtonImage = 
            <img 
                className='shipping-check-button-image'
                src={require('../../../icons/check_grey.png')}
                alt='check'></img>
    }

    return (
        <div className='shipping'>
            <div className='shipping-left-container'>
                <div className='shipping-tag-container'>
                    <span className='shipping-tag'>{props.tag}</span>
                </div>
                <div style={{'minHeight':'10px'}}></div>
                <span className='shipping-address'>{props.basicAddress} {props.detailAddress}</span>
                <div style={{'minHeight':'5px'}}></div>
                <span className='shipping-name'>{props.name}, {props.phone}</span>
                <div style={{'minHeight':'5px'}}></div>
                <span className='shipping-request'>{props.request}</span>
            </div>
            <div style={{'flex':'1'}}></div>
            <div className='shipping-right-container'>
                <button className='shipping-check-button' onClick={() => props.checkButtonEvent(props.index)}>
                    {ShippingCheckButtonImage}
                </button>
            </div>
            <button className='shipping-edit-button' onClick={() => openShippingEditWindow()}>
                <span className='shipping-edit-button-text'>편집하기</span>
            </button>
            <button className='shipping-remove-button' onClick={() => openShippingDeleteWindow()}>
                <span className='shipping-remove-button-text'>삭제하기</span>
            </button>
            <ShippingEditWindow 
                id={props.id}
                isOn={isShippingEditWindowOn}
                closeEvent={closeShippingEditWindow}
                basicAddress={props.basicAddress}
                detailAddress={props.detailAddress}
                name={props.name}
                phone={props.phone}
                tag={props.tag}
                request={props.request}></ShippingEditWindow>
            <ShippingDeleteWindow
                id={props.id}
                isOn={isShippingDeleteWindowOn}
                closeEvent={closeShippingDeleteWindow}
                checkButtonEvent={props.checkButtonEvent}></ShippingDeleteWindow>
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

    const completeAddShipping = async() => {
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
            <div className='shipping-add-window-input-container'>
                <div className='shipping-add-window-basic-address-frame'>
                    <span className='shipping-add-window-basic-address'>{basicAddress}</span>
                </div>
                <div className='shipping-add-window-input-row'>
                    <span className='shipping-add-window-title'>상세 주소</span>
                    <div className='shipping-add-window-input-frame'>
                        <input className='shipping-add-window-input' value={detailAddress} onChange={updateDetailAddress}></input>
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
            <div className='shipping-add-window-input-container'>
                <div className='shipping-add-window-basic-address-frame'>
                    <span className='shipping-add-window-basic-address'>{basicAddress}</span>
                </div>
                <div className='shipping-add-window-basic-address-frame'>
                    <span className='shipping-add-window-basic-address'>{detailAddress}</span>
                </div>
                <div className='shipping-add-window-input-row'>
                    <span className='shipping-add-window-title'>받는 사람</span>
                    <div className='shipping-add-window-input-frame'>
                        <input className='shipping-add-window-input' value={name} onChange={updateName}></input>
                    </div>
                </div>
                <div className='shipping-add-window-input-row'>
                    <span className='shipping-add-window-title'>연락처</span>
                    <div className='shipping-add-window-input-frame'>
                        <input className='shipping-add-window-input' value={phone} onChange={updatePhone}></input>
                    </div>
                </div>
                <div style={{'minHeight':'30px'}}></div>
                <button className='shipping-add-window-save-button' onClick={() => completeAddShipping()}>
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

function ShippingEditWindow(props) {
    const dispatch = useDispatch();
    const [name, setName] = useState(props.name);
    const [phone, setPhone] = useState(props.phone);
    const [tag, setTag] = useState(props.tag);
    const [request, setRequest] = useState(props.request);

    const updateName = (e) => {
        dispatch(setName(e.target.value));
    }

    const updatePhone = (e) => {
        dispatch(setPhone(e.target.value));
    }

    const updateTag = (e) => {
        dispatch(setTag(e.target.value));
    }

    const updateRequest = (e) => {
        dispatch(setRequest(e.target.value));
    }

    const completeEditShipping = async() => {
        const token = getCookie('token');
        await axios.patch('https://api.madinbakery.com/shipping/'+(props.id), {
            "name": name,
            "phone": phone,
            "token": token,
            "tag": tag,
            "request":request,
        });
        const user = await authUser();
        dispatch(saveShipping(user["shippings"]));
        props.closeEvent();
    }

    if (props.isOn) {
        return (
            <div className='shipping-edit-window-background'>
                <div className='shipping-edit-window'>
                    <div className='shipping-edit-window-input-container'>
                        <div className='shipping-edit-window-basic-address-frame'>
                            <span className='shipping-edit-window-basic-address'>{props.basicAddress}</span>
                        </div>
                        <div className='shipping-edit-window-basic-address-frame'>
                            <span className='shipping-edit-window-basic-address'>{props.detailAddress}</span>
                        </div>
                        <div className='shipping-edit-window-input-row'>
                            <span className='shipping-edit-window-title'>받는 사람</span>
                            <div className='shipping-edit-window-input-frame'>
                                <input className='shipping-edit-window-input' value={name} onChange={updateName}></input>
                            </div>
                        </div>
                        <div className='shipping-edit-window-input-row'>
                            <span className='shipping-edit-window-title'>연락처</span>
                            <div className='shipping-edit-window-input-frame'>
                                <input className='shipping-edit-window-input' value={phone} onChange={updatePhone}></input>
                            </div>
                        </div>
                        <div className='shipping-edit-window-input-row'>
                            <span className='shipping-edit-window-title'>주소 별명</span>
                            <div className='shipping-edit-window-input-frame'>
                                <input className='shipping-edit-window-input' value={tag} onChange={updateTag}></input>
                            </div>
                        </div>
                        <div className='shipping-edit-window-input-row'>
                            <span className='shipping-edit-window-title'>요청사항</span>
                            <div className='shipping-edit-window-input-frame'>
                                <input className='shipping-edit-window-input' value={request} onChange={updateRequest}></input>
                            </div>
                        </div>
                        <div style={{'minHeight':'30px'}}></div>
                        <button className='shipping-edit-window-save-button' onClick={() => completeEditShipping()}>
                            <span className='shipping-edit-window-save-button-text'>완료</span>
                        </button>
                        <button className='shipping-add-window-cancel-button' onClick={() => {props.closeEvent()}}>
                            <span className='shipping-add-window-cancel-button-text'>닫기</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

function ShippingDeleteWindow(props) {
    const dispatch = useDispatch();
    const completeDeleteShipping = async() => {
        const token = getCookie('token');
        await axios.delete('https://api.madinbakery.com/shipping/'+(props.id), {
            data: {
                "token": token
            }
        });
        const user = await authUser();
        dispatch(saveShipping(user["shippings"]));
        props.closeEvent();
        props.checkButtonEvent(0);
    }

    if (props.isOn) {
        return (
            <div className='shipping-delete-window-background'>
                <div className='shipping-delete-window'>
                    <span className='shipping-delete-guide'>정말 삭제하시겠어요?</span>
                    <div style={{'minHeight':'50px'}}></div>
                    <button className='shipping-edit-window-save-button' onClick={() => completeDeleteShipping()}>
                        <span className='shipping-edit-window-save-button-text'>삭제하기</span>
                    </button>
                    <div style={{'minHeight':'10px'}}></div>
                    <button className='shipping-delete-window-cancel-button' onClick={() => {props.closeEvent()}}>
                        <span className='shipping-delete-window-cancel-button-text'>닫기</span>
                    </button>
                </div>
            </div>
        )
    }
}