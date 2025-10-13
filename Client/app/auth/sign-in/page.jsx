import { SignIn } from '@/components/auth/Sign-In/SignIn'
import React from 'react'

export default async function Page() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <SignIn />
            </div>
        </div>
    );
}
