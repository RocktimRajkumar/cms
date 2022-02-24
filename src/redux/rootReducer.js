import { combineReducers } from "redux";
import { loginReducer } from "./auth/loginReducer";
import { adminReducer } from "./admin/adminReducer";



const rootReducer = combineReducers({
    admin: adminReducer,
    login: loginReducer,

})

export default rootReducer;