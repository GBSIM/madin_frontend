export const SAVE_MENU = "MENU/SAVE_MENU"

export const saveMenu = (loadedMenus) => ({type:SAVE_MENU, menus:loadedMenus})

const initialState = {
    menus: []
}

const menu = (state = initialState, action) => {    
    switch (action.type) {
        case SAVE_MENU:
            return {
                ...state,
                menus: action.menus
            }
        default:
            return state;
    }
};

export default menu;