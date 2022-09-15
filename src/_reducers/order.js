export const CHANGE_ORDER_TYPE = "BROWSE/CHANGE_ORDER_TYPE"

export const changeOrderType = (orderType) => ({type:CHANGE_ORDER_TYPE, orderType:orderType})

const initialState = {
    orderType: "개인구매"
}

const order = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_ORDER_TYPE:
            return {
                ...state,
                orderType: action.orderType
            }
        default:
            return state;
    }
};

export default order;