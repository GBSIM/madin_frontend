export const CHANGE_MENU_TYPE = "MENU/CHANGE_MENU_TYPE";
export const SWIPE_MENU_TO_RIGHT = "MENU/SWIPE_MENU_TO_RIGHT";
export const SWIPE_MENU_TO_LEFT = "MENU/SWIPE_MENU_TO_LEFT";
export const INIT_MENU_DATA = "MENU/INIT_MENU_DATA";

export const changeMenuType = (menuType) => ({type:CHANGE_MENU_TYPE, menuType:menuType});
export const swipeMenuToRight = (menuIndex) => ({type:SWIPE_MENU_TO_RIGHT});
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
                menuEnglishName: action.menuList[action.currentMenuIndex]["englishName"],
                menuKoreanName: action.menuList[action.currentMenuIndex]["koreanName"],
                menuDescription1: action.menuList[action.currentMenuIndex]["description1"],
                menuDescription2: action.menuList[action.currentMenuIndex]["description2"],
                menuDescription3: action.menuList[action.currentMenuIndex]["description3"],
                menuDescription4: action.menuList[action.currentMenuIndex]["description4"],
            }
        case SWIPE_MENU_TO_LEFT:
            let leftMenuIndex;
            if (action.currentMenuIndex === 0) {
                leftMenuIndex = action.menuList.length - 1;
            } else {
                leftMenuIndex = action.currentMenuIndex - 1;
            }
            return {
                ...state,
                currentMenuIndex: leftMenuIndex,
                menuEnglishName: action.menuList[leftMenuIndex]["englishName"],
                menuKoreanName: action.menuList[leftMenuIndex]["koreanName"],
                menuDescription1: action.menuList[leftMenuIndex]["description1"],
                menuDescription2: action.menuList[leftMenuIndex]["description2"],
                menuDescription3: action.menuList[leftMenuIndex]["description3"],
                menuDescription4: action.menuList[leftMenuIndex]["description4"],
            }
        case SWIPE_MENU_TO_RIGHT:
            let rightMenuIndex;
            if (action.currentMenuIndex === (action.menuList.length-1)) {
                rightMenuIndex = 0;
            } else {
                rightMenuIndex = action.currentMenuIndex + 1;
            }
            return {
                ...state,
                currentMenuIndex: rightMenuIndex,
                menuEnglishName: action.menuList[rightMenuIndex]["englishName"],
                menuKoreanName: action.menuList[rightMenuIndex]["koreanName"],
                menuDescription1: action.menuList[rightMenuIndex]["description1"],
                menuDescription2: action.menuList[rightMenuIndex]["description2"],
                menuDescription3: action.menuList[rightMenuIndex]["description3"],
                menuDescription4: action.menuList[rightMenuIndex]["description4"],
            }
        default:
            return state;
    }
};

export default menu;