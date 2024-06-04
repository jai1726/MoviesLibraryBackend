const express = require('express');
const router = express.Router();
const noteFunctions = require('../routeFunctions/noteFunctions');

router.post("/createNote", noteFunctions.createNote);
router.delete("/deleteNote/:id", noteFunctions.deleteNote);
router.put("/updateNote/:id", noteFunctions.updateNote);
router.get("/getNote/:id", noteFunctions.getNote);
router.get("/getAllNotes", noteFunctions.getAllNotes);
router.get("/getNotesByFolder/:email/:folder", noteFunctions.getNotesByFolder);

module.exports = router;
