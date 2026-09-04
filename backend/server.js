const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const consultationRoutes = require("./routes/consultationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const documentRoutes = require("./routes/documentRoutes");

require("dotenv").config();
const connectDB = require("./config/db");
const app=express();

connectDB();

//middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/consultations",consultationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/sessions", documentRoutes);

//health check
app.get("/api/health",(req,res) => {
    res.status(200).json({
        status:"sucess",
        message :"Backed is running",
    });
});
// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});