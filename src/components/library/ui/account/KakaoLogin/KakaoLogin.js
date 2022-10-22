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
  let grant_type = "authorization_code";
  let client_id = "c49e9d7fad13c64229c3899523a2ba6b";
  await axios.post('https://api.madinbakery.com/user/kakao',
    {
      "code": code,
      "redirectUri": process.env.REACT_APP_REDIRECT_URL
    }
  )
};