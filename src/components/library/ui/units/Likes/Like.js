import './Like.css';

import { useState } from 'react';

import { MenuAddWindow } from '../Menu/Menu';
import LikeDeleteWindow from './LikeDeleteWindow';

export default function Like(props) {
    const [isMenuAddWindowDisplayOn, setMenuAddWindowDisplayOn] = useState(false);
    const [isMenuDeleteWindowOn, setMenuDeleteWindowOn] = useState(false);

    const openMenuAddWindow = () => {
        setMenuAddWindowDisplayOn(true);
    }

    const closeMenuAddWindow = () => {
        setMenuAddWindowDisplayOn(false);
    }
    
    const openDeleteWindow = () => {
        setMenuDeleteWindowOn(true);
    }

    const closeDeleteWindow = () => {
        setMenuDeleteWindowOn(false);
    }

    if (props.isOn) {
        return (
            <div className='like'>
                <img src={props.image} className='like-image' alt='like-menu'></img>
                <div className='like-contents-container'>
                    <span className='like-name'>{props.name}</span>
                    <h3 className='like-price'>{props.price.toLocaleString()}원</h3>
                </div>
                <div className='like-spacer'></div>
                <button className='like-cart-button' onClick={() => openMenuAddWindow()}>
                    <img src={require('../../../icons/cart_white.png')} className='like-cart-button-image'></img>
                </button>
                <button className='like-delete-button' onClick={() => {openDeleteWindow()}}>
                    <span className='like-delete-button-text'>삭제하기</span>
                </button>
                <MenuAddWindow
                    isDisplayOn={isMenuAddWindowDisplayOn}
                    name={props.name}
                    price={props.price}
                    closeEvent={closeMenuAddWindow}
                    menuId={props.menuId}
                    options={props.options}></MenuAddWindow>
                <LikeDeleteWindow
                    isOn={isMenuDeleteWindowOn}
                    id={props.menuId}
                    closeEvent={closeDeleteWindow}></LikeDeleteWindow>
            </div>
        )
    }
}