import { combineReducers } from "redux";

import nav from "./nav";
import browse from "./browse";
import order from "./order";
import menu from "./menu";

const rootReducer = combineReducers({
    nav, browse, order, menu
});

export default rootReducer;