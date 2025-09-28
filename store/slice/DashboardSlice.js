import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    navMain: [
        {
            title: "Playground",
            key: "playground",
            icon: "playgroundTerminal",
            isActive: true,
        },
        {
            title: "Settings",
            key: "settings",
            icon: "settings2",
        },
    ],
    active: "playground"
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setActivePage: (state, action) => {
            state.active = action.payload;
        },
    },
});

export const { setActivePage } = dashboardSlice.actions;
export default dashboardSlice.reducer;
