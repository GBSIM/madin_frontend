import './UserPopupMenu.css';

import { useSelector,useDispatch } from "react-redux";
import axios from 'axios';

import { logout } from '../../../../../_reducers/user';
import { useNavigate } from 'react-router-dom';
import { changePage } from '../../../../../_reducers/nav';

export default function UserPopupMenu() {
    const { userMenuPopup, socialId } = useSelector(state => state.user);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const logoutEvent = async () => {
        dispatch(changePage('personal'));
        navigate('/personal');
        window.scrollTo(0,0);
        const logoutResponse = await axios.post('https://api.madinbakery.com/user/kakaologout', {
            "socialId": socialId
        });
        const logoutUser = logoutResponse.data.user;
        if (logoutUser.socialId === socialId) {
            dispatch(logout());
        }
        window.alert('로그아웃이 완료되었습니다. \n다음에 또 방문해주세요!\n- Madin -')
    }

    if (userMenuPopup) {
        return (
            <div className='user-popup-menu-container'>
                <UserMenu text='주문내역'></UserMenu>
                <UserMenu text='배송지 관리'></UserMenu>
                <UserMenu text='적립금'></UserMenu>
                <UserMenu text='쿠폰'></UserMenu>
                <UserMenu text='로그아웃' clickEvent={logoutEvent}></UserMenu>
            </div>
        )
    }
}

function UserMenu(props) {
    return (
        <div className='user-menu-container'>
            <button className='user-menu-button' onClick={() => props.clickEvent()}>
                <span className='user-menu-button-text'>{props.text}</span>
            </button>
        </div>
    )
}