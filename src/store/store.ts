import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import modalReducer from './slices/modalSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer
    },
    devTools: true
});

export default store;
