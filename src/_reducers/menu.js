export const SAVE_MENU_CLASS = "MENU/SAVE_MENU_CLASS"

export const saveMenuClass = (loadedMenuClasses) => ({type:SAVE_MENU_CLASS, menuClasses:loadedMenuClasses})

const initialState = {
    menuClasses: []
}

const menu = (state = initialState, action) => {    
    switch (action.type) {
        case SAVE_MENU_CLASS:
            return {
                ...state,
                menuClasses: action.menuClasses
            }
        default:
            return state;
    }
};

export default menu;