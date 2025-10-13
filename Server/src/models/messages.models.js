import mongoose from "mongoose";

const partSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['text', 'image', 'tool-call', 'step-start', 'step-end'],
      required: true,
    },
    text: { type: String },
    providerMetadata: { type: Object },
    state: {
      type: String,
      enum: ['pending', 'streaming', 'done'],
      default: 'done',
    },
  },
  { _id: false }
);

// Message Schema
const messageSchema = new mongoose.Schema(
  {
    threadId: {
      type: String,
      required: true,
      index: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'assistant', 'system', 'tool'],
      required: true,
    },
    parts: {
      type: [partSchema],
      required: true,
      default: [],
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);
