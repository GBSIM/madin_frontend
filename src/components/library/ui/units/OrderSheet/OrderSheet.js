import './OrderSheet.css';
import './OrderItem.css';

export default function OrderSheet(props) {
    let OrderItems;
    OrderItems = props.cart.map((menu,index) => (
        <OrderItem
            name={menu["name"]}
            quantity={menu["quantity"]}
            price={menu["price"]}
            isOn={menu["isChecked"]}
            option={menu["option"]}
            key={'order_item'+String(index)}></OrderItem>
    ))

    let totalPrice = 0;
    props.cart.map((menu) => {
        if (menu["isChecked"]) {
            if (menu["option"] === "basic") {
                totalPrice = totalPrice + menu["price"] * menu["quantity"];
            } else {
                totalPrice = totalPrice + menu["option"]["price"] * menu["quantity"];
            }
        }
    })

    return (
        <div className='order-sheet'>
            <h1 className='order-sheet-title'>주문 상품</h1>
            <div style={{'minHeight':'30px'}}></div>
            <div style={{'width':'100%','minHeight':'1px','background':'#c6c6c6'}}></div>
            <div style={{'minHeight':'20px'}}></div>
            <div className='order-items-container'>
                {OrderItems}
            </div>
            <div style={{'minHeight':'20px'}}></div>
            <div style={{'width':'100%','minHeight':'1px','background':'#eee'}}></div>
            <div style={{'minHeight':'10px'}}></div>
            <div className='order-sheet-total-price-container'>
                <h2 className='order-sheet-total-price'>총 {totalPrice.toLocaleString()}원</h2>
            </div>
        </div>
    )
}

function OrderItem(props) {
    let itemName;
    let itemPrice;
    if (props.option["name"] !== "basic") {
        itemName = <span className='order-item-text'>{props.name} {props.option["name"]} x {props.quantity}</span>
        itemPrice = <span className='order-item-text'>{(props.quantity*props.option["price"]).toLocaleString()}원</span>
    } else {
        itemName = <span className='order-item-text'>{props.name} x {props.quantity}</span>
        itemPrice = <span className='order-item-text'>{(props.quantity*props.price).toLocaleString()}원</span>
    }
    if (props.isOn) {
        return (
            <div className='order-item'>
                {itemName}
                {itemPrice}
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}