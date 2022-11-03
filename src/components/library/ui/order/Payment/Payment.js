import './Payment.css';

import OrangeButton from '../../unit/OrangeButton/OrangeButton';
import OrangeLineButton from '../../unit/OrangeLineButton/OrangeLineButton';

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

    return (
        <div className='order-container'>
            <h2 className='order-title'>결제 수단</h2>
            <div style={{'minHeight':'30px'}}></div>
            <OrangeButton width='400px' height='50px' text={totalPrice.toLocaleString()+'원 결제하기'} borderRadius='6px'></OrangeButton>
        </div>
    )
}