const express = require("express");
const socketio = require("socket.io");
const bcrypt = require("bcrypt-nodejs");
const http = require("http");

const { addUser, removeUser, getUser, getUserInRoom } = require("./user.js");

const PORT = process.env.PORT || 5000;
const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const register = require("./controllers/register.js");
const signin = require("./controllers/signin.js");
const knex = require("knex");
const cors = require("cors");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
var bodyParser = require("body-parser");

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

let a;

//---------------------------------------------///

app.post("/register", (req, res) => {
  console.log(req.body);

  register.registerFunction(req, res, db, bcrypt);
});

app.post("/signin", (req, res) => {
  signin.signinFunction(req, res, db, bcrypt);
});

app.get("/:username", (req, res) => {
  const { username } = req.params;

  db.select("*")
    .from("users")
    .where("username", username)
    .then((data) => {
      res.status(200).json(data[0]);
    })
    .catch((err) => res.status(400).json(err));
});

//_--------------------------------------------_

io.on("connection", (socket) => {
  console.log("new conection");

  socket.on("join", ({ username, room, role }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room, role });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.username} bienvenido a la clase ${user.room} :)`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.username} has joined` });

    socket.join(user.room);
    io.to(user.room).emit("roomData", {
      room: user.room,
      user: getUserInRoom(user.room),
    });

    callback();
  });
  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", {
      user: user.username,
      text: message,
      role: user.role,
    });
    io.to(user.room).emit("roomData", {
      room: user.room,
      user: getUserInRoom(user.room),
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.username} has left`,
      });
    }
  });
});

app.use(router);

server.listen(PORT, () => console.log("works"));
