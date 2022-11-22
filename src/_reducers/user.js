export const LOGIN = "USER/LOGIN";
export const LOGOUT = "USER/LOGOUT";
export const SAVE_NAME = "USER/SAVE_NAME";
export const SAVE_CART = "USER/SAVE_CART";

export const login = () => ({type:LOGIN});
export const logout = () => ({type:LOGOUT});
export const saveName = (name) => ({type:SAVE_NAME, name:name});
export const saveCart = (cart) => ({type:SAVE_CART, cart: cart});

const initialState = {
    isLogined: false,
    name: "",
    cart: [],
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLogined: true
            }
        case LOGOUT:
            return {
                ...state,
                isLogined: false
            }
        case SAVE_NAME:
            return {
                ...state,
                name: action.name
            }
        case SAVE_CART:
            return {
                ...state,
                cart: action.cart
            }
        default:
            return state;
    }
};

export default user;