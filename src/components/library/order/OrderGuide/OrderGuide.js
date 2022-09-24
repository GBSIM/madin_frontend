import './OrderGuide.css';

import { useSelector,useDispatch } from "react-redux";
import { changeOrderType } from '../../../../_reducers/order';

import TwoOptionsButton from '../../ui/unit/TwoOptionsButton/TwoOptionsButton';

export default function OrderGuide() {
    const {orderType} = useSelector(state => state.order);
    const dispatch = useDispatch();
    const orderTypeChangeEvent = (type) => {
        dispatch(changeOrderType(type));
    }
    
    return (
        <div className='order-guide-container'>
            <div className='order-guide-option-button-container'>
                <TwoOptionsButton state={orderType} option1={'개인구매'} option2={'선물하기'} clickEvent={orderTypeChangeEvent}></TwoOptionsButton>
            </div>
        </div>
    )
}