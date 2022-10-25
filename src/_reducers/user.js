import { deleteCookie } from "../components/library/function/Cookie";

export const SAVE_USER_INFO = "USER/SAVE_USER_INFO";
export const LOGOUT = "USER/LOGOUT";
export const CHANGE_USER_MENU_POPUP_STATE = "USER/CHANGE_USER_MENU_POPUP_STATE";

export const saveUserInfo = (userInfo) => ({type:SAVE_USER_INFO, userInfo:userInfo});
export const logout = () => ({type: LOGOUT});
export const changeUserMenuPopupState = () => ({type: CHANGE_USER_MENU_POPUP_STATE});

const initialState = {
    isLogin: false,
    name: "",
    email: "",
    token: "",
    _id: "",
    socialId: "",
    shippings: [],
    orders: [],
    userMenuPopup: false,
}

const user = (state = initialState, action) => {    
    switch (action.type) {
        case SAVE_USER_INFO:
            return {
                ...state,
                isLogin: true,
                name: action.userInfo["name"],
                email: action.userInfo["email"],
                token: action.userInfo["token"],
                _id: action.userInfo["_id"],
                socialId: action.userInfo["socialId"],
                shippings: action.userInfo["shppings"],
                orders: action.userInfo["orders"],
            }
        case LOGOUT:
            deleteCookie('email');
            deleteCookie('socialId');
            deleteCookie('token');
            return {
                initialState,
            }
        case CHANGE_USER_MENU_POPUP_STATE:
            return {
                ...state,
                userMenuPopup: !state.userMenuPopup,
            }
        default:
            return state;
    }
};

export default user;