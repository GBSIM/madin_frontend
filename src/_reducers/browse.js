export const CHANGE_BROWSE_OPTION = "BROWSE/CHANGE_BROWSE_OPTION"

export const changeBrowseOption = (option) => ({type:CHANGE_BROWSE_OPTION, option:option})

const initialState = {
    browseOption: "인기"
}

const browse = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_BROWSE_OPTION:
            return {
                ...state,
                browseOption: action.option
            }
        default:
            return state;
    }
};

export default browse;