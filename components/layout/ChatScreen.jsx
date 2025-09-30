'use client';

import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
    ConversationEmptyState,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import { Response } from '@/components/ai-elements/response';
import { Fragment, useEffect, useState } from 'react';
import { Action, Actions } from '../ai-elements/actions';
import { Check, CopyIcon, RefreshCcwIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { Loader } from '../ai-elements/loader';
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements/reasoning';


export const ChatScreen = ({ messages, regenerate, status }) => {
    const [copy, setCopy] = useState("")
    const [mounted, setMounted] = useState(false)
    const { theme, systemTheme } = useTheme()

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        setCopy(true)
        setTimeout(() => setCopy(false), 2000);
    }

    useEffect(() => setMounted(true), [])

    const currentTheme = theme === "system" ? systemTheme : theme
    const logoSrc =
        currentTheme === "light"
            ? "/pixelpilot-black.svg"
            : "/pixelpilot-white.svg"

    return (
        <div className="max-w-[50rem] mx-auto relative md:p-6 size-full rounded-lg md:h-[calc(100vh-10rem)] h-[calc(100dvh-12rem)]">
            <div className="flex flex-col h-full">
                <Conversation>
                    <ConversationContent>
                        {messages.length === 0 ? (<ConversationEmptyState
                            icon={mounted &&
                                <Image
                                    src={logoSrc}
                                    alt="logo"
                                    width={31}
                                    height={31}
                                    priority
                                />}
                            title="Start a conversation"
                            description="Type a message below to begin chatting"
                        />) : (messages.map((message, messageIndex) => (
                            <Fragment key={message.id}>
                                {message.parts.map((part, i) => {
                                    switch (part.type) {
                                        case "reasoning":
                                            return (
                                                <Message from={message.role} key={`${message.id}-${i}`}>
                                                    <MessageContent>
                                                        <Reasoning
                                                            className="w-full"
                                                            isStreaming={status === 'streaming' && i === message.parts.length - 1 && message.id === messages.at(-1)?.id}
                                                        >
                                                            <ReasoningTrigger />
                                                            <ReasoningContent>{part.text}</ReasoningContent>
                                                        </Reasoning>
                                                    </MessageContent>
                                                </Message>
                                            );
                                        case 'text':
                                            const isLastMessage =
                                                messageIndex === messages.length - 1;

                                            return (
                                                <Fragment key={`${message.id}-${i}`}>
                                                    <Message from={message.role}>
                                                        <MessageContent>
                                                            <Response>{part.text}</Response>
                                                        </MessageContent>
                                                    </Message>
                                                    {message.role === 'assistant' && isLastMessage && (
                                                        <Actions>
                                                            <Action
                                                                onClick={() => regenerate()}
                                                                label="Retry"
                                                                className={"cursor-pointer"}
                                                            >
                                                                <RefreshCcwIcon className="size-3" />
                                                            </Action>
                                                            <Action
                                                                onClick={() =>
                                                                    handleCopy(part.text)
                                                                }
                                                                label="Copy"
                                                                className={"cursor-pointer"}
                                                            >
                                                                {copy ? <Check className='size-3' /> : <CopyIcon className="size-3" />}
                                                            </Action>
                                                        </Actions>
                                                    )}
                                                </Fragment>
                                            );
                                        default:
                                            return null;
                                    }
                                })}
                            </Fragment>
                        )))}
                        {status === 'submitted' && <Loader />}
                    </ConversationContent>
                    <ConversationScrollButton />
                </Conversation>
            </div>
        </div>
    );
};

