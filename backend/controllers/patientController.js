const Patient = require("../models/Patient");

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


module.exports = {
  createPatient,
  getPatients,
  getPatientById,
};