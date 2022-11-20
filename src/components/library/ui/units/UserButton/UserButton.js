import './UserButton.css';
import './UserMenus.css';

import { useState } from 'react';

export default function UserButton(props) {
    const [isUserMenusOn, setUserMenusOn] = useState(false);

    const switchUserMenus = () => {
        if (isUserMenusOn) {
            setUserMenusOn(false);
        } else {
            setUserMenusOn(true);
        }
    }

    if (props.isLogined) {
        return (
            <div className='user-buttons-container'>
                <button className='user-button' onClick={() => switchUserMenus()}>
                    <span className='user-button-text'>{props.name}님</span>
                    <img className='user-button-arrow-image' src={require('../../../icons/inequity_down_grey.png')} alt='arrow-down'></img>
                </button>
                <UserMenus isOn={isUserMenusOn}></UserMenus>
            </div>
            
        )
    }
}

function UserMenus(props) {
    if (props.isOn) {
        return (
            <div className='user-menus'>
                <UserMenuButton text='주문내역'></UserMenuButton>
                <UserMenuButton text='배송지 관리'></UserMenuButton>
                <UserMenuButton text='적립금'></UserMenuButton>
                <UserMenuButton text='쿠폰'></UserMenuButton>
                <UserMenuButton text='로그아웃'></UserMenuButton>
            </div>
        )
    }
}

function UserMenuButton(props) {
    return (
        <button className='user-menu-button'>
            <span className='user-menu-button-text'>{props.text}</span>
        </button>
    )
}