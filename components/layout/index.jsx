import React from 'react'
import { ChatInput } from './ChatInput'
import { ChatScreen } from './ChatScreen'
import { useChat } from '@ai-sdk/react';

export const ChatUI = () => {
    const { status, sendMessage, messages } = useChat();
    return (
        <>
            <div className="flex flex-col gap-2">
                <ChatScreen messages={messages} />
                <ChatInput status={status} sendMessage={sendMessage} />
            </div>
        </>
    )
}

