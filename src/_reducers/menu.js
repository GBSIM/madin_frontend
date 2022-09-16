export const CHANGE_MENU_TYPE = "BROWSE/CHANGE_MENU_TYPE"

export const changeMenuType = (menuType) => ({type:CHANGE_MENU_TYPE, menuType:menuType})

const initialState = {
    menuType: "디저트"
}

const menu = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_MENU_TYPE:
            return {
                ...state,
                menuType: action.menuType
            }
        default:
            return state;
    }
};

export default menu;