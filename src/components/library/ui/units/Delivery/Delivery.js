import './Delivery.css';

export default function Delivery(props) {
    return (
        <div className='delivery'>
            <h1 className='delivery-title'>배송지</h1>
            <div style={{'minHeight':'30px'}}></div>
            <div style={{'width':'100%','minHeight':'1px','background':'#c6c6c6'}}></div>
        </div>
    )
}