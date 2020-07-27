import express from "express";
import * as notes from "./notes.js";

const router = express.Router();

router.get("/notes", notes.list);
router.post("/notes", notes.create); // curl -X POST http://localhost:3000/notes
router.get("/notes/:id", notes.read);
router.post("/notes/:id", notes.update); // curl -X POST http://localhost:3000/notes/123
router.delete("/notes/:id", notes.deleteNote); // curl -X DELETE http://localhost:3000/notes

export default router;
