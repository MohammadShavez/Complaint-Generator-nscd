const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ Mongo error:', err));

// Schema
const Complaint = mongoose.model('Complaint', new mongoose.Schema({
  galleryName: String,
  exhibitName: String,
  exhibitCode: String,
  exhibitProblem: String,
  concernSection: String,
  createdAt: { type: Date, default: Date.now }
}));

// POST route
app.post('/complaints', async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    res.status(201).json({ message: 'Saved' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving', error: err });
  }
});

// GET route
app.get('/complaints', async (req, res) => {
  const data = await Complaint.find();
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
