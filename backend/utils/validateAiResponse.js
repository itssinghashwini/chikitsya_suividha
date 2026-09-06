const validateAiResponse = (summary) => {
  if (!summary || typeof summary !== "object") {
    return {
      valid: false,
      message: "AI response must be an object",
    };
  }

  if (
    typeof summary.chiefComplaint !== "string" ||
    !summary.chiefComplaint.trim()
  ) {
    return {
      valid: false,
      message: "Invalid chiefComplaint in AI response",
    };
  }

  if (
    typeof summary.historyOfPresentIllness !== "string"
  ) {
    return {
      valid: false,
      message:
        "Invalid historyOfPresentIllness in AI response",
    };
  }

  if (!Array.isArray(summary.symptoms)) {
    return {
      valid: false,
      message: "Invalid symptoms in AI response",
    };
  }

  if (typeof summary.duration !== "string") {
    return {
      valid: false,
      message: "Invalid duration in AI response",
    };
  }

  if (
    typeof summary.additionalInformation !== "string"
  ) {
    return {
      valid: false,
      message:
        "Invalid additionalInformation in AI response",
    };
  }

  return {
    valid: true,
  };
};

module.exports = validateAiResponse;