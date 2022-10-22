import React from 'react';

import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";

const {Kakao} = window;
export const loginWithKakao = () =>{
    Kakao.Auth.authorize({
        redirectUri: process.env.REACT_APP_REDIRECT_URL
    })
}
export const KakaoRedirectHandler = () => {
    const dispatch = useDispatch();
    useEffect(()=> {
      let params = new URL(document.location.toString()).searchParams;
      let code = params.get("code");
      let grant_type = "authorization_code";
      let client_id = "c49e9d7fad13c64229c3899523a2ba6b";
  
      axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}&code=${code}`
          , {
      headers: {
          'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then((res) => {
        window.Kakao.Auth.setAccessToken(res.data.access_token);
        window.Kakao.API.request({
            url: "/v2/user/me",
        }).then(async(data) => {
          console.log(data);
          const userGetResponse = await axios.get('https://api.madinbakery.com/user/'+data.id);
          if (!userGetResponse.data.user) {
            await axios.post('https://api.madinbakery.com/user',{
              "code": data.id,
              "username": data.properties.nickname,
              "email": data.kakao_account.email
            }).then((res) => {
              console.log(res);
            }).catch((err) => {
              console.log(err);
            })
          }
        }    
      )
    })
    }, [])
  };