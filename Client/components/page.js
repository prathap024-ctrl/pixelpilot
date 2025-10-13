import React from 'react'
import { ChatProvider } from './layout/ChatProvider'
import dynamic from 'next/dynamic'
import Providers from './layout/QueryProvider'

const DashboardLayout = dynamic(() => import('./layout/dashboard'), {
    loading: () => <p>Loading...</p>,
})

export default function HomeComponent() {
    return (
        <div>
            <Providers>
                <ChatProvider>
                    <DashboardLayout />
                </ChatProvider>
            </Providers>
        </div>
    )
}
