const generateClinicalHistory = async (session) => {
  const responses = session.rawResponses || {};

  return {
    chiefComplaint:
      responses.chiefComplaint || "Not provided",

    historyOfPresentIllness:
      responses.historyOfPresentIllness ||
      "History generated from kiosk responses.",

    symptoms: Array.isArray(responses.symptoms)
      ? responses.symptoms
      : [],

    duration:
      responses.duration || "Not provided",

    additionalInformation:
      responses.additionalInformation ||
      "No additional information provided.",
  };
};

module.exports = {
  generateClinicalHistory,
};