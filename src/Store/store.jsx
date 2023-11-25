import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice";
import tabSlice from "./tabSlice";
import doctorDataSlice from "./doctorDataSlice";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        auth: authSlice,
        tab: tabSlice,
        doctor: doctorDataSlice,
    })
);

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

const persistor = persistStore(store);

export { store, persistor };
