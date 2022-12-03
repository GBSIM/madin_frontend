export const LOGIN = "USER/LOGIN";
export const LOGOUT = "USER/LOGOUT";
export const SAVE_NAME = "USER/SAVE_NAME";
export const SAVE_CART = "USER/SAVE_CART";
export const SAVE_SHIPPING = "USER/SAVE_SHIPPING";
export const SAVE_EMAIL = "USER/SAVE_EMAIL";
export const SAVE_PHONE = "USER/SAVE_PHONE";

export const login = () => ({type:LOGIN});
export const logout = () => ({type:LOGOUT});
export const saveName = (name) => ({type:SAVE_NAME, name:name});
export const saveCart = (cart) => ({type:SAVE_CART, cart: cart});
export const saveShipping = (shippings) => ({type:SAVE_SHIPPING, shippings: shippings});
export const saveEmail = (email) => ({type:SAVE_EMAIL, email: email});
export const savePhone = (phone) => ({type:SAVE_PHONE, phone: phone});

const initialState = {
    isLogined: false,
    name: "",
    cart: [],
    shippings: [],
    email: "",
    phone: "",
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
                isLogined: false,
                name: "",
                cart: [],
                shippings: [],
                email: "",
                phone: "",
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
        case SAVE_SHIPPING:
            return {
                ...state,
                shippings: action.shippings
            }
        case SAVE_EMAIL:
            return {
                ...state,
                email: action.email
            }
        case SAVE_PHONE:
            return {
                ...state,
                phone: action.phone
            }
        default:
            return state;
    }
};

export default user;