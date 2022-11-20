import axios from 'axios';
import { useDispatch } from "react-redux";

import { setCookie } from '../Cookie/Cookie';

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
  const kakaoLoginResponse = await axios.post('https://api.madinbakery.com/user/kakaologin',
    {
      "code": code,
      "redirectUri": process.env.REACT_APP_REDIRECT_URL
    }
  )
  const user = kakaoLoginResponse.data.user;
  window.history.replaceState({}, null, window.location.pathname);
  setCookie("token",user["token"],1);
  setCookie("socialId",user["socialId"],1);
};