const Consultation = require("../models/Consultation");

const getDashboardStats = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todaysConsultations = await Consultation.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    const todaysPatients = todaysConsultations.length;

    const waiting = todaysConsultations.filter(
      (consultation) => consultation.status === "waiting"
    ).length;

    const aiHistoriesReady = todaysConsultations.filter(
      (consultation) => consultation.aiHistoryReady === true
    ).length;

    const attentionRequired = todaysConsultations.filter(
      (consultation) => consultation.attentionRequired === true
    ).length;

    res.status(200).json({
      status: "success",
      stats: {
        todaysPatients,
        aiHistoriesReady,
        waiting,
        attentionRequired,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch dashboard statistics",
    });
  }
};

module.exports = {
  getDashboardStats,
};