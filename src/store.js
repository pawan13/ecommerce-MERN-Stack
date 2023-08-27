import {configureStore} from "@reduxjs/toolkit";
import user from "./pages/user/userSlice";

const store = configureStore({
    reducer:{
        user : user
    }
})
export default store;