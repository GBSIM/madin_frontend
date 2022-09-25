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
    currentDessertIndex: 0,
    currentDrinkIndex: 0,
    dessertList: [
        {"koreanName":"레몬마들렌","englishName":"Lemon Madeliene",
         "description1":"상큼한 레몬과 마들렌의 조합","description2":"마딘의 시그니쳐 메뉴에요.",
         "description3":"마딘의 첫 오픈부터 지금까지","description4":"가장 많이 사랑받는 디저트입니다."},
        {"koreanName":"초코마들렌","englishName":"Choco Madeliene",
         "description1":"깊은 초코의 맛과 마들렌의 조합","description2":"마딘의 시그니쳐 메뉴에요.",
         "description3":"마딘의 첫 오픈부터 지금까지","description4":"가장 많이 사랑받는 디저트입니다."},
         {"koreanName":"애플시나몬마들렌","englishName":"Apple Cinnamon Madeliene",
         "description1":"달콤한 사과와 마들렌의 조합","description2":"마딘의 시그니쳐 메뉴에요.",
         "description3":"마딘의 첫 오픈부터 지금까지","description4":"가장 많이 사랑받는 디저트입니다."},
    ],
    drinkList: [
        {"koreanName":"아메리카노","englishName":"Americano",
         "description1":"상큼한 레몬과 마들렌의 조합","description2":"마딘의 시그니쳐 메뉴에요.",
         "description3":"마딘의 첫 오픈부터 지금까지","description4":"가장 많이 사랑받는 디저트입니다."},
        {"koreanName":"카페라떼","englishName":"Cafe Latte",
         "description1":"깊은 초코의 맛과 마들렌의 조합","description2":"마딘의 시그니쳐 메뉴에요.",
         "description3":"마딘의 첫 오픈부터 지금까지","description4":"가장 많이 사랑받는 디저트입니다."},
         {"koreanName":"말차 라떼","englishName":"Green Tea Latte",
         "description1":"달콤한 사과와 마들렌의 조합","description2":"마딘의 시그니쳐 메뉴에요.",
         "description3":"마딘의 첫 오픈부터 지금까지","description4":"가장 많이 사랑받는 디저트입니다."},
    ],
}

const menu = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_MENU_TYPE:
            if (action.menuType === '디저트') {
                return {
                    ...state,
                    menuType: action.menuType,
                    menuEnglishName: state.dessertList[state.currentDessertIndex]["englishName"],
                    menuKoreanName: state.dessertList[state.currentDessertIndex]["koreanName"],
                    menuDescription1: state.dessertList[state.currentDessertIndex]["description1"],
                    menuDescription2: state.dessertList[state.currentDessertIndex]["description2"],
                    menuDescription3: state.dessertList[state.currentDessertIndex]["description3"],
                    menuDescription4: state.dessertList[state.currentDessertIndex]["description4"],
                }
            } else {
                return {
                    ...state,
                    menuType: action.menuType,  
                    menuEnglishName: state.drinkList[state.currentDrinkIndex]["englishName"],
                    menuKoreanName: state.drinkList[state.currentDrinkIndex]["koreanName"],
                    menuDescription1: state.drinkList[state.currentDrinkIndex]["description1"],
                    menuDescription2: state.drinkList[state.currentDrinkIndex]["description2"],
                    menuDescription3: state.drinkList[state.currentDrinkIndex]["description3"],
                    menuDescription4: state.drinkList[state.currentDrinkIndex]["description4"],
                }
            }
            
        case INIT_MENU_DATA:
            return {
                ...state,
                menuEnglishName: state.dessertList[state.currentDessertIndex]["englishName"],
                menuKoreanName: state.dessertList[state.currentDessertIndex]["koreanName"],
                menuDescription1: state.dessertList[state.currentDessertIndex]["description1"],
                menuDescription2: state.dessertList[state.currentDessertIndex]["description2"],
                menuDescription3: state.dessertList[state.currentDessertIndex]["description3"],
                menuDescription4: state.dessertList[state.currentDessertIndex]["description4"],
            }
        case SWIPE_MENU_TO_LEFT:
            let leftMenuIndex;
            if (state.menuType === '디저트') {
                if (state.currentDessertIndex === 0) {
                    leftMenuIndex = state.dessertList.length - 1;
                } else {
                    leftMenuIndex = state.currentDessertIndex - 1;
                }
                return {
                    ...state,
                    currentDessertIndex: leftMenuIndex,
                    menuEnglishName: state.dessertList[leftMenuIndex]["englishName"],
                    menuKoreanName: state.dessertList[leftMenuIndex]["koreanName"],
                    menuDescription1: state.dessertList[leftMenuIndex]["description1"],
                    menuDescription2: state.dessertList[leftMenuIndex]["description2"],
                    menuDescription3: state.dessertList[leftMenuIndex]["description3"],
                    menuDescription4: state.dessertList[leftMenuIndex]["description4"],
                }
            } else {
                if (state.currentDrinkIndex === 0) {
                    leftMenuIndex = state.drinkList.length - 1;
                } else {
                    leftMenuIndex = state.currentDrinkIndex - 1;
                }
                return {
                    ...state,
                    currentMenuIndex: leftMenuIndex,
                    menuEnglishName: state.drinkList[leftMenuIndex]["englishName"],
                    menuKoreanName: state.drinkList[leftMenuIndex]["koreanName"],
                    menuDescription1: state.drinkList[leftMenuIndex]["description1"],
                    menuDescription2: state.drinkList[leftMenuIndex]["description2"],
                    menuDescription3: state.drinkList[leftMenuIndex]["description3"],
                    menuDescription4: state.drinkList[leftMenuIndex]["description4"],
                }
            }
        case SWIPE_MENU_TO_RIGHT:
            let rightMenuIndex;
            if (state.menuType === '디저트') {
                if (state.currentDessertIndex === (state.dessertList.length-1)) {
                    rightMenuIndex = 0;
                } else {
                    rightMenuIndex = state.currentDessertIndex + 1;
                }
                return {
                    ...state,
                    currentDessertIndex: rightMenuIndex,
                    menuEnglishName: state.dessertList[rightMenuIndex]["englishName"],
                    menuKoreanName: state.dessertList[rightMenuIndex]["koreanName"],
                    menuDescription1: state.dessertList[rightMenuIndex]["description1"],
                    menuDescription2: state.dessertList[rightMenuIndex]["description2"],
                    menuDescription3: state.dessertList[rightMenuIndex]["description3"],
                    menuDescription4: state.dessertList[rightMenuIndex]["description4"],
                }
            } else {
                if (state.currentDrinkIndex === (state.dessertList.length-1)) {
                    rightMenuIndex = 0;
                } else {
                    rightMenuIndex = state.currentDrinkIndex + 1;
                }
                return {
                    ...state,
                    currentDrinkIndex: rightMenuIndex,
                    menuEnglishName: state.drinkList[rightMenuIndex]["englishName"],
                    menuKoreanName: state.drinkList[rightMenuIndex]["koreanName"],
                    menuDescription1: state.drinkList[rightMenuIndex]["description1"],
                    menuDescription2: state.drinkList[rightMenuIndex]["description2"],
                    menuDescription3: state.drinkList[rightMenuIndex]["description3"],
                    menuDescription4: state.drinkList[rightMenuIndex]["description4"],
                }
            }
        default:
            return state;
    }
};

export default menu;