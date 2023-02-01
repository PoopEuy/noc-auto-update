import express from "express";
import {
  getSiteQueue,
  updateStatusRaspis,
} from "../controllers/RaspiControllerApt1.js";

const router = express.Router();

router.post("/getSiteQueue", getSiteQueue);
router.patch("/updateStatusRaspis", updateStatusRaspis);
// router.get("/getSiteQueue/:id", getSiteQueueById);
// router.post("/createMframe", createMframe);

// router.patch("/updateMframeById/:id", updateMframeById);
// router.patch("/updateMframeByFrame/", updateMframeByFrame);
// router.delete("/deleteMframe/:id", deleteMframe);
// router.post("/getMframByFrame", getMframByFrame);
export default router;
