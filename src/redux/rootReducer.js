import { combineReducers } from "redux";
import { loginReducer } from "./auth/loginReducer";
import { adminReducer } from "./admin/adminReducer";
import { roleReducer } from "./role/roleReducer";


const rootReducer = combineReducers({
    admin: adminReducer,
    login: loginReducer,
    users: roleReducer
})

export default rootReducer;