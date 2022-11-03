import './Shipping.css';

import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import {  useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

import { saveUserInfo } from '../../../../../_reducers/user';
import { changeShippingChekcedIndex, changeShippingAddWindow } from '../../../../../_reducers/order';

import OrangeTag from '../../unit/OrangeTag/OrangeTag';
import OrangeButton from '../../unit/OrangeButton/OrangeButton';
import OrangeLineButton from '../../unit/OrangeLineButton/OrangeLineButton';

export default function Shipping() {
    const dispatch = useDispatch();
    const { shippings } = useSelector(state => state.user);
    const { shippingAddWindowOpen, shippingCheckedIndex } = useSelector(state => state.order);

    let ShippingInfoList;
    if (shippings) {
        ShippingInfoList = shippings.map((shipping,index) => (
            <ShippingInfo
                tag = {shipping['tag']}
                name = {shipping['name']}
                basicAddress = {shipping['basicAddress']}
                detailAddress = {shipping['detailAddress']}
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

    const openShippingAddWindow = () => {
        dispatch(changeShippingAddWindow());
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
                <button className='shipping-add-button' onClick={() => openShippingAddWindow()}>
                    <div className='shipping-add-button-image-container'>
                        <img className='shipping-add-button-image' src={require('../../../icons/plus_grey.png')} alt='addImage'></img>
                    </div>
                    <span className='shipping-add-button-text'>새로운 주소 추가하기</span>
                </button>
            </div>
            <ShippingAddWindow isOpen={shippingAddWindowOpen}></ShippingAddWindow>
        </div>
    )
}

function ShippingInfo(props) {
    const [updateWindowOpen, setUpdateWindowOpen] = useState(false);
    const [deleteWindowOpen, setDeleteWindowOpen] = useState(false);

    const dispatch = useDispatch();
    const openShippingUpdateWindow = () => {
        dispatch(setUpdateWindowOpen(true));
    }
    const openShippingDeleteWindow = () => {
        dispatch(setDeleteWindowOpen(true));
    }
    const setCheckbox = () => {
        dispatch(changeShippingChekcedIndex(props.index));
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
                    <span className='shipping-info'>{props.basicAddress} {props.detailAddress}</span>
                    <span className='shipping-info'>{props.name}, {props.phone}</span>
                    <span className='shipping-info'>{props.request}</span>
                </div>
            </div>
            <div style={{'minWidth':'20px','flex':'1'}}></div>
            <div className='shipping-right-container'>
                {Checkbox}
            </div>
            <div className='shipping-edit-button-container'>
                <button className='shipping-edit-button' onClick={() => openShippingUpdateWindow()}>
                    <span className='shipping-edit-button-text'>편집하기</span>
                </button>
                <button className='shipping-remove-button' onClick={() => openShippingDeleteWindow()}>
                    <span className='shipping-remove-button-text'>삭제하기</span>
                </button>
            </div>
            <ShippingUpdateWindow
                _id = {props._id}
                isOpen={updateWindowOpen}
                closeWindow={setUpdateWindowOpen}
                basicAddress = {props.basicAddress}
                detailAddress = {props.detailAddress}
                name={props.name}
                phone={props.phone}
                request={props.request}
                tag={props.tag}></ShippingUpdateWindow>
            <ShippingDeleteWindow
                _id = {props._id}
                isOpen={deleteWindowOpen}
                closeWindow={setDeleteWindowOpen}></ShippingDeleteWindow>
        </div>
    )
}


function ShippingAddWindow(props) {
    const { _id, socialId, token} = useSelector(state => state.user);
    const { basicAddressUpdate, detailAddressUpdate, nameUpdate, phoneUpdate, tagUpdate, requestUpdate} = useSelector(state => state.order);

    const [nameInput, setNameInput] = useState(nameUpdate);
    const [basicAddressInput, setBasicAddressInput] = useState(basicAddressUpdate);
    const [detailAddressInput, setDetailAddressInput] = useState(detailAddressUpdate);
    const [requestInput, setRequestInput] = useState(requestUpdate);
    const [phoneInput, setPhoneInput] = useState(phoneUpdate);
    const [tagInput, setTagInput] = useState(tagUpdate);
    const [isAddressSelected, setIsAddresssSeleted] = useState(false);

    const dispatch = useDispatch();

    const closeShippingUpdateWindow = () => {
        dispatch(changeShippingAddWindow());

        setNameInput(null);
        setBasicAddressInput(null);
        setDetailAddressInput(null);
        setRequestInput(null);
        setPhoneInput(null);
        setTagInput(null);
        setIsAddresssSeleted(false);
    }

    const updateName = (e) => {
        dispatch(setNameInput(e.target.value));
    }

    const updateDetailAddress = (e) => {
        dispatch(setDetailAddressInput(e.target.value));
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
            "basicAddress": basicAddressInput,
            "detailAddress": detailAddressInput,
            "request": requestInput,
            "tag": tagInput,
            "token": token
        });
        const userGetResponse = await axios.post('https://api.madinbakery.com/user/auth/'+ socialId, {
            "token": token
        })
        dispatch(saveUserInfo(userGetResponse.data.user));
        dispatch(changeShippingAddWindow());

        setNameInput(null);
        setBasicAddressInput(null);
        setDetailAddressInput(null);
        setRequestInput(null);
        setPhoneInput(null);
        setTagInput(null);
        setIsAddresssSeleted(false);
    }

    const addressSelectComplete = (data) => {
        setBasicAddressInput(data.address);
        setIsAddresssSeleted(true);
    }

    let DaumAddressAPI;
    if (!isAddressSelected) {
        DaumAddressAPI = <DaumPostcode onComplete={addressSelectComplete} autoClose={false}></DaumPostcode>
    }

    let ShippingAddButton;
    if (isAddressSelected) {
        ShippingAddButton =
        <div>
            <OrangeButton width='320px' height='40px' borderRadius='6px' text='추가하기' clickEvent={addShippingInfo}></OrangeButton>
            <div style={{'minHeight':'10px'}}></div>
        </div> 
    }

    let ShippingInputRows;
    if (isAddressSelected) {
        ShippingInputRows = 
        <div className='shipping-update-rows'>
            <div className='shipping-update-row-container'>
                <div className='shipping-update-basic-address-container'>
                    <span className='shipping-update-basic-address'>{basicAddressInput}</span>
                </div>
            </div>
            <div className='shipping-update-row-container'>
                <span className='shipping-update-row-title'>상세 주소</span>
                <div className='shipping-update-box'>
                    <input className='shipping-update-input' value={detailAddressInput} onChange={updateDetailAddress}></input>
                </div>
            </div>
            <div className='shipping-update-row-container'>
                <span className='shipping-update-row-title'>받는 사람</span>
                <div className='shipping-update-box'>
                    <input className='shipping-update-input' value={nameInput} onChange={updateName}></input>
                </div>
            </div>
            <div className='shipping-update-row-container'>
                <span className='shipping-update-row-title'>핸드폰 번호</span>
                <div className='shipping-update-box'>
                    <input className='shipping-update-input' value={phoneInput} onChange={updatePhone}></input>
                </div>
            </div>
            <div className='shipping-update-row-container'>
                <span className='shipping-update-row-title'>요청사항</span>
                <div className='shipping-update-box'>
                    <input className='shipping-update-input' value={requestInput} onChange={updateRequest}></input>
                </div>
            </div>            
            <div className='shipping-update-row-container'>
                <span className='shipping-update-row-title'>주소 별명</span>
                <div className='shipping-update-box'>
                    <input className='shipping-update-input' value={tagInput} onChange={updateTag}></input>
                </div>
            </div>
        </div>
    }

    if (props.isOpen) {
        return (
            <div className='shipping-update-window-container'>
                <div className='shipping-update-window'>
                    <h2 className='order-title'>새로운 주소 추가하기</h2>
                    <div style={{'minHeight':'30px'}}></div>
                    {DaumAddressAPI}
                    {ShippingInputRows}
                    <div style={{'flex':'1','minHeight':'30px'}}></div>
                    {ShippingAddButton}
                    <OrangeLineButton width='320px' height='40px' borderRadius='6px' text='닫기' clickEvent={closeShippingUpdateWindow}></OrangeLineButton>
                </div>
            </div>
        )
    }
}

function ShippingUpdateWindow(props) {
    const { socialId, token} = useSelector(state => state.user);

    const [nameInput, setNameInput] = useState(props.name);
    const [basicAddressInput, setBasicAddressInput] = useState(props.basicAddress);
    const [detailAddressInput, setDetailAddressInput] = useState(props.detailAddress);
    const [requestInput, setRequestInput] = useState(props.request);
    const [phoneInput, setPhoneInput] = useState(props.phone);
    const [tagInput, setTagInput] = useState(props.tag);

    const dispatch = useDispatch();

    const closeShippingUpdateWindow = () => {
        props.closeWindow();

        setNameInput(props.name);
        setBasicAddressInput(props.basicAddress);
        setDetailAddressInput(props.detailAddress);
        setRequestInput(props.request);
        setPhoneInput(props.phone);
        setTagInput(props.tag);
    }

    const updateName = (e) => {
        dispatch(setNameInput(e.target.value));
    }

    const updateDetailAddress = (e) => {
        dispatch(setDetailAddressInput(e.target.value));
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

    const updateShippingInfo = async() => {
        await axios.patch('https://api.madinbakery.com/shipping/'+ props._id, {
            "name": nameInput,
            "phone": phoneInput,
            "basicAddress": basicAddressInput,
            "detailAddress": detailAddressInput,
            "request": requestInput,
            "tag": tagInput,
            "token": token
        });
        const userGetResponse = await axios.post('https://api.madinbakery.com/user/auth/'+ socialId, {
            "token": token
        })
        dispatch(saveUserInfo(userGetResponse.data.user));
        props.closeWindow();
    }

    if (props.isOpen) {
        return (
            <div className='shipping-update-window-container'>
                <div className='shipping-update-window'>
                    <h2 className='order-title'>주소 편집하기</h2>
                    <div style={{'minHeight':'30px'}}></div>
                    <div className='shipping-update-rows'>
                        <div className='shipping-update-row-container'>
                            <div className='shipping-update-basic-address-container'>
                                <span className='shipping-update-basic-address'>{basicAddressInput}</span>
                            </div>
                        </div>
                        <div className='shipping-update-row-container'>
                            <span className='shipping-update-row-title'>상세 주소</span>
                            <div className='shipping-update-box'>
                                <input className='shipping-update-input' value={detailAddressInput} onChange={updateDetailAddress}></input>
                            </div>
                        </div>
                        <div className='shipping-update-row-container'>
                            <span className='shipping-update-row-title'>받는 사람</span>
                            <div className='shipping-update-box'>
                                <input className='shipping-update-input' value={nameInput} onChange={updateName}></input>
                            </div>
                        </div>
                        <div className='shipping-update-row-container'>
                            <span className='shipping-update-row-title'>핸드폰 번호</span>
                            <div className='shipping-update-box'>
                                <input className='shipping-update-input' value={phoneInput} onChange={updatePhone}></input>
                            </div>
                        </div>
                        <div className='shipping-update-row-container'>
                            <span className='shipping-update-row-title'>요청사항</span>
                            <div className='shipping-update-box'>
                                <input className='shipping-update-input' value={requestInput} onChange={updateRequest}></input>
                            </div>
                        </div>            
                        <div className='shipping-update-row-container'>
                            <span className='shipping-update-row-title'>주소 별명</span>
                            <div className='shipping-update-box'>
                                <input className='shipping-update-input' value={tagInput} onChange={updateTag}></input>
                            </div>
                        </div>
                    </div>
                    <div style={{'flex':'1','minHeight':'30px'}}></div>
                    <OrangeButton width='320px' height='40px' borderRadius='6px' text='수정하기' clickEvent={updateShippingInfo}></OrangeButton>
                    <div style={{'minHeight':'10px'}}></div>
                    <OrangeLineButton width='320px' height='40px' borderRadius='6px' text='닫기' clickEvent={closeShippingUpdateWindow}></OrangeLineButton>
                </div>
            </div>
        )
    }
}

function ShippingDeleteWindow(props) {
    const dispatch = useDispatch();
    const { socialId, token} = useSelector(state => state.user);

    const deleteShippingInfo = async() => {
        await axios.delete('https://api.madinbakery.com/shipping/'+ props._id, {
            data: {
                "token": token
            }
        });
        const userGetResponse = await axios.post('https://api.madinbakery.com/user/auth/'+ socialId, {
            "token": token
        })
        dispatch(saveUserInfo(userGetResponse.data.user));
        props.closeWindow();
    }

    const closeShippingDeleteWindow = () => {
        props.closeWindow();
    }

    if (props.isOpen) {
        return (
            <div className='shipping-update-window-container'>
                <div className='shipping-delete-window'>
                    <h2 className='order-title'>주소 삭제하기</h2>
                    <div style={{'flex':'1','minHeight':'30px'}}></div>
                    <span className='shipping-delete-check'>정말 삭제하시겠어요?</span>
                    <div style={{'flex':'1','minHeight':'30px'}}></div>
                    <OrangeButton width='320px' height='40px' borderRadius='6px' text='삭제하기' clickEvent={deleteShippingInfo}></OrangeButton>
                    <div style={{'minHeight':'10px'}}></div>
                    <OrangeLineButton width='320px' height='40px' borderRadius='6px' text='취소' clickEvent={closeShippingDeleteWindow}></OrangeLineButton>
                </div>
            </div>
        )
    }
}