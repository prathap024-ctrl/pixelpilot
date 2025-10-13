import mongoose from "mongoose";

const toolCallSchema = new mongoose.Schema(
  {
    messageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      required: true,
    },
    toolName: { type: String, required: true },
    arguments: { type: Object, default: {} },
    result: { type: Object },
    status: {
      type: String,
      enum: ['pending', 'success', 'error'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const ToolCall = mongoose.model("ToolCall", toolCallSchema);
