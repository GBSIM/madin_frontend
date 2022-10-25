import './UserPopupMenu.css';

import { useSelector } from "react-redux";

export default function UserPopupMenu() {
    const { userMenuPopup } = useSelector(state => state.user);

    if (userMenuPopup) {
        return (
            <div className='user-popup-menu-container'>
            </div>
        )
    }
}