import { eq } from "drizzle-orm";
import { db } from "../../db/db.js";
import { inngest } from "../inngest.js";
import { NonRetriableError } from "inngest";

export const databaseFunction = inngest.createFunction(
    { id: "database" },
    { event: "app/database.createThread" },
    async ({ event, step }) => {
        try {
            const { userId, title } = event.data
            const user = await step.run("find-user", async () => {
                const userObject = await db.select().from(conversationsTable).where(eq(conversationsTable.userId, userId))
                if (!userObject) {
                    throw new NonRetriableError("User not found")
                }
                return userObject
            })
            await step.run("save-message-thread", async () => {
                await db.insert(conversationsTable).values({
                    userId: user.id,
                    title: title
                })
            })
        } catch (error) {
            throw new NonRetriableError(error.message)
        }
    }
)