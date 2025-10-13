'use client';

import React, { createContext, useContext, useState } from 'react';
import { Chat, useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { authClient } from '@/lib/auth-client';

const ChatContext = createContext(undefined);

function createChat() {
    return new Chat({
        transport: new DefaultChatTransport({
            api: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/chat/llm`,
        }),
    });
}

export function ChatProvider({ children }) {
    const [text, setText] = useState('');
    const [chat, setChat] = useState(() => createChat());
    const clearChat = () => setChat(createChat())
    const { data: session, isPending, error } = authClient.useSession()

    const { status, sendMessage, messages, regenerate } = useChat({
        chat,
        stream: true,
        experimental_throttle: 100,
    });

    return (
        <ChatContext.Provider
            value={
                {
                    chat,
                    clearChat,
                    status,
                    sendMessage,
                    messages,
                    regenerate,
                    text,
                    setText,
                    session,
                    isPending,
                    error
                }
            }
        >
            {children}
        </ChatContext.Provider>
    );
}

export function useSharedChatContext() {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useSharedChatContext must be used within a ChatProvider');
    }
    return context;
}