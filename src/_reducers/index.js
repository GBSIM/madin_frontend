import { combineReducers } from "redux";

import nav from "./nav";
import menu from "./menu";
import order from "./order";
import user from "./user";

const rootReducer = combineReducers({
    nav, menu, order, user
});

export default rootReducer;