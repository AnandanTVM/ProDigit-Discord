const adminUtil = require("../util/adminUtil");
const jwt = require("jsonwebtoken");
const adminLoginContro = (req, res) =>
  adminUtil
    .adminLgin(req.body)
    .then((response) => {
      const token = jwt.sign(
        {
          userId: response.userId,
          name: response.username,
        },
        process.env.JWTKEY
      );
      res.json({ status: true, user: token });
    })
    .catch((err) => {
      res.json({ status: false, Message: err.message });
    });

const getAllUserContro = (req, res) =>
  adminUtil
    .getAllUser()
    .then((user) => res.json({ status: true, response: user }))
    .catch((err) => res.json({ status: false, Message: err.message }));

const deleteUserContro = (req, res) =>
  adminUtil
    .deleteUserById(req.params.id)
    .then(() => res.json({ status: true, Message: "Successful..." }))
    .catch((err) => res.json({ status: false, Messsage: err.message }));
module.exports = {
  adminLoginContro,
  getAllUserContro,
  deleteUserContro,
};
