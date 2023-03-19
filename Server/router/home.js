// home route
const express = require("express");
const homeControllers = require("../controller/homeController");
const router = express.Router();
// to add user details
router.post("/userRegister", homeControllers.AddUserContro);
router.post("/forgotpassword", homeControllers.forgotPasswordSendOTPContro);
router.post("/changePassword", homeControllers.changePassword);

module.exports = router;
