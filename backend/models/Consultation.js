const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    chiefComplaint: {
      type: String,
      required: true,
      trim: true,
    },

    prakriti: {
      type: String,
      trim: true,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "waiting",
        "ready",
        "in-consultation",
        "completed",
      ],
      default: "waiting",
    },

    // Set to true when AI processing of the patient's
    // history/case is completed and ready for practitioner.
    aiHistoryReady: {
      type: Boolean,
      default: false,
    },

    // Set by AI/rule engine when the case needs
    // practitioner's special attention.
    attentionRequired: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Consultation",
  consultationSchema
);