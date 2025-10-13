import React, { memo } from "react"
import { ThemeProvider } from "./layout/dashboard/theme-provider"
import { Toaster } from "sonner"

const InnerLayoutComponent = async ({ children }) => {
    return (
        <>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Toaster />
                {children}
            </ThemeProvider>
        </>
    )
}

export const InnerLayout = memo(InnerLayoutComponent)
export default InnerLayout   