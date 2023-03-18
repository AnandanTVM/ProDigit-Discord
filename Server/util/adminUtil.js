const collection = require("../config/collection");
const db = require("../config/connection");
const { ObjectId } = require("mongodb");
module.exports = {
  adminLgin: (details) =>
    new Promise((resolve, reject) => {
      if (details.username === "Admin" && details.password === "Admin") {
        resolve({ username: "Admin", userId: "Admin@123" });
      } else {
        reject();
      }
    }),
  getAllUser: () =>
    new Promise(async (resolve, reject) => {
      try {
        const user = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .aggregate([{ $project: { password: 0 } }])
          .toArray();
        resolve(user);
      } catch (error) {
        reject(error);
      }
    }),
  deleteUserById: (Id) =>
    new Promise((resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .deleteOne({ _id: ObjectId(Id) })
        .then(() => resolve())
        .catch((err) => reject(err));
    }),
};
