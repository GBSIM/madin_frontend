import './Shipping.css';

import { useSelector } from "react-redux";

import OrangeTag from '../../unit/OrangeTag/OrangeTag';

export default function Shipping() {
    const { shippings} = useSelector(state => state.user);

    let ShippingInfoList;
    if (shippings) {
        shippings.map((shipping,index) => (
            <ShippingInfo
                tag = {shipping['tag']}
                name = {shipping['name']}
                phone = {shipping['phone']}
                request = {shipping['request']}
                key = {shipping['key']}></ShippingInfo>
        ))
    }

    return (
        <div className='order-container'>
            <h2 className='order-title'>배송지 고르기</h2>
            <div style={{'minHeight':'30px'}}></div>
            <div style={{'paddingLeft':'40px','paddingRight':'40px','width':'100%'}}>
                {ShippingInfoList}
                <ShippingInfo
                tag = '기본 배송지'
                name = '이승지'
                phone = '010-4829-1092'
                address = '광안시 미기리 상승로 101번길 12 자이'
                request = '문 앞에 놔주세요.'></ShippingInfo>
            </div>
            <div className='shipping-add-button-container'>
                <button className='shipping-add-button'>
                    <div className='shipping-add-button-image-container'>
                        
                    </div>
                    <span className='shipping-add-button-text'>새로운 주소 추가하기</span>
                </button>
            </div>
        </div>
    )
}

function ShippingInfo(props) {
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
                <button className='shipping-checkbox-button'>
                    
                </button>
            </div>
        </div>
    )
}