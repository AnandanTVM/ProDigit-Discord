// user route
const express = require("express");
const userControllers = require("../controller/userController");
const userAuth = require("../middleware/auth");
const router = express.Router();
// login route
router.post("/login", userControllers.userLoginContro);
router.get("/profile", userAuth.userProtect, userControllers.userProfileContro);
router.put(
  "/edit",
  userAuth.userProtect,
  userControllers.userEditProfilecontro
);
router.get("/addFriendsList", userAuth.userProtect,userControllers.addFriendsListcontro);
router.post("/addfriend", userAuth.userProtect,userControllers.addFriendcontro);
router.get("/acceptRequest/:FId",userAuth.userProtect,userControllers.acceptRequestcontro);
router.get("/getAllFriends",userAuth.userProtect,userControllers.getAllFriendscontro)
router.get("/RequesedFriends",userAuth.userProtect,userControllers.RequesedFriendscontro)

module.exports = router;
