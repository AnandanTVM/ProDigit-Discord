const homeUtil = require("../util/homeUtil");

const AddUserContro = (req, res) =>
  homeUtil
    .AddUser(req.body)
    .then(() => res.json({ status: true, Message: "Upload Success" }))
    .catch((err) => {
      res.json({ status: false, Message: err.message });
    });

const forgotPasswordSendOTPContro = (req, res) =>
  homeUtil
    .forgotPassword(req.body)
    .then(() => res.json({ status: true, Message: "OTP Send..." }))
    .catch((err) => res.json({ status: false, Message: err.message }));

const changePassword = (req, res) =>
  homeUtil
    .otpverification(req.body)
    .then(() =>
      homeUtil
        .changePassword(req.body)
        .then(() =>
          res.json({
            status: true,
            message: "password changed successfully...",
          })
        )
        .catch((err) => res.json({ status: false, Message: err.message }))
    )
    .catch((err) => res.json({ status: false, Message: err.message }));

module.exports = {
  AddUserContro,
  forgotPasswordSendOTPContro,
  changePassword,
};
