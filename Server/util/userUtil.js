const collection = require("../config/collection");
const db = require("../config/connection");
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");
module.exports = {
  loginUser: (details) =>
    new Promise((resolve, reject) => {
      console.log(details);
      let response = {};
      // login database call
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: details.email })
        .then((user) => {
          console.log(user);
          if (user != null) {
            bcrypt
              .compare(details.password, user.password)
              .then((status) => {
                if (status) {
                  response.userId = user._id;
                  response.username = user.name;
                  response.email = user.email;
                  resolve(response);
                } else {
                  // incorrect password
                  reject({ message: "Password incorrect", status: 401 });
                }
              })
              .catch((err) => reject(err));
          } else {
            // user not found..
            reject({ message: "No user found..", status: 404 });
          }
        })
        .catch((err) => reject(err));
    }),
  findUserById: (Id) =>
    new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ _id: ObjectId(Id) })
        .then((user) => {
          resolve(user);
        })
        .catch((err) => reject(err));
    }),
  userEditProfile: (id, details) =>
    new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .updateOne(
          {
            _id: id,
          },
          {
            $set: {
              name: details.name,
              email: details.email,
              phone: details.phone,
            },
          }
        )
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    }),
};
