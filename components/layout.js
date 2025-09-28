"use client"

import React, { memo } from "react"
import { ThemeProvider } from "./layout/dashboard/theme-provider"
import { Provider } from "react-redux"
import { store } from "@/store/store"

const InnerLayoutComponent = ({ children }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <Provider store={store}>{children}</Provider>
        </ThemeProvider>
    )
}

export const InnerLayout = memo(InnerLayoutComponent)
export default InnerLayout   