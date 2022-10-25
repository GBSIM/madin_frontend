import './UserPopupMenu.css';

import { useSelector } from "react-redux";

export default function UserPopupMenu() {
    const { userMenuPopup } = useSelector(state => state.user);

    if (userMenuPopup) {
        return (
            <div className='user-popup-menu-container'>
                <UserMenu text='주문내역'></UserMenu>
                <UserMenu text='배송지 관리'></UserMenu>
                <UserMenu text='적립금'></UserMenu>
                <UserMenu text='쿠폰'></UserMenu>
                <UserMenu text='로그아웃'></UserMenu>
            </div>
        )
    }
}

function UserMenu(props) {
    return (
        <div className='user-menu-container'>
            <button className='user-menu-button' onClick={() => props.clickEvent}>
                <span className='user-menu-button-text'>{props.text}</span>
            </button>
        </div>
    )
}