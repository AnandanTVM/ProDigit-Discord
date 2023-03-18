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
module.exports = {
  userLoginContro,
  userProfileContro,
  userEditProfilecontro,
};
