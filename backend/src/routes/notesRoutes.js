import express from "express";
import { createANote, deleteANote, getAllNotes, getNoteById, updateANote } from "../controllers/notesController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// -------------------------------------÷
// get all the notes
router.get("/", protect, getAllNotes);

// -------------------------------------÷
// get a specific notes
router.get("/:id", getNoteById);

// create a note
router.post("/", protect, createANote);

// update a note
router.put("/:id", updateANote);

// delete a note
router.delete("/:id", deleteANote);
// -------------------------------------÷

export default router;