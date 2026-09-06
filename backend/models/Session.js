const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      required: true,
      trim: true,
    },

    consentTimestamp: {
      type: Date,
      required: true,
    },

    rawResponses: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    status: {
      type: String,
      enum: ["in-progress", "complete"],
      default: "in-progress",
    },
    consultation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Consultation",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Session", sessionSchema);