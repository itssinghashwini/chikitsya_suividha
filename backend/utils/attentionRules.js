const RED_FLAG_KEYWORDS = [
  "chest pain",
  "difficulty breathing",
  "shortness of breath",
  "severe bleeding",
  "loss of consciousness",
  "unconscious",
  "seizure",
  "severe allergic reaction",
  "suicidal thoughts",
];

const checkAttentionRequired = (clinicalHistorySummary) => {
  if (!clinicalHistorySummary) {
    return false;
  }

  const text = JSON.stringify(clinicalHistorySummary).toLowerCase();

  return RED_FLAG_KEYWORDS.some((keyword) =>
    text.includes(keyword)
  );
};

module.exports = {
  checkAttentionRequired,
};