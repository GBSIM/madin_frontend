import axios from 'axios';

import { setCookie, getCookie, deleteCookie } from '../Cookie/Cookie';

const {Kakao} = window;
export const loginWithKakao = () =>{
    Kakao.Auth.authorize({
        redirectUri: process.env.REACT_APP_REDIRECT_URL
    })
}

export const KakaoRedirectHandler = async() => {
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

  return (
    user
  )
};

export const authUser  = async() => {
  try {
      const token = getCookie('token');
      if (token) {
          const authResponse = await axios.post('https://api.madinbakery.com/user/auth',
          {
          "token": token
          });
          if (authResponse.data.user) {
              return (authResponse.data.user);
          }
      }
  } catch(err) {
      console.log(err);
      deleteCookie('token');
  }
};