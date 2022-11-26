import './Cart.css';
import './CartMenu.css';

export default function Cart(props) {
    console.log(props.cart);

    let AllSelectButton;
    AllSelectButton = <img className='cart-all-select-button-image' alt='check' src={require('../../../icons/check_grey.png')}></img>

    const CartMenus = props.cart.map((menu,index) => (
        <CartMenu
            name={menu["name"]}
            price={menu["price"]}
            image={menu["imageUrl"]}
            id={menu["_id"]}
            quantity={menu["quantity"]}
            key={'cart_menu_'+String(index)}></CartMenu>
    ))

    let totalPrice = 0;

    let CartOrderButton;
    if (totalPrice > 0) {
        CartOrderButton = 
        <button className='cart-order-button'>
            <span className='cart-order-button-text'>주문하기</span>
        </button>
    } else {
        CartOrderButton =
        <button className='cart-order-button deactivated'>
            <span className='cart-order-button-text'>주문하기</span>
        </button>
    }

    return (
        <div className='cart'>
            <h1 className='cart-title'>장바구니</h1>
            <div style={{'minHeight':'30px'}}></div>
            <div className='cart-all-select-button-container'>
                <button className='cart-all-select-button'>
                    {AllSelectButton}
                    <span className='cart-all-select-button-text'>전체선택</span>
                </button>
            </div>
            <div style={{'minHeight':'10px'}}></div>
            <div style={{'width':'100%','minHeight':'1px','background':'#c6c6c6'}}></div>
            {CartMenus}
            <div style={{'minHeight':'20px'}}></div>
            <div className='cart-order-button-container'>
                <h2 className='cart-total-price'>총 {totalPrice.toLocaleString()}원</h2>
                <div style={{'minWidth':'15px'}}></div>
                {CartOrderButton}
            </div>
            <div style={{'minHeight':'100px'}}></div>
            
        </div>
    )
}

function CartMenu(props) {
    let CheckButton;
    if (props.isChecked) {
        CheckButton = 
            <button className='cart-menu-select-button'>
                <img className='cart-menu-select-button-image' alt='check' src={require('../../../icons/check_orange.png')}></img>
            </button>
    } else {
        CheckButton = 
            <button className='cart-menu-select-button'>
                <img className='cart-menu-select-button-image' alt='check' src={require('../../../icons/check_grey.png')}></img>
            </button>
    }

    let MinusButtonImage;
    if (props.quantity === 1) {
        MinusButtonImage = <img className='cart-menu-quantity-button-image' alt='activated-minus' src={require('../../../icons/minus_grey.png')}></img>
    } else {
        MinusButtonImage = <img className='cart-menu-quantity-button-image' alt='activated-minus' src={require('../../../icons/minus_black.png')}></img>
    }
    return (
        <div className='cart-menu'>
            {CheckButton}
            <div style={{'minWidth':'20px'}}></div>
            <img className='cart-menu-image' alt='menu' src={props.image}></img>
            <div style={{'minWidth':'20px'}}></div>
            <span className='cart-menu-name'>{props.name}</span>
            <div style={{'flex':'1'}}></div>
            <div className='cart-menu-right-container'>
                <div className='cart-menu-quantity-controller'>
                    <button className='cart-menu-quantity-button'>
                        {MinusButtonImage}
                    </button>
                    <span className='cart-menu-quantity'>{props.quantity}</span>
                    <button className='cart-menu-quantity-button'>
                        <img className='cart-menu-quantity-button-image' alt='activated-plus' src={require('../../../icons/plus_black.png')}></img>
                    </button>
                </div>
                <div style={{'minHeight':'5px'}}></div>
                <h3 className='cart-menu-price'>
                    {(props.price*props.quantity).toLocaleString()}원
                </h3>
            </div>
            <button className='cart-menu-delete-button'>
                <span className='cart-menu-delete-button-text'>삭제하기</span>
            </button>
        </div>
    )
}