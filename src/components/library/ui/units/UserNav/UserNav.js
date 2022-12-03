import './UserNav.css';
import './UserNavButton.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserNav() {
    const [userPage, setUserPage] = useState('order');

    const navigate = useNavigate();

    const movePage = (nextPage) => {
        setUserPage(nextPage);
        navigate('/user/'+nextPage);
        window.scrollTo(0,0);
    }

    return (
        <div className='user-nav'>
            <UserNavButton text='주문내역' isActivated={userPage==='order'} clickEvent={movePage} clickEventInput='order'></UserNavButton>
            <UserNavButton text='배송지 관리' isActivated={userPage==='shipping'} clickEvent={movePage} clickEventInput='shipping'></UserNavButton>
            <UserNavButton text='쿠폰' isActivated={userPage==='coupon'} clickEvent={movePage} clickEventInput='coupon'></UserNavButton>
        </div>
    )
}

function UserNavButton(props) {
    if (props.isActivated) {
        return (
            <button className='user-nav-button on' onClick={() => props.clickEvent(props.clickEventInput)}>
                <span className='user-nav-button-text on'>
                    {props.text}
                </span>
            </button>
        )
    } else {
        return (
            <button className='user-nav-button' onClick={() => props.clickEvent(props.clickEventInput)}>
                <span className='user-nav-button-text'>
                    {props.text}
                </span>
            </button>
        )
    }
}

