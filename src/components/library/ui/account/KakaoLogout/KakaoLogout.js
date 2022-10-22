import './KakaoLogout.css';

import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import { switchLoginStatusFalse } from '../../../../../_reducers/user';

export default function KakaoLogout() {
    const dispatch = useDispatch();
    const KakaoLogoutHandler = () => {
        if (window.Kakao.Auth.getAccessToken()) {
            window.Kakao.Auth.logout();
            // window.Kakao.API.request({
            //     url: '/v1/user/unlink',
            //     success: function (response) {
            //     console.log(response);
            //     },
            //     fail: function (error) {
            //     console.log(error);
            //     },
            // });
            alert('로그아웃이 완료되었습니다.');
            window.Kakao.Auth.setAccessToken(undefined);
            dispatch(switchLoginStatusFalse());
        }
    };
    return (
        <div>
        <button id="custom-logout-btn" onClick={KakaoLogoutHandler} className='kakao-logout-button'>
            <span className='kakao-logout-button-text'>로그아웃</span>
        </button>
        </div>
    );
};


