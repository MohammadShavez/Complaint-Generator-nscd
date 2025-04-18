require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const complaintsRoute = require("./routes/complaints");

const app = express();
app.use(cors());
app.use(express.json());

const complaintRoutes = require("./routes/complaints");
app.use("/complaints", complaintRoutes);


// Routes
app.use("/complaints", complaintsRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Connected to MongoDB Atlas");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on http://localhost:${process.env.PORT || 5000}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
});
