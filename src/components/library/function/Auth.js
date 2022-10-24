import axios from 'axios';
import { useDispatch } from "react-redux";

import { getCookie, deleteCookie } from './Cookie';
import { saveUserInfo, logout } from '../../../_reducers/user';

export const UserAuth = async() => {
    const dispatch = useDispatch();

    const socialId = getCookie("socialId");
    const token = getCookie("token");
    if (!socialId || !token) {
        dispatch(logout());
    } else {
        const authResponse = await axios.post('https://api.madinbakery.com/user/auth/'+socialId,
            {
                "token": token 
            }
        )
        if (authResponse.data.user) {
            dispatch(saveUserInfo(authResponse.data.user));
        } else {
            dispatch(logout());
            deleteCookie('email');
            deleteCookie('socialId');
            deleteCookie('token');
        }
    }
}