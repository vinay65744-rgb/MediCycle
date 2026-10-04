const express = require("express");
const { ObjectId } = require("mongodb");
const { getDatabase } = require("../db");

const router = express.Router();

/*
  GET /api/pickups

  Used by the collector dashboard to retrieve
  available pickup requests.
*/
router.get("/", async (req, res) => {
  try {
    const db = getDatabase();

    const pickups = await db
      .collection("pickups")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.json(pickups);
  } catch (error) {
    console.error("GET /api/pickups error:", error);

    res.status(500).json({
      message: "Failed to fetch pickup requests",
    });
  }
});

/*
  POST /api/pickups

  Used by the hospital dashboard to create
  a new pickup request.
*/
router.post("/", async (req, res) => {
  try {
    const db = getDatabase();

    const {
      hospital,
      category,
      weight,
      bags,
      pickupDate,
      pickupTime,
      notes,
      collector,
    } = req.body;

    if (!hospital || !category || !weight || !bags) {
      return res.status(400).json({
        message: "Hospital, category, weight and bags are required.",
      });
    }

    const trackingId = `MC-${Date.now().toString().slice(-7)}`;

    const pickup = {
      trackingId,

      hospital,
      category,
      weight: Number(weight),
      bags: Number(bags),

      pickupDate: pickupDate || null,
      pickupTime: pickupTime || null,

      notes: notes || "",

      collector: collector || null,

      status: "REQUESTED",

      statusHistory: [
        {
          status: "REQUESTED",
          timestamp: new Date(),
          actor: "hospital",
        },
      ],

      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection("pickups")
      .insertOne(pickup);

    const createdPickup = {
      ...pickup,
      _id: result.insertedId,
    };

    res.status(201).json(createdPickup);
  } catch (error) {
    console.error("POST /api/pickups error:", error);

    res.status(500).json({
      message: "Failed to create pickup request",
    });
  }
});

/*
  PUT /api/pickups/:id/status

  Used by the collector to change pickup status.
*/
router.put("/:id/status", async (req, res) => {
  try {
    const db = getDatabase();

    const { id } = req.params;
    const { status, actor = "collector" } = req.body;

    const allowedStatuses = [
      "REQUESTED",
      "ACCEPTED",
      "ON_THE_WAY",
      "COLLECTED",
      "IN_TRANSIT",
      "AT_FACILITY",
      "PROCESSING",
      "RECYCLED",
      "FINAL_DISPOSAL",
      "COMPLETED",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid pickup status.",
      });
    }

    let objectId;

    try {
      objectId = new ObjectId(id);
    } catch {
      return res.status(400).json({
        message: "Invalid pickup ID.",
      });
    }

    const statusEntry = {
      status,
      timestamp: new Date(),
      actor,
    };

    const result = await db.collection("pickups").findOneAndUpdate(
      { _id: objectId },
      {
        $set: {
          status,
          updatedAt: new Date(),
        },
        $push: {
          statusHistory: statusEntry,
        },
      },
      {
        returnDocument: "after",
      }
    );

    if (!result) {
      return res.status(404).json({
        message: "Pickup not found.",
      });
    }

    res.json(result);
  } catch (error) {
    console.error("PUT /api/pickups/:id/status error:", error);

    res.status(500).json({
      message: "Failed to update pickup status",
    });
  }
});

module.exports = router;