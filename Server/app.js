const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const { sockets } = require("./socket/socket");
// data base connection
const db = require("./config/connection");
const homeRouter = require("./router/home");
const userRouter = require("./router/user");

const { errorHandler, notFound } = require("./middleware/errorMiddleware");
// .env config
dotenv.config();
const corsOptions = {
  origin: process.env.FROUND_END_PORT,
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// routs
app.use("/api", homeRouter);
app.use("/api/user", userRouter);

app.use(errorHandler);
app.use(notFound);

// data connection call
db.connect((err) => {
  if (err) console.log(`Connection error${err}`);
  else console.log("Datebase Connected to port 27017");
});
//
const server = app.listen(process.env.PORT, () => {
  console.log(`sever started running on localhost:${process.env.PORT}`);
});
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FROUND_END_PORT,
  },
});

io.on("connection", sockets);
