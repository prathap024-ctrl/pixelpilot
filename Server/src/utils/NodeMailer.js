import { createTransport } from "nodemailer"
import { ApiError } from "./ApiError.js";

export const sendMail = async (to, subject, html, text) => {
    try {
        const transporter = createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        })

        const info = await transporter.sendMail({
            from: '"no-reply" <autopixel.in@gmail.com>',
            to: to,
            subject: subject,
            text: text,
            html: html,
        });

        return info
    } catch (error) {
        throw new ApiError(500, error.message)
    }
}