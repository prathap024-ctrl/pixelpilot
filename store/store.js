import { configureStore } from "@reduxjs/toolkit"
import dashboardReducer from "@/store/slice/DashboardSlice"

export const store = configureStore({
    reducer: {
        dashboard: dashboardReducer,
    }
})