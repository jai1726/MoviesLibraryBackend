const express = require('express');
const router = express.Router();
const userFunctions = require('../routeFunctions/authFunctions');

router.post("/createUser", userFunctions.createUser);
router.get("/loginUser/:email/:password", userFunctions.loginUser);
router.put("/verifyUser", userFunctions.verifyUser);
router.put("/updateUser", userFunctions.updateUser);
router.get("/forgotPassword/:email", userFunctions.forgotPassword);
router.put("/updatePassword", userFunctions.updatePassword);
router.get("/checkToken/:authToken", userFunctions.checkToken);
router.get("/getUserDetails/:authToken", userFunctions.getUserDetails);

module.exports = router;
