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
module.exports = {
  createConsultation,
  getTodayQueue,
};