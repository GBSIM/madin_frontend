export const SAVE_PERSONAL_ORDER = "MENU/SAVE_PERSONAL_ORDER"

export const savePersonalOrder = (savedOrder) => ({type:SAVE_PERSONAL_ORDER, order:savedOrder})

const initialState = {
    personalOrder: []
}

const order = (state = initialState, action) => {    
    switch (action.type) {
        case SAVE_PERSONAL_ORDER:
            return {
                ...state,
                personalOrder: action.order
            }
        default:
            return state;
    }
};

export default order;