import { tool } from "ai";
import { z } from "zod/v4";

export const tools = {
    getWeather: tool({
        description: 'Fetch weather information for a specific location',
        parameters: z.object({
            location: z
                .string()
                .describe('The city or location to get weather for'),
            units: z
                .enum(['celsius', 'fahrenheit'])
                .default('celsius')
                .describe('Temperature units'),
        }),
        inputSchema: z.object({
            location: z.string(),
            units: z.enum(['celsius', 'fahrenheit']).default('celsius'),
        }),
        execute: async ({ location, units }) => {
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const temp =
                units === 'celsius'
                    ? Math.floor(Math.random() * 35) + 5
                    : Math.floor(Math.random() * 63) + 41;

            return {
                location,
                temperature: `${temp}°${units === 'celsius' ? 'C' : 'F'}`,
                conditions: 'Sunny',
                humidity: `12%`,
                windSpeed: `35 ${units === 'celsius' ? 'km/h' : 'mph'}`,
                lastUpdated: new Date().toLocaleString(),
            };
        },
    })
}