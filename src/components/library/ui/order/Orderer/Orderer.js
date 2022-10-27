import './Orderer.css';

import { useSelector } from "react-redux";

export default function Orderer() {
    const { name,email, phone} = useSelector(state => state.user);
    
    return (
        <div className='order-container'>
            <h2 className='order-title'>주문자 정보</h2>
            <div style={{'minHeight':'20px'}}></div>
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