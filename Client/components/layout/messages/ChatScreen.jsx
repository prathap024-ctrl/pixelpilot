'use client';

import {
    Conversation,
    ConversationContent,
    ConversationEmptyState,
    ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Fragment, memo, useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { TextResponse } from './TextResponse';
import { ReasoningResponse } from './ReasoningResponse';
import { ToolResponse } from './ToolResponse';
import { useTheme } from 'next-themes';
import { authClient } from '@/lib/auth-client';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';

export const ChatScreen = memo(({ messages, regenerate, status }) => {

    const { data: session } = authClient.useSession()

    const { theme, systemTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    const currentTheme = theme === "system" ? systemTheme : theme
    const logoSrc =
        currentTheme === "light"
            ? "/pixelpilot-black-word.svg"
            : "/pixelpilot-white-word.svg"

    return (
        <div className="relative size-full rounded-lg md:h-[calc(100vh-8.5rem)] top-16 md:top-0 h-[calc(100dvh-12rem)]">
            <div className="flex flex-col h-full">
                {messages.length === 0 ? (
                    <>
                        <div className='w-full h-full p-4'>
                            <div className='flex flex-col justify-center gap-2 max-w-[44rem] h-full mx-auto'>
                                <h2 className="text-4xl text-muted-foreground font-semibold">
                                    <AnimatedShinyText>
                                        Hello, {session?.user?.name || "User"}
                                    </AnimatedShinyText>
                                </h2>
                                <p>
                                    How can I help you today?
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Conversation>
                            <ConversationContent>
                                <>
                                    {messages.map((message, messageIndex) => (
                                        <Fragment key={message.id}>
                                            {message.parts.map((part, i) => {
                                                switch (part.type) {
                                                    //tool call
                                                    case "tool-getWeather":
                                                        return <ToolResponse key={`${message.id}-${i}`} part={part} message={message} />
                                                    //reasoning
                                                    case "reasoning":
                                                        return <ReasoningResponse key={`${message.id}-${i}`} part={part} message={message} isStreaming={status === 'streaming' && i === message.parts.length - 1 && message.id === messages.at(-1)?.id} />
                                                    case 'text':
                                                        const isLastMessage =
                                                            messageIndex === messages.length - 1;
                                                        return <TextResponse key={`${message.id}-${i}`} part={part} message={message} regenerate={regenerate} isLastMessage={isLastMessage} />
                                                    default:
                                                        return null;
                                                }
                                            })}
                                        </Fragment>
                                    ))}
                                </>
                                {status !== 'ready' && <div className='space-y-2 px-4'>
                                    <Skeleton className="h-4 w-[300px]" />
                                    <Skeleton className="h-4 w-[250px]" />
                                </div>}
                            </ConversationContent>
                            <ConversationScrollButton />
                        </Conversation >
                    </>
                )}
            </div >
        </div >
    );
})
