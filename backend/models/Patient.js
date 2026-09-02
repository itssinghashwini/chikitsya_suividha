const mongoose = require("mongoose");
const crypto = require("crypto");

const patientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      required: true,
      trim: true,
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },

    emergencyContact: {
      type: String,
      required: true,
      trim: true,
    },

    abhald: {
      type: String,
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Generate patient ID automatically
patientSchema.pre("validate", function () {
  if (!this.patientId) {
    const randomPart = crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase();

    this.patientId = `PT-${randomPart}`;
  }
});
module.exports = mongoose.model("Patient", patientSchema);