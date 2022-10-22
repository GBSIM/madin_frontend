import React from 'react';

const {Kakao} = window;
export const loginWithKakao = () =>{
    Kakao.Auth.authorize({
        redirectUri: process.env.REACT_APP_REDIRECT_URL
    })
}