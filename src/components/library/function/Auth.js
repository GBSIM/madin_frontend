import axios from 'axios';
import { useDispatch } from "react-redux";

import { getCookie } from './Cookie';
import { saveUserInfo, logout } from '../../../_reducers/user';

export const UserAuth = async() => {
    const dispatch = useDispatch();

    const socialId = getCookie("socialId");
    const token = getCookie("token");
    if (!socialId || !token) {
        dispatch(logout());
    } else {
        const user = await axios.post('https://api.madinbakery.com/user/auth/'+socialId,
            {
                "token": token 
            }
        )
        if (user) {
            dispatch(saveUserInfo(user));
        } else {
            dispatch(logout());
        }
    }
}