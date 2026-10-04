require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { connectDatabase } = require("./db");
const pickupRoutes = require("./routes/pickups");

const app = express();

const PORT = process.env.PORT || 5000;

/* Middleware */
app.use(cors());
app.use(express.json());

/* Health check */
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "MediCycle API is running",
  });
});

/* Pickup API */
app.use("/api/pickups", pickupRoutes);

/* 404 */
app.use((req, res) => {
  res.status(404).json({
    message: "API route not found",
  });
});

/* Start server */
async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`MediCycle API running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();