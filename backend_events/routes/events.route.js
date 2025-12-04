import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
// import adminAuth from "../middlewares/adminAuth.middleware.js";
import { createEvent, deleteEvent, getEvent, updateEvent } from "../controllers/events.controllers.js";

const router = express.Router();

router.get("/events/", getEvent);
router.get("/events/:id", getEvent);
router.get("/clubs/:clubID", getEvent);
router.post("/admin/createEvent", upload.single("coverImage"), createEvent); //adminAuth
router.put("/admin/updateEvent/:id", upload.single("coverImage"), updateEvent); //adminAuth
router.delete("/admin/deleteEvent/:id", deleteEvent); //adminAuth

export default router;