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
import { GlobeIcon, MicIcon } from 'lucide-react';
import { useState } from 'react';
import { ChatScreen } from './ChatScreen';
import { useChat } from '@ai-sdk/react';
const models = [
    { id: 'gpt-4o', name: 'GPT-4o' },
    { id: 'claude-opus-4-20250514', name: 'Claude 4 Opus' },
];

export const ChatInput = ({ status, sendMessage }) => {
    const [text, setText] = useState('');
    const [useMicrophone, setUseMicrophone] = useState(false);
    const [useWebSearch, setUseWebSearch] = useState(false);


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
            {
                body: {
                    webSearch: useWebSearch,
                },
            },
        );
        setText('');
    };

    return (
        <>
            <div className='absolute w-full bottom-0 z-50 p-4'>
                <div className="w-full max-w-3xl mx-auto">
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
                                <PromptInputButton
                                    onClick={() => setUseMicrophone(!useMicrophone)}
                                    variant={useMicrophone ? 'default' : 'ghost'}
                                >
                                    <MicIcon size={16} />
                                    <span className="sr-only">Microphone</span>
                                </PromptInputButton>
                                <PromptInputButton
                                    onClick={() => setUseWebSearch(!useWebSearch)}
                                    variant={useWebSearch ? 'default' : 'ghost'}
                                >
                                    <GlobeIcon size={16} />
                                    <span>Search</span>
                                </PromptInputButton>
                            </PromptInputTools>
                            <PromptInputSubmit disabled={!text && status === "loading"} status={status} />
                        </PromptInputToolbar>
                    </PromptInput>
                </div>
            </div>
        </>
    );
};
