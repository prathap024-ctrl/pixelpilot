import { Router } from "express";
import { createOrFetchThread, getThreadById, getAllThreads } from "../controllers/Thread.controllers.js";

const router = Router()

router.route("/create-thread").post(createOrFetchThread)

router.route("/fetch-thread/:id").get(getThreadById)

router.route("/all-threads").get(getAllThreads)

export default router