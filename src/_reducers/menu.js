export const CHANGE_MENU_TYPE = "MENU/CHANGE_MENU_TYPE";
export const SWIPE_MENU_TO_RIGHT = "MENU/SWIPE_MENU_TO_RIGHT";
export const SWIPE_MENU_TO_LEFT = "MENU/SWIPE_MENU_TO_LEFT";
export const INIT_MENU_DATA = "MENU/INIT_MENU_DATA";

export const changeMenuType = (menuType) => ({type:CHANGE_MENU_TYPE, menuType:menuType});
export const swipeMenuToRight = () => ({type:SWIPE_MENU_TO_RIGHT});
export const swipeMenuToLeft = () => ({type:SWIPE_MENU_TO_LEFT});
export const initMenuData = () => ({type:INIT_MENU_DATA});

const initialState = {
    menuType: "디저트",
    menuEnglishName: "English name",
    menuKoreanName: "메뉴 이름",
    menuDescription1: "설명1",
    menuDescription2: "설명2",
    menuDescription3: "설명3",
    menuDescription4: "설명4",
    currentMenuIndex: 0,
    menuList: [
        {"koreanName":"레몬마들렌","englishName":"Lemon Madeliene",
         "description1":"상큼한 레몬과 마들렌의 조합","description2":"마딘의 시그니쳐 메뉴에요.",
         "description3":"마딘의 첫 오픈부터 지금까지","description4":"가장 많이 사랑받는 디저트입니다."},
        {"koreanName":"초코마들렌","englishName":"Choco Madeliene",
         "description1":"깊은 초코의 맛과 마들렌의 조합","description2":"마딘의 시그니쳐 메뉴에요.",
         "description3":"마딘의 첫 오픈부터 지금까지","description4":"가장 많이 사랑받는 디저트입니다."},
         {"koreanName":"애플시나몬마들렌","englishName":"Apple Cinnamon Madeliene",
         "description1":"달콤한 사과와 마들렌의 조합","description2":"마딘의 시그니쳐 메뉴에요.",
         "description3":"마딘의 첫 오픈부터 지금까지","description4":"가장 많이 사랑받는 디저트입니다."},
    ]
}

const menu = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_MENU_TYPE:
            return {
                ...state,
                menuType: action.menuType
            }
        case INIT_MENU_DATA:
            return {
                ...state,
                menuEnglishName: state.menuList[state.currentMenuIndex]["englishName"],
                menuKoreanName: state.menuList[state.currentMenuIndex]["koreanName"],
                menuDescription1: state.menuList[state.currentMenuIndex]["description1"],
                menuDescription2: state.menuList[state.currentMenuIndex]["description2"],
                menuDescription3: state.menuList[state.currentMenuIndex]["description3"],
                menuDescription4: state.menuList[state.currentMenuIndex]["description4"],
            }
        case SWIPE_MENU_TO_LEFT:
            let leftMenuIndex;
            if (state.currentMenuIndex === 0) {
                leftMenuIndex = state.menuList.length - 1;
            } else {
                leftMenuIndex = state.currentMenuIndex - 1;
            }
            return {
                ...state,
                currentMenuIndex: leftMenuIndex,
                menuEnglishName: state.menuList[leftMenuIndex]["englishName"],
                menuKoreanName: state.menuList[leftMenuIndex]["koreanName"],
                menuDescription1: state.menuList[leftMenuIndex]["description1"],
                menuDescription2: state.menuList[leftMenuIndex]["description2"],
                menuDescription3: state.menuList[leftMenuIndex]["description3"],
                menuDescription4: state.menuList[leftMenuIndex]["description4"],
            }
        case SWIPE_MENU_TO_RIGHT:
            let rightMenuIndex;
            if (state.currentMenuIndex === (state.menuList.length-1)) {
                rightMenuIndex = 0;
            } else {
                rightMenuIndex = state.currentMenuIndex + 1;
            }
            return {
                ...state,
                currentMenuIndex: rightMenuIndex,
                menuEnglishName: state.menuList[rightMenuIndex]["englishName"],
                menuKoreanName: state.menuList[rightMenuIndex]["koreanName"],
                menuDescription1: state.menuList[rightMenuIndex]["description1"],
                menuDescription2: state.menuList[rightMenuIndex]["description2"],
                menuDescription3: state.menuList[rightMenuIndex]["description3"],
                menuDescription4: state.menuList[rightMenuIndex]["description4"],
            }
        default:
            return state;
    }
};

export default menu;