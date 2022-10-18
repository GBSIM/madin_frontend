import { combineReducers } from "redux";

import nav from "./nav";
import menu from "./menu";

const rootReducer = combineReducers({
    nav, menu,
});

export default rootReducer;