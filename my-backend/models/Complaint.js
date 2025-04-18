const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  galleryName: String,
  exhibitName: String,
  exhibitCode: String,
  exhibitProblem: String,
  concernSection: String,
}, { timestamps: true });


router.delete("/:id", async (req, res) => {
  try {
    await Complaint.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete complaint" });
  }
});


module.exports = mongoose.model("Complaint", complaintSchema);
