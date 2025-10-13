import { SignUp } from '@/components/auth/Sign-Up/SignUp';
import React from 'react'

export default async function Page() {

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-0">
            <div className="w-full max-w-sm">
                <SignUp />
            </div>
        </div>
    );
}
