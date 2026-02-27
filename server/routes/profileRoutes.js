import express from "express";
import { updateUserProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/update", protect, updateUserProfile);

export default router;
