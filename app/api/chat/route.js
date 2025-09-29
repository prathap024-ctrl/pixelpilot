import { google } from '@ai-sdk/google';
import { convertToModelMessages, streamText } from 'ai';
import dotenv from 'dotenv';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

dotenv.config();

const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
})

export const maxDuration = 30;

export async function POST(req) {
    try {
        const { messages } = await req.json();

        if (!messages || messages.length === 0) {
            return new Response(
                JSON.stringify({ error: 'No messages provided' }),
                {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' }
                }
            );
        }

        const result = streamText({
            model: openrouter("nvidia/nemotron-nano-9b-v2:free"),
            //model: google("gemini-2.5-flash"),
            system: "You are a helpful assistant that thinks step-by-step before answering.",
            messages: convertToModelMessages(messages),
        });
        const response = result.toUIMessageStreamResponse({
            sendReasoning: true,
        });
        return response;
    } catch (error) {
        console.error('Error message:', error.message);

        return new Response(
            JSON.stringify({
                error: error.message || 'Internal server error',
                type: error.name,
            }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}
