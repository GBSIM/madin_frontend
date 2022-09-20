import './Order.css';

import { useSelector,useDispatch } from "react-redux";
import { changeOrderType } from '../../../_reducers/order';

import DesktopHeader from '../../library/ui/header/DesktopHeader/DesktopHeader';
import MobileHeader from '../../library/ui/header/MobileHeader/MobileHeader';
import MobileFooter from '../../library/ui/footer/MobileFooter/MobileFooter';
import OptionButton from '../../library/ui/unit/OptionButton/OptionButton';

export default function Order() {
    const {orderType} = useSelector(state => state.order);
    const dispatch = useDispatch();
    const orderTypeChangeEvent = (type) => {
        dispatch(changeOrderType(type));
    }

    const personalBuyTitle = <h2 className='order-guide-title'>마음대로 고르고 배송받기</h2>;
    const personalBuyContents = <h3 className='order-guide-contents'>원하는 디저트를 장바구니에 넣고 결제하면<br></br>원하는 날짜에 배달해드려요.</h3>;

    const groupBuyTitle = <h2 className='order-guide-title'>맛있는 디저트로 감사의 마음을 전하세요.</h2>;
    const groupBUyContents = <h3 className='order-guide-contents'>원하는 메뉴를<br></br>필요한 개수만큼 자유롭게 골라보세요.</h3>;

    let orderGuideTitle;
    let orderGuideContents;

    if (orderType === '개인구매') {
        orderGuideTitle = personalBuyTitle;
        orderGuideContents = personalBuyContents;
    } else {
        orderGuideTitle = groupBuyTitle;
        orderGuideContents = groupBUyContents;
    }

    return (
        <div className='page'>
            <DesktopHeader></DesktopHeader>
            <MobileHeader></MobileHeader>
            <MobileFooter></MobileFooter>
            <div className='order-guide-frame-container'>
                <div className='order-guide-container'>
                    <div className='order-guide-contents-container'>
                        {orderGuideTitle}
                        {orderGuideContents}
                    </div>
                </div>
                <div className='order-option-container'>
                    <OptionButton state={orderType} option1={'개인구매'} option2={'선물하기'} clickEvent={orderTypeChangeEvent}></OptionButton>
                </div>
            </div>
            <div className='order-menu-frame-container'>
                <div className='order-menu-container'>
                    
                </div>
            </div>
        </div>
    )
}
