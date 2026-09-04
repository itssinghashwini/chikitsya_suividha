const Session = require("../models/Session");
const Document = require("../models/Document");

const uploadDocument = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { type } = req.body;

    // Check session
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({
        status: "error",
        message: "Session not found",
      });
    }

    // Check file
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "Document file is required",
      });
    }

    // Check document type
    const allowedTypes = [
      "prescription",
      "lab-report",
      "discharge-summary",
    ];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        status: "error",
        message:
          "Invalid document type. Use prescription, lab-report or discharge-summary",
      });
    }

    const document = await Document.create({
      session: sessionId,
      type,
      originalName: req.file.originalname,
      filePath: req.file.path,
      mimeType: req.file.mimetype,
    });

    res.status(201).json({
      status: "success",
      message: "Document uploaded successfully",
      document,
    });
  } catch (error) {
    console.error(
      "Document upload error:",
      error.message
    );

    res.status(500).json({
      status: "error",
      message: "Failed to upload document",
    });
  }
};

module.exports = {
  uploadDocument,
};