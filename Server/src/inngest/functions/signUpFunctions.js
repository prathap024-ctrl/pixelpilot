import { inngest } from "../inngest.js";
import { NonRetriableError } from "inngest";
import { sendMail } from "../../utils/NodeMailer.js";
import { ApiResponse } from "../../utils/ApiResponse.js";


export const signUpFunction = inngest.createFunction(
    { id: "user.signup" },
    {
        event: "app/user.signup"
    },
    async ({ event, step }) => {
        try {
           
            return ApiResponse(200, "Email sent successfully")
        } catch (error) {
            throw new NonRetriableError(error.message)
        }
    }
)
