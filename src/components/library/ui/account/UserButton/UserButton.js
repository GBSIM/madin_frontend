import './UserButton.css';

import { useSelector } from "react-redux";

export default function UserButton() {
    const { isLogin, name } = useSelector(state => state.user);

    if (isLogin && name) {
        return (
            <button className='user-button'>
                <span className='user-button-text'>
                    {name}님
                </span>
                <img className='user-button-icon' src={require('../../../icons/arrow_down_grey.png')}></img>
            </button>
        )
    }
    
}