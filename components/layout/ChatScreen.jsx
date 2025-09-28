'use client';

import {
    Conversation,
    ConversationContent,
    ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Message, MessageContent } from '@/components/ai-elements/message';
import { Response } from '@/components/ai-elements/response';


export const ChatScreen = ({ messages }) => {
    return (
        <div className="max-w-[50rem] mx-auto relative md:p-6 size-full rounded-lg md:h-[580px] h-[560px]">
            <div className="flex flex-col h-full">
                <Conversation>
                    <ConversationContent>
                        {messages.map((message) => (
                            <Message from={message.role} key={message.id}>
                                <MessageContent>
                                    {message.parts.map((part, i) => {
                                        switch (part.type) {
                                            case 'text': 
                                                return (
                                                    <Response key={`${message.id}-${i}`}>
                                                        {part.text}
                                                    </Response>
                                                );
                                            default:
                                                return null;
                                        }
                                    })}
                                </MessageContent>
                            </Message>
                        ))}
                    </ConversationContent>
                    <ConversationScrollButton />
                </Conversation>
            </div>
        </div>
    );
};

