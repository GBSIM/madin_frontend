export const SAVE_PERSONAL_ORDER = "ORDER/SAVE_PERSONAL_ORDER";
export const ADD_PERSONAL_MENU_QUANTITY = "ORDER/ADD_PERSONAL_MENU_QUANTITY";
export const SUBTRACT_PERSONAL_MENU_QUANTITY = "ORDER/SUBTRACT_PERSONAL_MENU_QUANTITY";
export const CHAGNE_PEROSNAL_ORDERER_UPDATE_WINDOW = "ORDER/CHAGNE_PEROSNAL_ORDERER_UPDATE_WINDOW";
export const CHAGNE_PEROSNAL_SHIPPING_UPDATE_WINDOW = "ORDER/CHAGNE_PEROSNAL_SHIPPING_UPDATE_WINDOW";

export const savePersonalOrder = (idList,nameList,priceList) => ({type:SAVE_PERSONAL_ORDER, idList:idList, nameList: nameList, priceList:priceList});
export const addPersonalMenuQuantity = (menuId) => ({type:ADD_PERSONAL_MENU_QUANTITY, menuId:menuId});
export const subtractPersonalMenuQuantity = (menuId) => ({type:SUBTRACT_PERSONAL_MENU_QUANTITY, menuId:menuId});
export const changeOrdererUpdateWindow = () => ({type:CHAGNE_PEROSNAL_ORDERER_UPDATE_WINDOW});
export const changePeronalShippingUpdateWindow = () => ({type:CHAGNE_PEROSNAL_SHIPPING_UPDATE_WINDOW});

const initialState = {
    personalOrderIdList: [],
    personalOrderQuantityList: [],
    personalOrderNameList: [],
    personalOrderPriceist: [],
    personalOrdererUpdateOpen: false,
    personalShippingUpdateOpen: false,
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
        case CHAGNE_PEROSNAL_ORDERER_UPDATE_WINDOW:
            return {
                ...state,
                personalOrdererUpdateOpen: !state.personalOrdererUpdateOpen
            }
        case CHAGNE_PEROSNAL_SHIPPING_UPDATE_WINDOW:
            return {
                ...state,
                personalShippingUpdateOpen: !state.personalShippingUpdateOpen
            }
        default:
            return state;
    }
};

export default order;