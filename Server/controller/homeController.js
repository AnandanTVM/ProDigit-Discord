const homeUtil = require("../util/homeUtil");

const AddUserContro = (req, res) => {
  
  homeUtil
    .AddUser(req.body)
    .then(() => res.json({ status: true, Message: "Upload Success" }))
    .catch((err) => {
      res.json({ status: false, Message: err.message });
    });
};
module.exports = {
  AddUserContro,
};
