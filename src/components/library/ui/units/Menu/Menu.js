import './Menu.css';
import './Cart.css';

export default function Menu(props) {
    return (
        <div className='menu'>
            <button className='menu-image-button'>
                <img className='menu-image' src={props.imageUrl} alt='menu'></img>                
                <Cart></Cart>
            </button>
            <span className='menu-name'>{props.name}</span>
            <span className='menu-price'>{props.price.toLocaleString()}원</span>
        </div>
    )
}

function Cart() {
    return (
        <button className='cart-button'>
            <img className='cart-button-image' src={require('../../../icons/cart_white.png')}></img>
        </button>
    )
}