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
        await axios.post('https://api.madinbakery.com/user/auth/'+socialId,
            {
                "token": token 
            }
        ).then((res) => {
            if (res.data.user) {
                dispatch(saveUserInfo(res.data.user));
            } else {
                console.log(res);
                dispatch(logout());
                deleteCookie('email');
                deleteCookie('socialId');
                deleteCookie('token');
            }
        }).catch((err) => {
            console.log(err);
            dispatch(logout());
            deleteCookie('email');
            deleteCookie('socialId');
            deleteCookie('token');
        })
    }
}