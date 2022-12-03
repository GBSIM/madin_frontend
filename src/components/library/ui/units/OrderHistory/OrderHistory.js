import './OrderHistory.css';
import './OrderUnit.css';

export default function OrderHistory(props) {
    let OrderUnits;
    if (props.orders) {
        OrderUnits = props.orders.map((order,index)=>(
            <OrderUnit
                time={order["time"]}
                image={order["image"]}
                item={order["item"]}
                number={order["number"]}
                payment={order["payment"]}
                state={order["state"]}></OrderUnit>
        ))
    } else {
        OrderUnits =
            <div className='order-unit'>
                <span className='order-unit-contents-value'>주문 내역이 없습니다.</span>
            </div>
    }



    return (
        <div className='order-history'>
            <h1 className='order-history-title'>주문 내역</h1>
            <div style={{'minHeight':'30px'}}></div>
            <div style={{'width':'100%','minHeight':'1px','background':'#c6c6c6'}}></div>
            {OrderUnits}
        </div>
    )
}

function OrderUnit(props) {
    return (
        <div className='order-unit'>
            <div className='order-unit-time-container'>
                <span className='order-unit-time'>{props.time}</span>
            </div>
            <div style={{'minHeight':'10px'}}></div>
            <div className='order-unit-row'>
                <img src={props.image} className='order-unit-image' alt='order-item'></img>
                <div className='order-unit-column'>
                    <div className='order-unit-contents'>
                        <span className='order-unit-contents-title'>주문한 상품</span>
                        <span className='order-unit-contents-value'>{props.item}</span>
                    </div>
                    <div className='order-unit-contents'>
                        <span className='order-unit-contents-title'>주문번호</span>
                        <span className='order-unit-contents-value'>{props.number}</span>
                    </div>
                    <div className='order-unit-contents'>
                        <span className='order-unit-contents-title'>결제방법</span>
                        <span className='order-unit-contents-value'>{props.payment}</span>
                    </div>
                    <div className='order-unit-contents'>
                        <span className='order-unit-contents-title'>결제금액</span>
                        <span className='order-unit-contents-value'>{(props.price).toLocaleString()}원</span>
                    </div>
                </div>
                <div className='order-unit-state-container'>
                    <span className='order-unit-state'>{props.state}</span>
                </div>
            </div>
            <button className='order-unit-detail-button'>
                <span className='order-unit-detail-button-text'>상세보기</span>
            </button>
        </div>
    )
}