import axios from "axios";

import { setCookie } from '../Cookie/Cookie';

export const loginWidthNaver = () => {
    window.location.href = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' 
                        + 'WpWqvTCMbQqXK4On9905' 
                        + '&redirect_uri=' + process.env.REACT_APP_REDIRECT_URL
                        + '&state=' + 'RANDOM_STATE';
    setCookie("socialLogin","naver",1);
}

export const NaverRedirectHandler = async() => {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code");
    let state = params.get("state");
    const naverLoginResponse = await axios.post('https://api.madinbakery.com/user/naverlogin',
        {
        "code": code,
        "state": state,
        "redirectUri": process.env.REACT_APP_REDIRECT_URL
        }
    )
    const user = naverLoginResponse.data.user;
    window.history.replaceState({}, null, window.location.pathname);
    setCookie("token",user["token"],1);
    return (
        user
    )
};