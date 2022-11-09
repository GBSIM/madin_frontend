import './OrderSheet.css';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { changePage } from '../../../../../_reducers/nav';

import OrangeButton from '../OrangeButton/OrangeButton';
import GreyButton from '../GreyButton/GreyButton';

export default function OrderSheet(props) {
    let quantitySum;
    const quantityArrayValid = (Array.isArray(props.quantityArray) && props.quantityArray.length !== 0);
    const priceArrayValid = (Array.isArray(props.priceArray) && props.priceArray.length !== 0);

    if (quantityArrayValid) {
        quantitySum = props.quantityArray.reduce((a,b) => (a + b));
    } else {
        quantitySum = 0;
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navPageEvent = () => {
        if (props.isLogin) {
            dispatch(changePage(props.type+'order'));
            navigate('/'+props.type+'/order');
            window.scrollTo(0,0);
        } else {
            window.alert('로그인을 진행해주세요!');
        }
    }

    let OrderSheetButton;
    let OrderSheetDivider;
    if (props.type === 'personal') {
        if (quantitySum > 0) {
            OrderSheetButton = <OrangeButton
                                    width='230px'
                                    height='36px'
                                    borderRadius='7px'
                                    text='주문하러가기'
                                    clickEvent={navPageEvent}
                                    ></OrangeButton>
            OrderSheetDivider = <div className='order-sheet-divider'></div>
        } else {
            OrderSheetButton = <GreyButton
                                    width='230px'
                                    height='36px'
                                    borderRadius='7px'
                                    text='메뉴를 골라주세요.'
                                    ></GreyButton>
        }
    } else {
        if (quantitySum === props.boxSize) {
            OrderSheetButton = <OrangeButton
                                    width='230px'
                                    height='36px'
                                    borderRadius='7px'
                                    text='주문하러가기'
                                    clickEvent={navPageEvent}
                                    ></OrangeButton>
            OrderSheetDivider = <div className='order-sheet-divider'></div>
        } else if (quantitySum === 0) {
            OrderSheetButton = <GreyButton
                                    width='230px'
                                    height='36px'
                                    borderRadius='7px'
                                    text='메뉴를 골라주세요.'
                                    ></GreyButton>
        } else {
            let menuLeft = props.boxSize - quantitySum;
            let menuLeftText;
            switch (menuLeft) {
                case 1:
                    menuLeftText = '한 개';
                    break;
                case 2:
                    menuLeftText = '두 개';
                    break;
                case 3:
                    menuLeftText = '세 개';
                    break;
                case 4:
                    menuLeftText = '네 개';
                    break;
                case 5:
                    menuLeftText = '다섯 개';
                    break;
                case 6:
                    menuLeftText = '여섯 개';
                    break;
                case 7:
                    menuLeftText = '일곱 개';
                    break;
            }
            OrderSheetButton = <GreyButton
                                    width='230px'
                                    height='36px'
                                    borderRadius='7px'
                                    text={menuLeftText + ' 더 골라주세요.'}
                                    ></GreyButton>
            OrderSheetDivider = <div className='order-sheet-divider'></div>
        }
    }
    

    let totalPrice;
    if (quantityArrayValid && priceArrayValid) {
        const totalPriceArray = props.quantityArray.map((quantity,index) => quantity*props.priceArray[index]);
        totalPrice = totalPriceArray.reduce((a,b) => (a + b));
    } else {
        totalPrice = 0;
    }

    const OrderItem = props.quantityArray.map((quantity,index) => (
        <OrderSheetItem
            quantity = {quantity}
            price = {props.priceArray[index]}
            name = {props.nameArray[index]}
            key={'order_item_'+props.nameArray[index]}></OrderSheetItem>
    ))

    return (
        <div className='order-sheet-container'>
            <h3 className='order-sheet-title'>장바구니</h3>
            <div style={{'flex':'1','minHeight':'20px'}}></div>
            <div className='order-sheet-items-container'>
                {OrderItem}
            </div>
            <div style={{'minHeight':'20px'}}></div>
            {OrderSheetDivider}
            <div style={{'minHeight':'20px'}}></div>
            <div className='order-sheet-total-price-container'>
                <span className='order-sheet-total-price'>
                    총 {totalPrice.toLocaleString()}원
                </span>
            </div>
            <div style={{'minHeight':'15px'}}></div>
            <div className='order-button-container'>
                {OrderSheetButton}
            </div>
        </div>
    )
}

function OrderSheetItem(props) {
    let itemTotalPrice
    if (props.quantity && props.price) {
        itemTotalPrice = props.quantity * props.price;
    } else {
        itemTotalPrice = 0;
    }
    if (itemTotalPrice > 0) {
        return (
            <div className='order-sheet-item-container'>
                <span className='order-sheet-item-text'>{props.name} x {props.quantity}</span>
                <div style={{'flex':'1'}}></div>
                <span className='order-sheet-item-text'>{itemTotalPrice.toLocaleString()}원</span>
            </div>
        )
    } 
}