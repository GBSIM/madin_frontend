import { combineReducers } from "redux";

import nav from "./nav";
import browse from "./browse";
import order from "./order";

const rootReducer = combineReducers({
    nav, browse, order
});

export default rootReducer;