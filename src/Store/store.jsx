import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {  persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from 'redux-persist/lib/storage'
import authSlice from './authSlice';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
        auth: authSlice,
    })
)

const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
})

const persistor = persistStore(store);

export {store, persistor};