const collection = require("../config/collection");
const db = require("../config/connection");
const bcrypt = require("bcrypt");
const { SendOTP } = require("../middleware/sendMail");
module.exports = {
  AddUser: (details) =>
    new Promise((resolve, reject) => {
      // find the user exist or not
      let insertData = {
        name: details.name,
        email: details.email,
        phone: details.phone,
        block: false,
      };
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
  forgotPassword: (details) =>
    new Promise((resolve, reject) => {
      try {
        db.get()
          .collection(collection.USER_COLLECTION)
          .findOne({ email: details.email })
          .then(async (user) => {
            console.log(user);
            if (user === null) {
              reject({ message: "User Not found...." });
            } else {
              const name = user.name;
              const email = user.email;
              const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
              const hasotp = await bcrypt.hash(otp, 10);
              console.log(hasotp);
              db.get()
                .collection(collection.USER_COLLECTION)
                .updateOne(
                  {
                    _id: user._id,
                  },
                  {
                    $set: {
                      otp: hasotp,
                    },
                  }
                )
                .then((response) => {
                  console.log(response);
                  SendOTP(otp, email, name)
                    .then(() => resolve())
                    .catch((err) => reject(err));
                })
                .catch((err) => {
                  console.log(err.message);
                });
            }
          });
      } catch (error) {
        reject(error);
      }
    }),
  otpverification: (userData) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve, reject) => {
      const user = await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ email: userData.email });

      if (user) {
        bcrypt
          .compare(userData.otp, user.otp)
          .then((status) => {
            if (status) {
              resolve();
            } else {
              reject({ mesage: "Invalid OTP" });
            }
          })
          .catch((err) => reject(err));
      } else {
        reject({ message: "User not Found.." });
      }
    }),
  changePassword: (userDetails) =>
    new Promise(async (resolve, reject) => {
      const bypassword = await bcrypt.hash(userDetails.password, 10);
      db.get()
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { email: userDetails.email },
          { $set: { password: bypassword } }
        )
        .then(() => resolve())
        .catch((err) => reject(err));
    }),
};
