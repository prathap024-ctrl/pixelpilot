import React from 'react'
import { ChatScreen } from './messages/ChatScreen'
import { ChatInput } from './ChatInput'

export const Chat = ({ messages, regenerate, status, handleSubmit, handleSuggestionClick, setText, text }) => {
    return (
        <div>
            <ChatScreen
                messages={messages}
                regenerate={regenerate}
                status={status}
            />
            <ChatInput
                handleSubmit={handleSubmit}
                handleSuggestionClick={handleSuggestionClick}
                setText={setText}
                text={text}
                status={status}
                messages={messages}
                className="bottom-0 z-50 md:mb-2"
            />
        </div>
    )
}
