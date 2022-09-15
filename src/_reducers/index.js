import { combineReducers } from "redux";

import nav from "./nav";
import browse from "./browse";

const rootReducer = combineReducers({
    nav, browse
});

export default rootReducer;