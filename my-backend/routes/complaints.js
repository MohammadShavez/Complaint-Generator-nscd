const express = require("express");
const router = express.Router();
const Complaint = require("../models/Complaint");

router.post("/", async (req, res) => {
  try {
    const newComplaint = new Complaint(req.body);
    await newComplaint.save();
    res.status(201).json({ message: "Complaint saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving complaint" });
  }
});

router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving complaints" });
  }
});

module.exports = router;
