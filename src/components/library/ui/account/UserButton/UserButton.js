import './UserButton.css';

import { useSelector } from "react-redux";

export default function UserButton() {
    const { isLogin, name } = useSelector(state => state.user);
    console.log(isLogin);
    console.log(name);

    if (isLogin && name) {
        return (
            <button className='user-button'>
                <span className='user-button-text'>
                    {name}님
                </span>
            </button>
        )
    }
    
}