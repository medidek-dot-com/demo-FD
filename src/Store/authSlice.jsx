import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    isLoggedIn: false,
    user: null,
};

const authSlice = createSlice({
    name: "user",
    initialState: intialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
        },
        updateUserData: (state, action) => {
            // Update the user data here
            // For example:
            // state.isLoggedIn = true;
            state.user = action.payload;
            // You can add more fields as needed
        },
    },
});

export const { login, logout, updateUserData } = authSlice.actions;

export default authSlice.reducer;
