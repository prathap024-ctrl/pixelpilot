import { Router } from "express";
import { createChat } from "../controllers/chat.controllers.js";

const router = Router()

router.route("/llm").post(createChat)

export default router