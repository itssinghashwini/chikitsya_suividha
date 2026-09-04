const Session = require("../models/Session");
const Consultation = require("../models/Consultation");

const {
  generateClinicalHistory,
} = require("../services/aiService");
const validateAiResponse = require("../utils/validateAiResponse");
// Start a new kiosk session
const createSession = async (req, res) => {
  try {
    const { language, consentTimestamp } = req.body;

    if (!language) {
      return res.status(400).json({
        status: "error",
        message: "Language is required",
      });
    }

    const session = await Session.create({
      language,
      consentTimestamp: consentTimestamp || new Date(),
      rawResponses: {},
      status: "in-progress",
    });

    res.status(201).json({
      status: "success",
      message: "Vaidyalekha session started",
      session,
    });
  } catch (error) {
    console.error("Create session error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to create session",
    });
  }
};


// Save/update kiosk answers
const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { rawResponses, status } = req.body;

    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({
        status: "error",
        message: "Session not found",
      });
    }

    if (rawResponses) {
      session.rawResponses = {
        ...session.rawResponses,
        ...rawResponses,
      };
    }

    if (status) {
      session.status = status;
    }

    await session.save();

    res.status(200).json({
      status: "success",
      message: "Session updated successfully",
      session,
    });
  } catch (error) {
    console.error("Update session error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to update session",
    });
  }
};

const completeSession = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      patient,
      chiefComplaint,
      prakriti,
    } = req.body;

    // Find session
    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({
        status: "error",
        message: "Session not found",
      });
    }

    // Prevent duplicate consultation
    if (session.consultation) {
      return res.status(400).json({
        status: "error",
        message: "This session is already linked to a consultation",
        consultationId: session.consultation,
      });
    }

    // Patient is required
    if (!patient) {
      return res.status(400).json({
        status: "error",
        message: "Patient ID is required",
      });
    }

    // Create consultation
    const consultation = await Consultation.create({
      patient,
      chiefComplaint: chiefComplaint || "Not provided",
      prakriti: prakriti || "Not assessed",
      status: "waiting",
    });

    // Complete session and link consultation
    session.status = "complete";
    session.consultation = consultation._id;

    await session.save();

    res.status(200).json({
      status: "success",
      message: "Session completed and consultation created",
      session,
      consultation,
    });
  } catch (error) {
    console.error(
      "Complete session error:",
      error.message
    );

    res.status(500).json({
      status: "error",
      message: "Failed to complete session",
    });
  }
};
const generateSummary = async (req, res) => {
  try {
    const { id } = req.params;

    // Find session
    const session = await Session.findById(id);

    if (!session) {
      return res.status(404).json({
        status: "error",
        message: "Session not found",
      });
    }

    // Session must be complete
    if (session.status !== "complete") {
      return res.status(400).json({
        status: "error",
        message:
          "Session must be completed before generating summary",
      });
    }

    // Make sure session has a linked consultation
    if (!session.consultation) {
      return res.status(400).json({
        status: "error",
        message:
          "No consultation linked to this session",
      });
    }

    // Get consultation
    const consultation =
      await Consultation.findById(session.consultation);

    if (!consultation) {
      return res.status(404).json({
        status: "error",
        message: "Linked consultation not found",
      });
    }

    // Generate AI draft
    const aiSummary =
      await generateClinicalHistory(session);

    // Validate AI response
    const validation =
      validateAiResponse(aiSummary);

    if (!validation.valid) {
      return res.status(422).json({
        status: "error",
        message: "Invalid AI response",
        details: validation.message,
      });
    }

    // Save draft
    consultation.clinicalHistorySummary =
      aiSummary;

    consultation.aiHistoryReady = true;

    await consultation.save();

    res.status(200).json({
      status: "success",
      message:
        "Clinical history summary generated successfully",
      consultation,
    });
  } catch (error) {
    console.error(
      "Generate summary error:",
      error.message
    );

    res.status(500).json({
      status: "error",
      message: "Failed to generate clinical history summary",
    });
  }
};
module.exports = {
  createSession,
  updateSession,
  completeSession,
  generateSummary,
};