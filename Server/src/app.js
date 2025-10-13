import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit"
import { toNodeHandler } from "better-auth/node"
import { serve } from "inngest/express"
// import { inngest } from "./inngest/inngest.js"
// import { signUpFunction } from "./inngest/functions/signUpFunctions.js"
import { auth } from "./auth.js";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);


app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(express.static("files"));
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
})

// Apply the rate limiting middleware to all requests.
app.use(limiter)

// Routes import
import chatRouter from "./routes/chat.routes.js";
import threadRoutes from "./routes/Thread.routes.js"

// Routes
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/", threadRoutes)
// app.use("/api/inngest", serve({ client: inngest, functions: [signUpFunction] }));
app.all("/api/*", toNodeHandler(auth))

export { app };
