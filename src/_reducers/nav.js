export const CHANGE_PAGE = "NAV/CHANGE_PAGE"

export const changePage = (nextPage) => ({type:CHANGE_PAGE, page:nextPage})

const initialState = {
    page: "about"
}

const nav = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_PAGE:
            return {
                ...state,
                page: action.page
            }
        default:
            return state;
    }
};

export default nav;