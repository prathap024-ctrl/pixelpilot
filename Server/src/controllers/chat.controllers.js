import { google } from '@ai-sdk/google';
import {
    convertToModelMessages,
    createUIMessageStream,
    stepCountIs,
    streamText,
} from 'ai';
import { tools } from '../tools/tools.js';
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { redis } from '../utils/redis.js';
import { v4 as uuidv4 } from "uuid"


const openRouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
});

export const createChat = async (req, res) => {
    try {
        const { messages } = req.body;

        if (!Array.isArray(messages) || !messages.length) {
            return res.status(400).json({ error: 'messages array required' });
        }
        const stream = createUIMessageStream({
            originalMessages: messages,
            execute: async ({ writer }) => {
                const result = streamText({
                    //model: openRouter("nvidia/nemotron-nano-9b-v2:free"),
                    //model: openRouter("openai/gpt-4o-mini"),
                    model: google('gemini-2.5-flash'),
                    messages: convertToModelMessages(messages),
                    tools: tools,
                    stopWhen: stepCountIs(5),
                })

                writer.merge(result.toUIMessageStream({ originalMessages: messages }))
            }
        })

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        // Convert objects to strings before writing
        await stream.pipeTo(
            new WritableStream({
                write(chunk) {
                    // Serialize the chunk
                    const delta = typeof chunk === "string" ? chunk : JSON.stringify(chunk);
                    res.write(`data: ${delta}\n\n`);
                },
                close() {
                    res.write("event: end\ndata: [DONE]\n\n");
                    res.end();
                },
            })
        );

    } catch (error) {
        console.error("SSE Chat Error:", error);

        if (!res.headersSent) {
            res.status(500).json({ error: error.message });
        } else {
            // Headers already sent → just close the stream safely
            res.write(`event: error\ndata: ${JSON.stringify({ error: error.message })}\n\n`);
            res.end();
        }
    }
}



