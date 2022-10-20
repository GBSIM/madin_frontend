export const SAVE_PERSONAL_ORDER = "MENU/SAVE_PERSONAL_ORDER"

export const savePersonalOrderMenuIdList = (menuIdList) => ({type:SAVE_PERSONAL_ORDER, menuIdList:menuIdList})

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
        default:
            return state;
    }
};

export default order;