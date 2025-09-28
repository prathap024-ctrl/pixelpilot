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
        <div className="max-w-[50rem] mx-auto relative md:p-6 size-full rounded-lg md:h-[580px] h-[560px]">
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
                                        case "image":
                                            return (
                                                <Fragment key={`${message.id}-${i}`}>
                                                    <Message from={message.role}>
                                                        <MessageContent>
                                                            <div className="flex justify-center">
                                                                <Image
                                                                    {...imageData}
                                                                    alt="Generated image"
                                                                    className="h-[300px] aspect-square border rounded-lg"
                                                                />
                                                            </div>
                                                        </MessageContent>
                                                    </Message>
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

