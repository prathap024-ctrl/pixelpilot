import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import dotenv from "dotenv"

dotenv.config()

export const maxDuration = 30

export async function POST(req) {
    try {
        const { messages } = await req.json()
        const msg = messages[messages.length - 1].parts[0].text
        if (!msg || msg.length === 0) {
            return new Response('No messages in the request', { status: 400 })
        }
        console.log("AI Request:", msg);
        
        const result = streamText({
            model: google("gemini-2.0-flash"),
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
        console.log("AI Response:", result);
        
        return result.toUIMessageStreamResponse()
    } catch (error) {
        return new Response(error.message, { status: 500 })
    }

}