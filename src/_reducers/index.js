import { combineReducers } from "redux";

import nav from "./nav";
import menu from "./menu";
import order from "./order";

const rootReducer = combineReducers({
    nav, menu, order,
});

export default rootReducer;