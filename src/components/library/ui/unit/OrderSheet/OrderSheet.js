import './OrderSheet.css';

import OrangeButton from '../OrangeButton/OrangeButton';

export default function OrderSheet(props) {
    return (
        <div className='order-sheet-container'>
            <h3 className='order-sheet-title'>장바구니</h3>
            <div className='order-button-container'>
                <OrangeButton
                    width='230px'
                    height='36px'
                    borderRadius='7px'
                    text='주문하러가기'
                    ></OrangeButton>
            </div>
        </div>
    )
}