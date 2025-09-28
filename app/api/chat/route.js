import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamText } from 'ai';
import dotenv from "dotenv"

dotenv.config()

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
});


export const maxDuration = 30

export async function POST(req) {
    try {
        const { messages } = await req.json()
        const msg = messages[messages.length - 1].parts[0].text
        if (!msg || msg.length === 0) {
            return new Response('No messages in the request', { status: 400 })
        }
        const result = streamText({
            model: openrouter.chat('gpt-4o-mini'),
            maxOutputTokens: 1000,
            messages: [
                {
                    role: 'user',
                    content: msg
                }
            ],
        });
        if (!result) {
            return new Response('No response from OpenRouter', { status: 500 })
        }
        return result.toUIMessageStreamResponse()
    } catch (error) {
        return new Response(error.message, { status: 500 })
    }

}