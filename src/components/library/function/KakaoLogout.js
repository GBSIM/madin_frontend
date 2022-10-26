import axios from "axios"

import { useSelector,useDispatch } from "react-redux";

import { logout } from "../../../_reducers/user";

export const LogoutWithKakao = async() => {
    const dispatch = useDispatch();
    const { socialId } = useSelector(state => state.user);

    const logoutResponse = await axios.post('https://api.madinbakery.com/user/kakaologout', {
        "socialId": socialId
    })
    
    const logoutUser = logoutResponse.data.user;

    if (logoutUser.socialId === socialId) {
        dispatch(logout());
    }    
}