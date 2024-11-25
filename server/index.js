import express from 'express';
import { createServer } from 'https';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://sanjanachats.netlify.app",
    methods: ["GET", "POST"]
  }
});

const messages = [];
const users = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (username) => {
    users.set(socket.id, username);
    io.emit('userJoined', { id: socket.id, username });
    socket.emit('previousMessages', messages);
  });

  socket.on('message', (message) => {
    const username = users.get(socket.id);
    const newMessage = {
      id: Date.now(),
      userId: socket.id,
      username,
      text: message,
      timestamp: new Date().toISOString(),
    };
    messages.push(newMessage);
    io.emit('message', newMessage);
  });

  socket.on('disconnect', () => {
    const username = users.get(socket.id);
    users.delete(socket.id);
    io.emit('userLeft', { id: socket.id, username });
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
