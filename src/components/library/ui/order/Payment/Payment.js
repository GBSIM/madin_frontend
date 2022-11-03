import './Payment.css';

import { useDispatch, useSelector } from 'react-redux';

import { changePaymentMethod } from '../../../../../_reducers/order';

import OrangeButton from '../../unit/OrangeButton/OrangeButton';
import OrangeLineButton from '../../unit/OrangeLineButton/OrangeLineButton';
import GreyLineButton from '../../unit/GreyLineButton/GreyLineButton';

export default function Payment(props) {
    const quantityArrayValid = (Array.isArray(props.quantityList) && props.quantityList.length !== 0);
    const priceArrayValid = (Array.isArray(props.priceList) && props.priceList.length !== 0);
    
    let totalPrice;
    if (quantityArrayValid && priceArrayValid) {
        const totalPriceArray = props.quantityList.map((quantity,index) => quantity*props.priceList[index]);
        totalPrice = totalPriceArray.reduce((a,b) => (a + b));
    } else {
        totalPrice = 0;
    }

    const { paymentMethod } = useSelector(state => state.order);

    return (
        <div className='order-container'>
            <h2 className='order-title'>결제 수단</h2>
            <div style={{'minHeight':'30px'}}></div>
            <PaymentMethodButton isSelected={paymentMethod==="kakao"} text="카카오페이" method='kakao'></PaymentMethodButton>
            <div style={{'minHeight':'7px'}}></div>
            <PaymentMethodButton isSelected={paymentMethod==="naver"} text="네이버페이" method='naver'></PaymentMethodButton>
            <div style={{'minHeight':'7px'}}></div>
            <PaymentMethodButton isSelected={paymentMethod==="toss"} text="토스페이" method='toss'></PaymentMethodButton>
            <div style={{'minHeight':'30px'}}></div>
            <OrangeButton width='400px' height='50px' text={totalPrice.toLocaleString()+'원 결제하기'} borderRadius='6px'></OrangeButton>
        </div>
    )
}

function PaymentMethodButton(props) {
    const dispatch = useDispatch();
    const activatePaymentMethod = () => {
        dispatch(changePaymentMethod(props.method))
    }

    if (props.isSelected) {
        return (
            <OrangeLineButton width='400px' height='50px' text={props.text} borderRadius='6px' isHoverEffectInhibited={true}></OrangeLineButton>
        )
    }
     else {
        return (
            <GreyLineButton width='400px' height='50px' text={props.text} borderRadius='6px' clickEvent={activatePaymentMethod} isHoverEffectInhibited={true}></GreyLineButton>
        )
    }
}