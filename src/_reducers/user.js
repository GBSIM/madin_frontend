export const SAVE_USER_INFO = "USER/SAVE_USER_INFO";
export const LOGOUT = "USER/LOGOUT";
export const OPEN_USER_MENU = "USER/OPEN_USER_MENU";
export const CLOSE_USER_MENU = "USER/CLOSE_USER_MENU";

export const saveUserInfo = (userInfo) => ({type:SAVE_USER_INFO, userInfo:userInfo});
export const logout = () => ({type: LOGOUT});
export const openUserMenu = () => ({type: OPEN_USER_MENU});
export const closeUserMenu = () => ({type: CLOSE_USER_MENU});

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
            return {
                ...state,
                initialState,
            }
        case OPEN_USER_MENU:
            console.log("open the user menu")
            return {
                ...state,
                userMenuPopup: true,
            }
        case CLOSE_USER_MENU:
            return {
                ...state,
                userMenuPopup: false,
            }
        default:
            return state;
    }
};

export default user;