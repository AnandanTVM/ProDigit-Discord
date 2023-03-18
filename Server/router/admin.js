// home route
const express = require("express");
const adminControllers = require("../controller/adminController");
const { adminProtect } = require("../middleware/auth");
const router = express.Router();
// to add user details
router.post("/login", adminControllers.adminLoginContro);
router.get("/getAllUser", adminProtect, adminControllers.getAllUserContro);
router.delete(
  "/deleteUser/:id",
  adminProtect,
  adminControllers.deleteUserContro
);

module.exports = router;
