export const SAVE_PERSONAL_ORDER = "ORDER/SAVE_PERSONAL_ORDER";
export const ADD_PERSONAL_MENU_QUANTITY = "ORDER/ADD_PERSONAL_MENU_QUANTITY";
export const SUBTRACT_PERSONAL_MENU_QUANTITY = "ORDER/SUBTRACT_PERSONAL_MENU_QUANTITY";
export const CHAGNE_ORDERER_UPDATE_WINDOW = "ORDER/CHAGNE_ORDERER_UPDATE_WINDOW";
export const CHAGNE_SHIPPING_ADD_WINDOW = "ORDER/CHAGNE_SHIPPING_ADD_WINDOW";
export const CHANGE_SHIPPING_CHECKED_INDEX = "ORDER/CHANGE_SHIPPING_CHECKED_INDEX";
export const CHANGE_PAYMENT_METHOD = "ORDER/CHANGE_PAYMENT_METHOD";
export const CHAGNE_GROUP_ORDER_BOX_SIZE = "ORDER/CHAGNE_GROUP_ORDER_BOX_SIZE";
export const ADD_GROUP_ORDER_BOX_QUANTITY = "ORDER/ADD_GROUP_ORDER_BOX_QUANTITY";
export const SUBTRACT_GROUP_ORDER_BOX_QUANTITY = "ORDER/SUBTRACT_GROUP_ORDER_BOX_QUANTITY";

export const savePersonalOrder = (idList,nameList,priceList) => ({type:SAVE_PERSONAL_ORDER, idList:idList, nameList: nameList, priceList:priceList});
export const addPersonalMenuQuantity = (menuId) => ({type:ADD_PERSONAL_MENU_QUANTITY, menuId:menuId});
export const subtractPersonalMenuQuantity = (menuId) => ({type:SUBTRACT_PERSONAL_MENU_QUANTITY, menuId:menuId});
export const changeOrdererUpdateWindow = () => ({type:CHAGNE_ORDERER_UPDATE_WINDOW});
export const changeShippingAddWindow = () => ({type:CHAGNE_SHIPPING_ADD_WINDOW});
export const changeShippingChekcedIndex = (index) => ({type:CHANGE_SHIPPING_CHECKED_INDEX, index: index});
export const changePaymentMethod = (method) => ({type:CHANGE_PAYMENT_METHOD, method: method});
export const changeGroupOrderBoxSize = (size) => ({type:CHAGNE_GROUP_ORDER_BOX_SIZE, size: size});
export const addGroupOrderBoxQuantity = () => ({type:ADD_GROUP_ORDER_BOX_QUANTITY});
export const subtractGroupOrderBoxQuantity = () => ({type:SUBTRACT_GROUP_ORDER_BOX_QUANTITY});

const initialState = {
    personalOrderIdList: [],
    personalOrderQuantityList: [],
    personalOrderNameList: [],
    personalOrderPriceist: [],
    ordererUpdateWindowOpen: false,
    shippingAddWindowOpen: false,
    shippingUpdateWindowOpen: false,
    shippingCheckedIndex: 0,
    paymentMethod: "kakao",
    groupOrderBoxSize: 3,
    groupOrderBoxQuantity: 0,
}

const order = (state = initialState, action) => {    
    switch (action.type) {
        case SAVE_PERSONAL_ORDER:
            return {
                ...state,
                personalOrderIdList: action.idList,
                personalOrderNameList: action.nameList,
                personalOrderPriceist: action.priceList,
                personalOrderQuantityList: Array(action.idList.length).fill(0),
            }
        case ADD_PERSONAL_MENU_QUANTITY:
            let increaseQuantityList = state.personalOrderQuantityList;
            increaseQuantityList[state.personalOrderIdList.indexOf(action.menuId)] = increaseQuantityList[state.personalOrderIdList.indexOf(action.menuId)] + 1;
            return {
                ...state,
                personalOrderQuantityList: increaseQuantityList
            }
        case SUBTRACT_PERSONAL_MENU_QUANTITY:
            let decreaseQuantityList = state.personalOrderQuantityList;
            if (decreaseQuantityList[state.personalOrderIdList.indexOf(action.menuId)] > 0) {
                decreaseQuantityList[state.personalOrderIdList.indexOf(action.menuId)] = decreaseQuantityList[state.personalOrderIdList.indexOf(action.menuId)] - 1;
                return {
                    ...state,
                    personalOrderQuantityList: decreaseQuantityList
                }
            } else {
                return {
                    ...state,
                }
            }
        case CHAGNE_ORDERER_UPDATE_WINDOW:
            return {
                ...state,
                ordererUpdateWindowOpen: !state.ordererUpdateWindowOpen
            }
        case CHAGNE_SHIPPING_ADD_WINDOW:
            return {
                ...state,
                shippingAddWindowOpen: !state.shippingAddWindowOpen
            }
        case CHANGE_SHIPPING_CHECKED_INDEX:
            return {
                ...state,
                shippingCheckedIndex: action.index
            }
        case CHANGE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.method
            }
        case CHAGNE_GROUP_ORDER_BOX_SIZE:
            return {
                ...state,
                groupOrderBoxSize: action.size
            }
        case ADD_GROUP_ORDER_BOX_QUANTITY:
            return {
                ...state,
                groupOrderBoxQuantity: state.groupOrderBoxQuantity + 1
            }
        case SUBTRACT_GROUP_ORDER_BOX_QUANTITY:
            if (state.groupOrderBoxQuantity > 0) {
                return {
                    ...state,
                    groupOrderBoxQuantity: state.groupOrderBoxQuantity - 1
                }
            } else {
                return {
                    ...state
                }
            }
        default:
            return state;
    }
};

export default order;