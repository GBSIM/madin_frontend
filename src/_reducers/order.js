export const SAVE_PERSONAL_ORDER = "ORDER/SAVE_PERSONAL_ORDER";
export const SAVE_GROUP_ORDER = "ORDER/SAVE_GROUP_ORDER";
export const SAVE_PICKUP_ORDER = "ORDER/SAVE_PICKUP_ORDER";
export const ADD_PERSONAL_MENU_QUANTITY = "ORDER/ADD_PERSONAL_MENU_QUANTITY";
export const SUBTRACT_PERSONAL_MENU_QUANTITY = "ORDER/SUBTRACT_PERSONAL_MENU_QUANTITY";
export const CHAGNE_ORDERER_UPDATE_WINDOW = "ORDER/CHAGNE_ORDERER_UPDATE_WINDOW";
export const CHAGNE_SHIPPING_ADD_WINDOW = "ORDER/CHAGNE_SHIPPING_ADD_WINDOW";
export const CHANGE_SHIPPING_CHECKED_INDEX = "ORDER/CHANGE_SHIPPING_CHECKED_INDEX";
export const CHANGE_PAYMENT_METHOD = "ORDER/CHANGE_PAYMENT_METHOD";
export const CHAGNE_GROUP_ORDER_BOX_SIZE = "ORDER/CHAGNE_GROUP_ORDER_BOX_SIZE";
export const ADD_GROUP_ORDER_BOX_QUANTITY = "ORDER/ADD_GROUP_ORDER_BOX_QUANTITY";
export const SUBTRACT_GROUP_ORDER_BOX_QUANTITY = "ORDER/SUBTRACT_GROUP_ORDER_BOX_QUANTITY";
export const ADD_GROUP_MENU_QUANTITY = "ORDER/ADD_GROUP_MENU_QUANTITY";
export const SUBTRACT_GROUP_MENU_QUANTITY = "ORDER/SUBTRACT_GROUP_MENU_QUANTITY";
export const INITIALIZE_GROUP_MENU_QUANTITY = "ORDER/INITIALIZE_GROUP_MENU_QUANTITY";
export const ADD_PICKUP_MENU_QUANTITY = "ORDER/ADD_PICKUP_MENU_QUANTITY";
export const SUBTRACT_PICKUP_MENU_QUANTITY = "ORDER/SUBTRACT_PICKUP_MENU_QUANTITY";

export const savePersonalOrder = (idList,nameList,priceList) => ({type:SAVE_PERSONAL_ORDER, idList:idList, nameList: nameList, priceList:priceList});
export const saveGroupOrder = (idList,nameList,priceList) => ({type:SAVE_GROUP_ORDER, idList:idList, nameList: nameList, priceList:priceList});
export const savePickupOrder = (idList,nameList,priceList) => ({type:SAVE_PICKUP_ORDER, idList:idList, nameList: nameList, priceList:priceList});
export const addPersonalMenuQuantity = (menuId) => ({type:ADD_PERSONAL_MENU_QUANTITY, menuId:menuId});
export const subtractPersonalMenuQuantity = (menuId) => ({type:SUBTRACT_PERSONAL_MENU_QUANTITY, menuId:menuId});
export const changeOrdererUpdateWindow = () => ({type:CHAGNE_ORDERER_UPDATE_WINDOW});
export const changeShippingAddWindow = () => ({type:CHAGNE_SHIPPING_ADD_WINDOW});
export const changeShippingChekcedIndex = (index) => ({type:CHANGE_SHIPPING_CHECKED_INDEX, index: index});
export const changePaymentMethod = (method) => ({type:CHANGE_PAYMENT_METHOD, method: method});
export const changeGroupOrderBoxSize = (size) => ({type:CHAGNE_GROUP_ORDER_BOX_SIZE, size: size});
export const addGroupOrderBoxQuantity = () => ({type:ADD_GROUP_ORDER_BOX_QUANTITY});
export const subtractGroupOrderBoxQuantity = () => ({type:SUBTRACT_GROUP_ORDER_BOX_QUANTITY});
export const addGroupMenuQuantity = (menuId) => ({type:ADD_GROUP_MENU_QUANTITY, menuId:menuId});
export const subtractGroupMenuQuantity = (menuId) => ({type:SUBTRACT_GROUP_MENU_QUANTITY, menuId:menuId});
export const intializeGroupMenuQuantity = () => ({type:INITIALIZE_GROUP_MENU_QUANTITY});
export const addPickupMenuQuantity = (menuId) => ({type:ADD_PICKUP_MENU_QUANTITY, menuId:menuId});
export const subtractPickupMenuQuantity = (menuId) => ({type:SUBTRACT_PICKUP_MENU_QUANTITY, menuId:menuId});

const initialState = {
    personalOrderIdList: [],
    personalOrderQuantityList: [],
    personalOrderNameList: [],
    personalOrderPriceist: [],
    groupOrderIdList: [],
    groupOrderQuantityList: [],
    groupOrderNameList: [],
    groupOrderPriceist: [],
    pickupOrderIdList: [],
    pickupOrderQuantityList: [],
    pickupOrderNameList: [],
    pickupOrderPriceist: [],
    ordererUpdateWindowOpen: false,
    shippingAddWindowOpen: false,
    shippingUpdateWindowOpen: false,
    shippingCheckedIndex: 0,
    paymentMethod: "kakao",
    groupOrderBoxSize: 3,
    groupOrderBoxQuantity: 10,
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
        case SAVE_GROUP_ORDER:
            return {
                ...state,
                groupOrderIdList: action.idList,
                groupOrderNameList: action.nameList,
                groupOrderPriceist: action.priceList,
                groupOrderQuantityList: Array(action.idList.length).fill(0),
            }
        case SAVE_PICKUP_ORDER:
            return {
                ...state,
                pickupOrderIdList: action.idList,
                pickupOrderNameList: action.nameList,
                pickupOrderPriceist: action.priceList,
                pickupOrderQuantityList: Array(action.idList.length).fill(0),
            }
        case ADD_PERSONAL_MENU_QUANTITY:
            let increasePersonalQuantityList = state.personalOrderQuantityList;
            increasePersonalQuantityList[state.personalOrderIdList.indexOf(action.menuId)] = increasePersonalQuantityList[state.personalOrderIdList.indexOf(action.menuId)] + 1;
            return {
                ...state,
                personalOrderQuantityList: increasePersonalQuantityList
            }
        case SUBTRACT_PERSONAL_MENU_QUANTITY:
            let decreasePersonalQuantityList = state.personalOrderQuantityList;
            if (decreasePersonalQuantityList[state.personalOrderIdList.indexOf(action.menuId)] > 0) {
                decreasePersonalQuantityList[state.personalOrderIdList.indexOf(action.menuId)] = decreasePersonalQuantityList[state.personalOrderIdList.indexOf(action.menuId)] - 1;
                return {
                    ...state,
                    personalOrderQuantityList: decreasePersonalQuantityList
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
            if (state.groupOrderBoxQuantity > 10) {
                return {
                    ...state,
                    groupOrderBoxQuantity: state.groupOrderBoxQuantity - 1
                }
            } else {
                return {
                    ...state
                }
            }
        case ADD_GROUP_MENU_QUANTITY:
            let groupQuantitySum;
            let groupQuantityArrayValid = (Array.isArray(state.groupOrderQuantityList) && state.groupOrderQuantityList.length !== 0);
            if (groupQuantityArrayValid) {
                groupQuantitySum = state.groupOrderQuantityList.reduce((a,b) => (a + b));
            } else {
                groupQuantitySum = 0;
            }
            if (groupQuantitySum < state.groupOrderBoxSize) {
                let increaseGroupQuantityList = state.groupOrderQuantityList;
                increaseGroupQuantityList[state.groupOrderIdList.indexOf(action.menuId)] = increaseGroupQuantityList[state.groupOrderIdList.indexOf(action.menuId)] + 1;
                return {
                    ...state,
                    groupOrderQuantityList: increaseGroupQuantityList
                }
            }
            break;
        case SUBTRACT_GROUP_MENU_QUANTITY:
            let decreaseGroupQuantityList = state.groupOrderQuantityList;
            if (decreaseGroupQuantityList[state.groupOrderIdList.indexOf(action.menuId)] > 0) {
                decreaseGroupQuantityList[state.groupOrderIdList.indexOf(action.menuId)] = decreaseGroupQuantityList[state.groupOrderIdList.indexOf(action.menuId)] - 1;
                return {
                    ...state,
                    groupOrderQuantityList: decreaseGroupQuantityList
                }
            } else {
                return {
                    ...state,
                }
            }
        case INITIALIZE_GROUP_MENU_QUANTITY:
            let initializedGroupQuantityList = state.groupOrderQuantityList;
            initializedGroupQuantityList.map((quantity,index) => {
                initializedGroupQuantityList[index] = 0;
            })
            return {
                ...state,
                groupOrderQuantityList: initializedGroupQuantityList
            }
        case ADD_PICKUP_MENU_QUANTITY:
            let increasePickupQuantityList = state.pickupOrderQuantityList;
            increasePickupQuantityList[state.pickupOrderIdList.indexOf(action.menuId)] = increasePickupQuantityList[state.pickupOrderIdList.indexOf(action.menuId)] + 1;
            return {
                ...state,
                pickupOrderQuantityList: increasePickupQuantityList
            }
        case SUBTRACT_PICKUP_MENU_QUANTITY:
            let decreasePickupQuantityList = state.pickupOrderQuantityList;
            if (decreasePickupQuantityList[state.pickupOrderIdList.indexOf(action.menuId)] > 0) {
                decreasePickupQuantityList[state.pickupOrderIdList.indexOf(action.menuId)] = decreasePickupQuantityList[state.pickupOrderIdList.indexOf(action.menuId)] - 1;
                return {
                    ...state,
                    pickupOrderQuantityList: decreasePickupQuantityList
                }
            } else {
                return {
                    ...state,
                }
            }
        default:
            return state;
    }
};

export default order;