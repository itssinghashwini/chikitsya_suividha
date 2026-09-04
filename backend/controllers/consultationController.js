const Consultation = require("../models/Consultation");

const getTodayQueue = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const consultations = await Consultation.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    })
      .populate(
        "patient",
        "patientId name"
      )
      .sort({ createdAt: 1 });

    const queue = consultations
  .filter((consultation) => consultation.patient)
  .map((consultation) => ({
    patientId: consultation.patient.patientId,
    name: consultation.patient.name,
    chiefComplaint: consultation.chiefComplaint,
    prakriti: consultation.prakriti,
    time: consultation.createdAt,
    status: consultation.status,
  }));

    res.status(200).json({
      status: "success",
      count: queue.length,
      queue,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
const createConsultation = async (req, res) => {
  try {
    const {
  patient,
  chiefComplaint,
  prakriti,
  status,
  aiHistoryReady,
  attentionRequired,
} = req.body;

    if (!patient || !chiefComplaint) {
      return res.status(400).json({
        status: "error",
        message:
          "Patient and chief complaint are required",
      });
    }

    const consultation = await Consultation.create({
  patient,
  chiefComplaint,
  prakriti: prakriti || null,
  status: status || "waiting",
  aiHistoryReady: aiHistoryReady || false,
  attentionRequired: attentionRequired || false,
});
    const populatedConsultation =
      await consultation.populate(
        "patient",
        "patientId name"
      );

    res.status(201).json({
      status: "success",
      message: "Consultation created successfully",
      consultation: populatedConsultation,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
const updateConsultation = async (req, res) => {
  try {
    const { id } = req.params;

    const consultation = await Consultation.findById(id);

    if (!consultation) {
      return res.status(404).json({
        status: "error",
        message: "Consultation not found",
      });
    }

    // Do not allow editing after confirmation
    if (consultation.locked) {
      return res.status(400).json({
        status: "error",
        message: "Consultation is locked and cannot be edited",
      });
    }

    const {
      chiefComplaint,
      prakriti,
      clinicalHistorySummary,
      attentionRequired,
    } = req.body;

    if (chiefComplaint !== undefined) {
      consultation.chiefComplaint = chiefComplaint;
    }

    if (prakriti !== undefined) {
      consultation.prakriti = prakriti;
    }

    if (clinicalHistorySummary !== undefined) {
      consultation.clinicalHistorySummary =
        clinicalHistorySummary;
    }

    if (attentionRequired !== undefined) {
      consultation.attentionRequired =
        attentionRequired;
    }

    await consultation.save();

    res.status(200).json({
      status: "success",
      message: "Consultation updated successfully",
      consultation,
    });
  } catch (error) {
    console.error(
      "Update consultation error:",
      error.message
    );

    res.status(500).json({
      status: "error",
      message: "Failed to update consultation",
    });
  }
};
const confirmConsultation = async (req, res) => {
  try {
    const { id } = req.params;

    const consultation = await Consultation.findById(id);

    if (!consultation) {
      return res.status(404).json({
        status: "error",
        message: "Consultation not found",
      });
    }

    // Prevent confirming an already locked consultation
    if (consultation.locked) {
      return res.status(400).json({
        status: "error",
        message: "Consultation is already confirmed and locked",
      });
    }

    // AI summary must exist before confirmation
    if (!consultation.clinicalHistorySummary) {
      return res.status(400).json({
        status: "error",
        message: "Clinical history summary is not available",
      });
    }

    // Lock the consultation
    consultation.locked = true;

    // Mark as ready for physician consultation
    consultation.status = "ready";

    // Record who confirmed it
    consultation.confirmedBy = req.user.id;

    // Record confirmation time
    consultation.confirmedAt = new Date();

    await consultation.save();

    const confirmedConsultation =
      await consultation.populate([
        {
          path: "patient",
          select: "patientId name",
        },
        {
          path: "confirmedBy",
          select: "name email role",
        },
      ]);

    res.status(200).json({
      status: "success",
      message:
        "Consultation confirmed and locked successfully",
      consultation: confirmedConsultation,
    });
  } catch (error) {
  console.error("Confirm consultation error:", error);

  res.status(500).json({
    status: "error",
    message: error.message,
  });
}}
module.exports = {
  createConsultation,
  getTodayQueue,
  updateConsultation,
  confirmConsultation,
};