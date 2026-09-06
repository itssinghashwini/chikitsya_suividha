const Patient = require("../models/Patient");
const Consultation = require("../models/Consultation");

const createPatient = async (req,res)=> {
    try{
        const {
            name, age , gender, contactNumber, emergencyContact, abhaId, } = req.body;
            if(!name ||!age || !gender || !contactNumber || !emergencyContact){
                return res.status(400).json({
                    status: "error",
                    message : "Required patient fields are missing ",
                });
            }
            const patient = await Patient.create({
            name,age, gender, contactNumber, emergencyContact, abhaId: abhaId || null,
            createdBy: req.user.id,
    });

    res.status(201).json({
      status: "success",
      message: "Patient created successfully",
      patient,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


const getPatients = async (req, res) => {
  try {
    const { search } = req.query;

    let filter = {};

    if (search) {
      filter = {
        $or: [
          {
            name: {
              $regex: search,
              $options: "i",
            },
          },
          {
            patientId: {
              $regex: search,
              $options: "i",
            },
          },
        ],
      };
    }

    const patients = await Patient.find(filter)
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      count: patients.length,
      patients,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await Patient.findOne({
      patientId: id,
    }).populate("createdBy", "name email role");

    if (!patient) {
      return res.status(404).json({
        status: "error",
        message: "Patient not found",
      });
    }

    res.status(200).json({
      status: "success",
      patient,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getPatientHistory = async (req, res) => {
  try {
    const { id } = req.params;

    // Find patient using patientId
    const patient = await Patient.findOne({
      patientId: id,
    });

    if (!patient) {
      return res.status(404).json({
        status: "error",
        message: "Patient not found",
      });
    }

    // Find all consultations for this patient
    const consultations = await Consultation.find({
      patient: patient._id,
    }).sort({ createdAt: -1 });

    const history = consultations.map((consultation) => ({
      consultationId: consultation._id,
      date: consultation.createdAt,
      chiefComplaint: consultation.chiefComplaint,
      prakriti: consultation.prakriti,
      condition: consultation.condition,
      status: consultation.status,
      aiHistoryReady: consultation.aiHistoryReady,
      attentionRequired: consultation.attentionRequired,
    }));

    res.status(200).json({
      status: "success",
      patient: {
        patientId: patient.patientId,
        name: patient.name,
      },
      count: history.length,
      history,
    });
  } catch (error) {
    console.error("Patient history error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch patient history",
    });
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  getPatientHistory,
};