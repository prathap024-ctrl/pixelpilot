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
import { Suggestion, Suggestions } from '../ai-elements/suggestion';

const suggestions = [
    'What is the weather in Tokyo?',
    'Can you help me write or improve this content?',
    'Explain quantum computing in simple terms.',
    'How can I improve my CV or LinkedIn profile?',
    'Can you summarize this article or report?',
    'What are some creative ideas for a marketing campaign?',
    'Can you help me with my homework or study for an exam?',
    'What’s the latest news on climate change?',
    'Can you generate a personalized daily briefing for me?'
];

export const ChatInput = ({ handleSubmit, text, setText, status, handleSuggestionClick, messages, className }) => {
    return (
        <>
            <div className={`absolute w-full ${className}`}>
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
                    <PromptInput onSubmit={handleSubmit} globalDrop multiple>
                        <PromptInputBody>
                            <PromptInputAttachments>
                                {(attachment) => <PromptInputAttachment data={attachment} />}
                            </PromptInputAttachments>
                            <PromptInputTextarea
                                onChange={(e) => setText(e.target.value)}
                                value={text}
                                disabled={status === 'streaming'}
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
