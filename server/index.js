const express = require('express');
const { json } = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const chatRoute = require('./routes/chatRoute');
const messageRoute = require('./routes/messageRoute');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(json());
app.use(cors());
app.use('/api/users', userRoute);
app.use('/api/chats', chatRoute);
app.use('/api/messages', messageRoute);

app.get('/', (req, res) => {
  res.send('Welcome to our chat app :D');
});

const PORT = process.env.PORT || 5000;
const URI = process.env.ATLAS_URI;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    method: ["GET", "POST"]
  }
});

let onlineUsers = [];

io.on('connection', (socket) => {
  console.log('A new client connected!: ' + socket.id);

  //listen to a connection
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some(user => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    
      console.log("Users online: " , onlineUsers);
      io.emit("getOnlineUsers", onlineUsers );
  });

  //listen to a message
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(user => user.userId === message.recipientId);

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  })

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers );
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully Connected to MongoDB ATLAS');
  })
  .catch((error) => {
    console.log('MongoDB Connection Failed! ', error.message);
  });
