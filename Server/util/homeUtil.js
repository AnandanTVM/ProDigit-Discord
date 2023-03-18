const collection = require("../config/collection");
const db = require("../config/connection");
const bcrypt = require("bcrypt");
module.exports = {
  AddUser: (details) =>
    new Promise((resolve, reject) => {
      // find the user exist or not
      let insertData={
        name:details.name,
        email:details.email,
        phone:details.phone,
        block:false,
      }
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({
          $or: [{ email: details.email }, { phone: details.phone }],
        })
        .then(async (userData) => {
          if (userData === null) {
            // user not exist add user
            insertData.password = await bcrypt.hash(details.password, 10);
            db.get()
              .collection(collection.USER_COLLECTION)
              .insertOne(insertData)
              .then(() => resolve())
              .catch((err) => reject(err));
          } else {
            // User already exist
            reject({ message: "User already exist.." });
          }
        })
        .catch((err) => reject(err));
    }),
};
