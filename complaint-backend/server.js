const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // for JSON parsing

mongoose.connect("mongodb://localhost:27017/complaintsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection failed:", err));

// Define a schema
const complaintSchema = new mongoose.Schema({
  galleryName: String,
  exhibitName: String,
  exhibitCode: String,
  exhibitProblem: String,
  concernSection: String,
});

// Create a model
const Complaint = mongoose.model("Complaint", complaintSchema);

// API route to receive complaints
app.post("/api/complaints", async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    res.status(201).json({ message: "Complaint saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving complaint" });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
