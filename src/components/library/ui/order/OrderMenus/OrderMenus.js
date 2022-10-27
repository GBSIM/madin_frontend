import './OrderMenus.css';

export default function OrderMenus(props) {
    const quantityArrayValid = (Array.isArray(props.quantityList) && props.quantityList.length !== 0);
    const priceArrayValid = (Array.isArray(props.priceList) && props.priceList.length !== 0);
    
    let OrderMenuList;
    if (quantityArrayValid && priceArrayValid) {
        OrderMenuList = props.nameList.map((name,index) => (
            <OrderMenu
                name={name}
                quantity={props.quantityList[index]}
                price={props.priceList[index]*props.quantityList[index]}
                key={'order_menu_'+name}></OrderMenu>));
    }

    let totalPrice;
    if (quantityArrayValid && priceArrayValid) {
        const totalPriceArray = props.quantityList.map((quantity,index) => quantity*props.priceList[index]);
        totalPrice = totalPriceArray.reduce((a,b) => (a + b));
    } else {
        totalPrice = 0;
    }
    
    return (
        <div className='order-container'>
            <h2 className='order-title'>주문서</h2>
            <div style={{'minHeight':'30px'}}></div>
            <div className='order-menu-list-container'>
                {OrderMenuList}
            </div>
            <div style={{'marginTop':'20px','marginBottom':'20px','minHeight':'1px','background':'#C6C6C6','minWidth':'320px'}}></div>
            <div className='order-menus-price-container'>
                <span className='order-menus-price-text'>총 {totalPrice.toLocaleString()}원</span>            
            </div>
        </div>
    )
}

function OrderMenu(props) {
    if (props.quantity) {
        return (
            <div className='order-menu-container'>
                <span className='order-menu-text'>{props.name} x {props.quantity}</span>
                <span className='order-menu-text'>{props.price.toLocaleString()}원</span>
            </div>
        )
    }
}

