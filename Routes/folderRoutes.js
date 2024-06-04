const express = require('express');
const router = express.Router();
const folderFunctions = require('../routeFunctions/folderFunctions');

router.post("/createFolder", folderFunctions.createFolder);
router.delete("/deleteFolder/:email/:folderName", folderFunctions.deleteFolder);
router.put("/updateFolder/:id", folderFunctions.updateFolder);
router.get("/getFolders/:email", folderFunctions.getFolders);

module.exports = router;
