import React from 'react';

import axios from 'axios';
import { useDispatch } from "react-redux";

import { saveUserInfo } from '../../../_reducers/user';
import { setCookie } from './Cookie';

const {Kakao} = window;
export const loginWithKakao = () =>{
    Kakao.Auth.authorize({
        redirectUri: process.env.REACT_APP_REDIRECT_URL
    })
}

export const KakaoRedirectHandler = async() => {
  const dispatch = useDispatch();
  let params = new URL(document.location.toString()).searchParams;
  let code = params.get("code");
  console.log(code);
  const kakaoLoginResponse = await axios.post('https://api.madinbakery.com/user/kakaologin',
    {
      "code": code,
      "redirectUri": process.env.REACT_APP_REDIRECT_URL
    }
  )
  const user = kakaoLoginResponse.data.user;
  window.history.replaceState({}, null, window.location.pathname);
  dispatch(saveUserInfo(user));
  setCookie("token",user["token"],1);
  setCookie("email",user["email"],1);
  setCookie("socialId",user["socialId"],1);
};