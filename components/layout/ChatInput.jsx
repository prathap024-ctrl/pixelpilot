'use client';

import {
    PromptInput,
    PromptInputActionAddAttachments,
    PromptInputActionMenu,
    PromptInputActionMenuContent,
    PromptInputActionMenuTrigger,
    PromptInputAttachment,
    PromptInputAttachments,
    PromptInputBody,
    PromptInputButton,
    PromptInputModelSelect,
    PromptInputModelSelectContent,
    PromptInputModelSelectItem,
    PromptInputModelSelectTrigger,
    PromptInputModelSelectValue,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputToolbar,
    PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import { useState } from 'react';
import { Suggestion, Suggestions } from '../ai-elements/suggestion';

const suggestions = [
    'Can you explain how to play tennis?',
    'What is the weather in Tokyo?',
];

export const ChatInput = ({ status, sendMessage, messages }) => {
    const [text, setText] = useState('');

    const handleSubmit = (message) => {
        const hasText = Boolean(message.text);
        const hasAttachments = Boolean(message.files?.length);

        if (!(hasText || hasAttachments)) {
            return;
        }

        sendMessage(
            {
                text: message.text || 'Sent with attachments',
                files: message.files
            },
        );
        setText('');
    };
    const handleSuggestionClick = (suggestion) => {
        sendMessage({ text: suggestion });
    };

    return (
        <>
            <div className='absolute w-full bottom-0 z-50 p-2'>
                <div className="w-full max-w-[44rem] mx-auto">
                    {messages.length === 0 && <Suggestions>
                        {suggestions.map((suggestion) => (
                            <Suggestion
                                key={suggestion}
                                onClick={handleSuggestionClick}
                                suggestion={suggestion}
                            />
                        ))}
                    </Suggestions>}
                    <PromptInput onSubmit={handleSubmit} className="mt-4" globalDrop multiple>
                        <PromptInputBody>
                            <PromptInputAttachments>
                                {(attachment) => <PromptInputAttachment data={attachment} />}
                            </PromptInputAttachments>
                            <PromptInputTextarea
                                onChange={(e) => setText(e.target.value)}
                                value={text}
                            />
                        </PromptInputBody>
                        <PromptInputToolbar>
                            <PromptInputTools>
                                <PromptInputActionMenu>
                                    <PromptInputActionMenuTrigger />
                                    <PromptInputActionMenuContent>
                                        <PromptInputActionAddAttachments />
                                    </PromptInputActionMenuContent>
                                </PromptInputActionMenu>
                            </PromptInputTools>
                            <PromptInputSubmit disabled={!text && status === "loading"} status={status === 'streaming' ? 'streaming' : 'ready'} />
                        </PromptInputToolbar>
                    </PromptInput>
                </div>
            </div>
        </>
    );
};
