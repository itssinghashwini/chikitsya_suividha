const Reminder = require("../models/Reminder");

const getDueReminders = async (req, res) => {
  try {
    const now = new Date();

    const reminders = await Reminder.find({
      followUpDate: {
        $lte: now,
      },
      status: "pending",
    })
      .populate("patient", "patientId name")
      .populate("consultation", "chiefComplaint")
      .sort({ followUpDate: 1 });

    res.status(200).json({
      status: "success",
      count: reminders.length,
      reminders,
    });
  } catch (error) {
    console.error("Get due reminders error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch due reminders",
    });
  }
};

module.exports = {
  getDueReminders,
};