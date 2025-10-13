import { Message, MessageContent } from '@/components/ai-elements/message';
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from '@/components/ai-elements/tool';
import React, { memo } from 'react'

export const ToolResponse = memo(({ part, message }) => {
    switch (part.state) {
        case "input-streaming":
            return (
                <Message from={message.role}>
                    <MessageContent>
                        <Tool defaultOpen={true}>
                            <ToolHeader type="tool-getWeather" state={part.state} />
                            <ToolContent>
                                <ToolInput input={part.input} />
                                <div className="text-sm text-muted-foreground px-4 py-2">Calling tool service…</div>
                            </ToolContent>
                        </Tool>
                    </MessageContent>
                </Message>
            );
        case "input-available":
            return (
                <Message from={message.role}>
                    <MessageContent>
                        <Tool defaultOpen={true}>
                            <ToolHeader type="tool-getWeather" state={part.state} />
                            <ToolContent>
                                <ToolInput input={part.input} />
                                <div className="text-sm text-muted-foreground px-4 py-2">Calling tool service…</div>
                            </ToolContent>
                        </Tool>
                    </MessageContent>
                </Message>
            );
        case "output-available":
            return (
                <Message from={message.role}>
                    <MessageContent>
                        <Tool defaultOpen={true}>
                            <ToolHeader type="tool-getWeather" state={part.state} />
                            <ToolContent>
                                <ToolInput input={part.input} />
                                <ToolOutput
                                    output={
                                        weatherJson(part.output)
                                    }
                                    errorText={part.errorText}
                                />
                            </ToolContent>
                        </Tool>
                    </MessageContent>
                </Message>
            );
        default:
            return null
    }
})



function weatherJson(result) {
    return {
        location: result.location,
        temperature: result.temperature,
        conditions: result.conditions,
        humidity: result.humidity,
        windSpeed: result.windSpeed,
        lastUpdated: result.lastUpdated,
    };
}