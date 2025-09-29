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
    active: "playground",
    activeThread: null
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setActivePage: (state, action) => {
            state.active = action.payload;
        },
        setActiveThread: (state, action) => {
            state.activeThread = action.payload;
        },
    },
});

export const { setActivePage, setActiveThread } = dashboardSlice.actions;
export default dashboardSlice.reducer;
