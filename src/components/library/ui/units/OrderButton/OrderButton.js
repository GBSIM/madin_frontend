import './OrderButton.css';

export default function OrderButton(props) {
    let totalPrice = 0;
    props.cart.map((menu) => {
        if (menu["isChecked"]) {
            totalPrice = totalPrice + menu["price"] * menu["quantity"];
        }
    })

    return (
        <button className='order-button'>
            <h3 className='order-button-text'>{totalPrice.toLocaleString()}원 결제하러가기</h3>
        </button>
    )
}