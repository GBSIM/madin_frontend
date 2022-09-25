export const CHANGE_MENU_TYPE = "BROWSE/CHANGE_MENU_TYPE"

export const changeMenuType = (menuType) => ({type:CHANGE_MENU_TYPE, menuType:menuType})

const initialState = {
    menuType: "디저트",
    menuEnglishName: "Enlish name",
    menuKoreanName: "메뉴 이름",
    menuDescription1: "설명1",
    menuDescription2: "설명2",
    menuDescription3: "설명3",
    menuDescription4: "설명4",
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