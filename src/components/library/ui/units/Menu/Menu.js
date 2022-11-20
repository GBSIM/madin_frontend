import './Menu.css';
import './Cart.css';
import './MenuAddWindow.css';

import { useState } from 'react';

export default function Menu(props) {
    const [isMenuAddWindowDisplayOn, setMenuAddWindowDisplayOn] = useState(false);

    const switchMenuAddWindowDisplay = () => {
        if (isMenuAddWindowDisplayOn) {
            setMenuAddWindowDisplayOn(false);            
        } else {
            setMenuAddWindowDisplayOn(true);
        }
    }

    return (
        <div className='menu'>
            <button className='menu-image-button'>
                <img className='menu-image' src={props.imageUrl} alt='menu'></img>                
                <Cart openMenuAddWindow = {switchMenuAddWindowDisplay}></Cart>
            </button>
            <span className='menu-name'>{props.name}</span>
            <span className='menu-price'>{props.price.toLocaleString()}원</span>
            <MenuAddWindow 
                isDisplayOn={isMenuAddWindowDisplayOn}
                name={props.name}
                price={props.price}
                closeEvent={switchMenuAddWindowDisplay}></MenuAddWindow>
        </div>
    )
}

function Cart(props) {
    return (
        <button className='cart-button' onClick={() => props.openMenuAddWindow()}>
            <img className='cart-button-image' src={require('../../../icons/cart_white.png')} alt='cart'></img>
        </button>
    )
}

function MenuAddWindow(props) {
    const [quantity, setQuantity] = useState(1);

    const addQuantity = () => {
        setQuantity(quantity + 1);
    }

    const subtractQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    let MinusButtonImage;
    if (quantity === 1) {
        MinusButtonImage = <img className='menu-add-window-quantity-button-image' src={require('../../../icons/minus_grey.png')} alt='deactivated-minus'></img>
    } else {
        MinusButtonImage = <img className='menu-add-window-quantity-button-image' src={require('../../../icons/minus_black.png')} alt='activated-minus'></img>
    }
    
    if (props.isDisplayOn) {
        return (
            <div className='menu-add-window-background'>
                <div className='menu-add-window'>
                    <div className='menu-add-window-info-container'>
                        <span className='menu-add-window-name'>{props.name}</span>
                        <span className='menu-add-window-price'>{props.price.toLocaleString()}원</span>
                    </div>
                    <div style={{'minHeight':'20px'}}></div>
                    <div className='menu-add-window-quantity-container'>
                        <div className='menu-add-window-quantity-controller'>
                            <button className='menu-add-window-quantity-button' onClick={() => subtractQuantity()}>
                                {MinusButtonImage}
                            </button>
                            <span className='menu-add-window-quantity'>{quantity}</span>
                            <button className='menu-add-window-quantity-button' onClick={() => addQuantity()}>
                                <img className='menu-add-window-quantity-button-image' src={require('../../../icons/plus_black.png')} alt='activated-plus'></img>
                            </button>
                        </div>
                    </div>
                    <div style={{'minHeight':'30px'}}></div>
                    <div className='menu-add-window-divider'></div>
                    <div style={{'minHeight':'20px'}}></div>
                    <div className='menu-add-window-info-container'>
                        <span className='menu-add-window-price-title'>합계</span>
                        <h2 className='menu-add-window-total-price'>{(props.price*quantity).toLocaleString()}원</h2>
                    </div>
                    <div style={{'minHeight':'50px'}}></div>
                    <button className='menu-add-window-save-button'>
                        <span className='menu-add-window-save-button-text'>장바구니에 담기</span>
                    </button>
                    <div style={{'minHeight':'10px'}}></div>
                    <button className='menu-add-window-cancel-button' onClick={() => {props.closeEvent()}}>
                        <span className='menu-add-window-cancel-button-text'>닫기</span>
                    </button>
                </div>
            </div>
        )
    }
}