const userUtil = require("../util/userUtil");
const jwt = require("jsonwebtoken");
// user login controller
const userLoginContro = (req, res) =>
  userUtil
    .loginUser(req.body)
    .then((response) => {
      const token = jwt.sign(
        {
          userId: response.userId,
          name: response.username,
          email: response.email,
        },
        process.env.JWTKEY
      );
      res.json({ status: true, user: token });
    })
    .catch((err) => {
      res.status(err.status).json({ status: false, Message: err.message });
    });
const userProfileContro = (req, res) => {
  let user = req.user;
  delete user.password;
  res.json({ status: true, response: user });
};

const userEditProfilecontro = (req, res) =>
  userUtil
    .userEditProfile(req.user._id, req.body)
    .then(() => res.json({ status: true, response: "updated..." }))
    .catch((err) => res.json({ status: false, Message: err.message }));

const addFriendsListcontro = (req, res) =>
  userUtil
    .useraddFriendsList(req.user._id)
    .then((details) => res.json({ status: true, response: details }))
    .catch((err) => res.json({ status: false, Message: err.message }));

const addFriendcontro = (req, res) =>
  userUtil
    .addFriend(req.user._id, req.body.friendId)
    .then((details) => res.json({ status: true, response: details.message }))
    .catch((err) => res.json({ status: false, Message: err.message }));

const acceptRequestcontro = (req, res) =>
  userUtil
    .acceptRequest(req.user._id, req.params.FId)
    .then((details) => res.json({ status: true, response: details.message }))
    .catch((err) => res.json({ status: false, Message: err.message }));

const getAllFriendscontro = (req, res) =>
  userUtil
    .getAllFriends(req.user._id)
    .then((details) => res.json({ status: true, response: details }))
    .catch((err) => res.json({ status: false, Message: err.message }));

const RequesedFriendscontro = (req, res) =>
  userUtil
    .RequesedFriends(req.user._id)
    .then((details) => res.json({ status: true, response: details }))
    .catch((err) => res.json({ status: false, Message: err.message }));

const sendChatcontro = (req, res) =>
  userUtil
    .sendChat(req.user._id, req.body)
    .then(() =>
      res.json({ status: true, response: "Message Send Successfuly.." })
    )
    .catch((err) => res.json({ status: false, Message: err.message }));

const getMessagecontro = (req, res) =>
  userUtil
    .getAllMessage(req.params.FId, req.user._id) // to , from
    .then((responce) =>
      res.json({
        status: true,
        to: responce.to,
        from: responce.from,
        messages: responce.message,
      })
    )
    .catch((err) => {
      console.log(err);
      res.json({ status: false, message: err });
    });

module.exports = {
  userLoginContro,
  userProfileContro,
  userEditProfilecontro,
  addFriendsListcontro,
  addFriendcontro,
  acceptRequestcontro,
  getAllFriendscontro,
  RequesedFriendscontro,
  sendChatcontro,
  getMessagecontro,
};
