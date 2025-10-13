import { Thread } from "../models/Thread.models.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asynchandler.js";


export const createOrFetchThread = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { messages } = req.body;

    if (!Array.isArray(messages) || !messages.length) {
      return new ApiError(400, "messages array is required");
    }

    // Check if thread already exists
    let thread = await Thread.findOne({ threadId: id });

    if (!thread) {
      // Use first user message as title
      const title = messages[0]?.parts?.[0]?.text || "New Chat";

      thread = await Thread.create({
        threadId: id,
        title,
      });
    }

    res.status(200).json({
      success: true,
      thread,
    });
  } catch (err) {
    return new ApiError(500, err.message);
  }
});


export const getAllThreads = asyncHandler(async (req, res) => {
  try {
    const threads = await db
      .collection('threads')
      .find({})
      .sort({ updatedAt: -1 })
      .toArray();
    res.json(threads);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch threads' });
  }
});


export const getThreadById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const thread = await Thread.findOne({ threadId: id });

    if (!thread) {
      return new ApiError(404, "Thread not found");
    }

    res.status(200).json({ success: true, thread });
  } catch (err) {
    return new ApiError(500, err.message);
  }
});


