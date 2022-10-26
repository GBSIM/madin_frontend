import './OrderMenus.css';

import { useSelector } from "react-redux";

export default function OrderMenus(props) {
    const { personalOrderQuantityList,personalOrderNameList,personalOrderPriceist } = useSelector(state => state.order);
    
    let OrderMenuList;
    if (props.type === 'personal') {
        OrderMenuList = personalOrderNameList.map((name,index) => (
            <OrderMenu
                name={name}
                quantity={personalOrderQuantityList[index]}
                price={personalOrderPriceist[index]}
                key={'personal_order_menu_'+name}></OrderMenu>
        ))
    }


    return (
        <div className='order-container'>
            <h2 className='order-title'>주문서</h2>
            <div style={{'minHeight':'30px'}}></div>
            {OrderMenuList}
        </div>
    )
}

function OrderMenu(props) {
    return (
        <div className='order-menu-container'>
            <span className='order-menu-text'>{props.name} x {props.quantity}</span>
            <span className='order-menu-text'>{props.price.toLocaleString()}원</span>
        </div>
    )
}

