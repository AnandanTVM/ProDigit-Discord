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

  getAllFriends: (UId) =>
    new Promise(async (resolve, reject) => {
      try {
        let friends = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .aggregate([
            { $match: { _id: UId } },
            { $project: { friends: 1, _id: 0 } },
            { $unwind: "$friends" },
            { $match: { "friends.status": "Friend" } },
            {
              $lookup: {
                from: collection.USER_COLLECTION,
                localField: "friends.fid",
                foreignField: "_id",
                as: "friend",
              },
            },
            {
              $project: {
                _id: 0,
                friend: { $arrayElemAt: ["$friend", 0] },
                // arrayElemAt userd to convert array to object
              },
            },
            { $project: { friend: { name: 1, _id: 1 } } },
          ])
          .toArray();

        resolve(friends);
      } catch (error) {
        reject(error);
      }
    }),
  RequesedFriends: (UId) =>
    new Promise(async (resolve, reject) => {
      try {
        let friends = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .aggregate([
            { $match: { _id: UId } },
            { $project: { friends: 1, _id: 0 } },
            { $unwind: "$friends" },
            { $match: { "friends.status": "Request" } },
            {
              $lookup: {
                from: collection.USER_COLLECTION,
                localField: "friends.fid",
                foreignField: "_id",
                as: "friend",
              },
            },
            {
              $project: {
                _id: 0,
                friend: { $arrayElemAt: ["$friend", 0] },
                // arrayElemAt userd to convert array to object
              },
            },
            { $project: { friend: { name: 1, _id: 1 } } },
          ])
          .toArray();

        resolve(friends);
      } catch (error) {
        reject(error);
      }
    }),
  PendingFriends: (UId) =>
    new Promise(async (resolve, reject) => {
      try {
        let friends = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .aggregate([
            { $match: { _id: UId } },
            { $project: { friends: 1, _id: 0 } },
            { $unwind: "$friends" },
            { $match: { "friends.status": "Pending" } },
            {
              $lookup: {
                from: collection.USER_COLLECTION,
                localField: "friends.fid",
                foreignField: "_id",
                as: "friend",
              },
            },
            {
              $project: {
                _id: 0,
                friend: { $arrayElemAt: ["$friend", 0] },
                // arrayElemAt userd to convert array to object
              },
            },
            { $project: { friend: { name: 1, _id: 1 } } },
          ])
          .toArray();

        resolve(friends);
      } catch (error) {
        reject(error);
      }
    }),
  sendChat: (from, data) =>
    new Promise((resolve, reject) => {
      const cueentDate = new Date();
      const time = cueentDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const date = new Date().toLocaleDateString();
      const mess = {
        message: data.message,
        date: date,
        time: time,
        realtime: cueentDate,
      };
      // Date settings end
      db.get()
        .collection(collection.CHAT_COLLECTION)
        .findOne({ to: ObjectId(data.to), from: from })
        .then((responce) => {
          if (responce === null) {
            const messages = [mess];

            db.get()
              .collection(collection.CHAT_COLLECTION)
              .insertOne({
                to: ObjectId(data.to),
                from: from,
                messages: messages,
              })
              .then(() => resolve())
              .catch(() => reject());
          } else {
            const messages = mess;
            db.get()
              .collection(collection.CHAT_COLLECTION)
              .updateOne(
                {
                  to: ObjectId(data.to),
                  from: from,
                },
                {
                  $push: { messages: messages },
                }
              )
              .then(() => resolve())
              .catch(() => reject());
          }
        })
        .catch(() => reject());
    }),
  getAllMessage: (to, from) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = {};

        let fromMessage = await db
          .get()
          .collection(collection.CHAT_COLLECTION)
          .aggregate([
            { $match: { to: ObjectId(to), from: from } },
            { $unwind: "$messages" },
            { $project: { _id: 1, messages: 1 } },
          ])
          .toArray();

        let toMessage = await db
          .get()
          .collection(collection.CHAT_COLLECTION)
          .aggregate([
            { $match: { to: from, from: ObjectId(to) } },
            { $unwind: "$messages" },
            { $project: { _id: 1, messages: 1 } },
          ])
          .toArray();

        if (fromMessage.length === 0) {
          fromMessage = false;
        } else {
          // eslint-disable-next-line no-underscore-dangle
          response.from = fromMessage[0]._id;
        }

        if (toMessage.length === 0) {
          toMessage = false;
        } else {
          // eslint-disable-next-line no-underscore-dangle
          response.to = toMessage[0]._id;
        }

        if (fromMessage && toMessage) {
          let mergedArray = fromMessage.concat(toMessage);
          mergedArray.sort(
            (a, b) =>
              new Date(a.messages.realtime) - new Date(b.messages.realtime)
          );
          response.message = mergedArray;
        } else if (fromMessage) {
          response.message = fromMessage;
        } else if (toMessage) {
          response.message = toMessage;
        } else {
          response.message = false;
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    }),
};
