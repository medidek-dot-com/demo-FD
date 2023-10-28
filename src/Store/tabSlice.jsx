import { createSlice } from "@reduxjs/toolkit";

const intialTab = {
    tabValue: 0,
};

const tabSlice = createSlice({
    name: "tab",
    initialState: intialTab,
    reducers: {
        tab: (state, action) => {
            state.tabValue = action.payload;
        },
    },
});

export const { tab } = tabSlice.actions;

export default tabSlice.reducer;
