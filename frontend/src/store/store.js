import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminProductsReducer from "./admin/productSlice";
import UserProductsReducer from "./shopping/productSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        adminProducts: adminProductsReducer,
        userProducts: UserProductsReducer,
    },
});

export default store;