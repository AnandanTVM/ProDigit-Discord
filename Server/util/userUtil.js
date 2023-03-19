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

  useraddFriendsList: (id) =>
    new Promise(async (resolve, reject) => {
      try {
        let friendsid = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .aggregate([
            { $match: { _id: id } },
            { $project: { friends: 1, _id: 0 } },
            { $unwind: "$friends" },
            { $group: { _id: "$friends.fid" } },
          ])
          .toArray();
        friendsid = friendsid.map((obj) => obj._id);
        friendsid.push(id);
        console.log(friendsid);
        let allfriends = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .find({ _id: { $nin: friendsid } })
          .project({ name: 1, _id: 1 })
          .toArray();
        resolve(allfriends);
      } catch (error) {
        reject(error);
      }
    }),

  addFriend: (UId, FId) =>
    new Promise((resolve, reject) => {
      const add = { fid: ObjectId(FId), status: "Pending" };
      const request = { fid: UId, status: "Request" };
      db.get()
        .collection(collection.USER_COLLECTION)
        .updateOne({ _id: UId }, { $push: { friends: add } })
        .then(() =>
          db
            .get()
            .collection(collection.USER_COLLECTION)
            .updateOne({ _id: ObjectId(FId) }, { $push: { friends: request } })
            .then(() => resolve({ message: "successfull" }))
            .catch((err) => reject(err))
        );
    }).catch((err) => reject(err)),

  acceptRequest: (UId, FId) =>
    new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { _id: UId, "friends.fid": ObjectId(FId) },
          { $set: { "friends.$.status": "Friend" } }
        )
        .then(() =>
          db
            .get()
            .collection(collection.USER_COLLECTION)
            .updateOne(
              { _id: ObjectId(FId), "friends.fid": UId },
              { $set: { "friends.$.status": "Friend" } }
            )
            .then(() => resolve({ message: "successfull" }))
            .catch((err) => reject(err))
        );
    }).catch((err) => reject(err)),
};
