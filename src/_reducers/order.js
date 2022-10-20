export const SAVE_PERSONAL_ORDER = "ORDER/SAVE_PERSONAL_ORDER"
export const INCREASE_MENU_QUANTITY = "ORDER/INCREASE_MENU_QUANTITY"
export const DECREASE_MENU_QUANTITY = "ORDER/DECREASE_MENU_QUANTITY"

export const savePersonalOrderMenuIdList = (menuIdList) => ({type:SAVE_PERSONAL_ORDER, menuIdList:menuIdList});
export const increaseMenuQuantity = (menuId) => ({type:INCREASE_MENU_QUANTITY, menuId:menuId});
export const decreaseMenuQuantity = (menuId) => ({type:DECREASE_MENU_QUANTITY, menuId:menuId});

const initialState = {
    personalOrderMenuIdList: [],
    personalOrderQuantityList: [],
}

const order = (state = initialState, action) => {    
    switch (action.type) {
        case SAVE_PERSONAL_ORDER:
            return {
                ...state,
                personalOrderMenuIdList: action.menuIdList,
                personalOrderQuantityList: Array(action.menuIdList.length).fill(0),
            }
        case INCREASE_MENU_QUANTITY:
            let increaseQuantityList = state.personalOrderQuantityList;
            increaseQuantityList[state.personalOrderMenuIdList.indexOf(action.menuId)] = increaseQuantityList[state.personalOrderMenuIdList.indexOf(action.menuId)] + 1;
            return {
                ...state,
                personalOrderQuantityList: increaseQuantityList
            }
        case DECREASE_MENU_QUANTITY:
            let decreaseQuantityList = state.personalOrderQuantityList;
            if (decreaseQuantityList[state.personalOrderMenuIdList.indexOf(action.menuId)] > 0) {
                decreaseQuantityList[state.personalOrderMenuIdList.indexOf(action.menuId)] = decreaseQuantityList[state.personalOrderMenuIdList.indexOf(action.menuId)] - 1;
                return {
                    ...state,
                    personalOrderQuantityList: decreaseQuantityList
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