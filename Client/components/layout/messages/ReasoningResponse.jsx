import { Message, MessageContent } from '@/components/ai-elements/message'
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements/reasoning'
import React, { memo } from 'react'

export const ReasoningResponse = memo(({ part, message, isStreaming }) => {
    return (
        <div>
            <Message from={message.role}>
                <MessageContent>
                    <Reasoning
                        className="w-full"
                        isStreaming={isStreaming}
                    >
                        <ReasoningTrigger />
                        <ReasoningContent>{part.text}</ReasoningContent>
                    </Reasoning>
                </MessageContent>
            </Message>
        </div>
    )
})

