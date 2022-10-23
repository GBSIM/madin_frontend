import React from 'react';

import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const {Kakao} = window;
export const loginWithKakao = () =>{
    Kakao.Auth.authorize({
        redirectUri: process.env.REACT_APP_REDIRECT_URL
    })
}

export const KakaoRedirectHandler = async() => {
  let params = new URL(document.location.toString()).searchParams;
  let code = params.get("code");
  console.log(code);
  // const kakaoLoginResponse = await axios.post('https://api.madinbakery.com/user/kakao',
  //   {
  //     "code": code,
  //     "redirectUri": process.env.REACT_APP_REDIRECT_URL
  //   }
  // )
  // const user = kakaoLoginResponse.data.user;
  // console.log(user);
  window.history.replaceState({}, null, window.location.pathname);
};