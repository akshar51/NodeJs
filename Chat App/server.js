const express = require("express");
const session = require("express-session");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const Message = require("./models/Message");
const authRoutes = require("./routes/auth");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectDB();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

app.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/chat"); // if logged in → go to chat
  } else {
    res.redirect("/login"); // if not → go to login
  }
});



app.use("/", authRoutes);

// Protect chat route
app.get("/chat", async (req, res) => {
  if (!req.session.user) return res.redirect("/login");
  const messages = await Message.find().sort({ createdAt: 1 });
  res.render("chat", { user: req.session.user, messages });
});

// 🔥 Socket.IO
io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("chatMessage", async (data) => {
    const newMsg = await Message.create({
      sender: data.user,
      message: data.message
    });
    io.emit("chatMessage", newMsg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
