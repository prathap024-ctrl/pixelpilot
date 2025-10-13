import { Action, Actions } from '@/components/ai-elements/actions'
import { Message, MessageContent } from '@/components/ai-elements/message'
import { Response } from '@/components/ai-elements/response'
import { Check, CopyIcon, RefreshCcwIcon } from 'lucide-react'
import React, { Fragment, memo, useState } from 'react'

export const TextResponse = memo(({ part, message, regenerate, isLastMessage }) => {
    const [copy, setCopy] = useState("")

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        setCopy(true)
        setTimeout(() => setCopy(false), 2000);
    }


    return (
        <div>
            <Fragment>
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
        </div>
    )
}
)