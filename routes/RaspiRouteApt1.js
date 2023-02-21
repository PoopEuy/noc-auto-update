import express from "express";
import {
  getSiteQueue_apt1,
  updateStatusRaspis_apt1,
  getSiteQueue_apt2,
  updateStatusRaspis_apt2,
} from "../controllers/RaspiControllerApt1.js";

const router = express.Router();

router.post("/getSiteQueue_apt1", getSiteQueue_apt1);
router.patch("/updateStatusRaspis_apt1", updateStatusRaspis_apt1);
router.post("/getSiteQueue_apt2", getSiteQueue_apt2);
router.patch("/updateStatusRaspis_apt2", updateStatusRaspis_apt2);
// router.get("/getSiteQueue/:id", getSiteQueueById);
// router.post("/createMframe", createMframe);

// router.patch("/updateMframeById/:id", updateMframeById);
// router.patch("/updateMframeByFrame/", updateMframeByFrame);
// router.delete("/deleteMframe/:id", deleteMframe);
// router.post("/getMframByFrame", getMframByFrame);
export default router;
