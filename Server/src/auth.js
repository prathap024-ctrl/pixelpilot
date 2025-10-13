import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client, db } from "./db/db.js";

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client: client,
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    user: {
        additionalFields: {
            phone: {
                type: "string",
                required: false
            }
        }
    },
    plugins: [
        {
            rateLimit: {
                enabled: true,
                window: 60,
                max: 100,
                message: "Too many requests, please try again later.",
            },
        }
    ]
});