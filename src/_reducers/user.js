export const SAVE_USER_INFO = "USER/SAVE_USER_INFO"

export const saveUserInfo = (userInfo) => ({type:SAVE_USER_INFO, userInfo:userInfo})

const initialState = {
    isLogin: false,
    name: "",
    email: "",
    token: "",
    _id: "",
    socialId: "",
    shippings: [],
    orders: [],
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
        default:
            return state;
    }
};

export default user;