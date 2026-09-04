const express = require("express");

console.log("Document routes loaded");
const {
  uploadDocument,
} = require("../controllers/documentController");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post(
  "/:sessionId/documents",
  upload.single("document"),
  uploadDocument
);
router.get("/test", (req, res) => {
  res.json({
    status: "success",
    message: "Document routes are working"
  });
});
module.exports = router;