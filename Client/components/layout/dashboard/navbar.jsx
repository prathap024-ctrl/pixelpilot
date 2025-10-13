"use client"

import React from 'react'
import { ModeToggle } from "./mode-toggle";
import {
    Context,
    ContextTrigger,
    ContextContent,
    ContextContentHeader,
    ContextContentBody,
    ContextContentFooter,
    ContextInputUsage,
    ContextOutputUsage,
    ContextReasoningUsage,
    ContextCacheUsage,
} from '@/components/ai-elements/context';
import { SidebarTrigger } from '@/components/ui/sidebar';

export const NavbarComp = () => {
    return (
        <header className='absolute h-16 flex items-center w-full'>
            <div className="flex items-center w-full justify-between gap-2 px-4">
                <div className="flex items-center gap-2 z-50">
                    <SidebarTrigger className={"md:hidden"}/>
                    <h2 className="text-md font-medium">PixelPilot</h2>
                </div>
                <div className="flex items-center gap-2 z-50">
                    <Context
                        maxTokens={128000}
                        usedTokens={40000}
                        usage={{
                            inputTokens: 32000,
                            outputTokens: 8000,
                            totalTokens: 40000,
                            cachedInputTokens: 0,
                            reasoningTokens: 0,
                        }}
                        modelId="openai:gpt-4"
                    >
                        <ContextTrigger />
                        <ContextContent>
                            <ContextContentHeader />
                            <ContextContentBody>
                                <ContextInputUsage />
                                <ContextOutputUsage />
                                <ContextReasoningUsage />
                                <ContextCacheUsage />
                            </ContextContentBody>
                            <ContextContentFooter />
                        </ContextContent>
                    </Context>
                    <div>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}



{/* <div>
    <header className='relative h-16 flex top-0 z-40 w-full bg-none'>
        <div className="flex items-center w-full bg-transparent justify-between gap-2 px-4">
            <div className="flex items-center gap-2">
                <h2 className="text-md font-medium">PixelPilot</h2>
            </div>
            <div className="flex items-center gap-2">
                <Context
                    maxTokens={128000}
                    usedTokens={40000}
                    usage={{
                        inputTokens: 32000,
                        outputTokens: 8000,
                        totalTokens: 40000,
                        cachedInputTokens: 0,
                        reasoningTokens: 0,
                    }}
                    modelId="openai:gpt-4"
                >
                    <ContextTrigger />
                    <ContextContent>
                        <ContextContentHeader />
                        <ContextContentBody>
                            <ContextInputUsage />
                            <ContextOutputUsage />
                            <ContextReasoningUsage />
                            <ContextCacheUsage />
                        </ContextContentBody>
                        <ContextContentFooter />
                    </ContextContent>
                </Context>
                <div>
                    <ModeToggle />
                </div>
            </div>
        </div>
    </header>
</div> */}