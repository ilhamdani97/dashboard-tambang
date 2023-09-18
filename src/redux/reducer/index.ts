import { combineReducers } from "redux";
import dashboardReducer from "./dashboard";

export const rootReducer = combineReducers({
    dashboard: dashboardReducer
})