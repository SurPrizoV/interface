import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import orderReducer from "./orderSlice";
import nomenclatureReducer from "./nomenclatureSlice";
import productReducer from "./productSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        order: orderReducer,
        nomenclature: nomenclatureReducer,
        product: productReducer,
    }
})