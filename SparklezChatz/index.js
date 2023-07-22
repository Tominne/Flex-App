require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const harperGetMessages = require('./services/harper-get-messages')
const harperSaveMessage = require('./services/harper-save-messages')
const leaveRoom = require('./utils/leave-room')
console.log(process.env.HARPERDB_URL)
//middleware
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

app.get('/', function (req, res) {
  res.send('hello')
})

const CHAT_BOT = 'ChatBot'
let chatRoom = ''
let allUsers = []

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`)

  socket.on('join_room', async (data) => {
    const { username, room } = data
    socket.join(room)

    let __createdtime__ = Date.now()

    socket.to(room).emit('received_messages', {
      message: `${username} has entered the party! Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    })

    chatRoom = room
    allUsers.push({ id: socket.id, username, room })
    chatRoomUsers = allUsers.filter((user) => user.room === room)
    socket.to(room).emit('chatroom_users', chatRoomUsers)
    socket.emit('chatroom_users', chatRoomUsers)

    const last100Messages = await harperGetMessages(room)
    socket.emit('last_100_messages', last100Messages)
  })

  socket.on('send_message', async (data) => {
    const { message, username, room, __createdtime__ } = data
    io.in(room).emit('received_messages', data)
    const response = await harperSaveMessage(
      message,
      username,
      room,
      __createdtime__
    )
    console.log(response)
  })

  socket.on('leave_room', (data) => {
    const { username, room } = data
    socket.leave(room)
    const __createdtime__ = Date.now()
    // Remove user from memory
    allUsers = leaveRoom(socket.id, allUsers)
    socket.to(room).emit('chatroom_users', allUsers)
    socket.to(room).emit('received_messages', {
      username: CHAT_BOT,
      message: `${username} has left the chat`,
      __createdtime__,
    })
    console.log(`${username} has left the chat`)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected from the chat')
    const user = allUsers.find((user) => user.id == socket.id)
    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers)
      socket.to(chatRoom).emit('chatroom_users', allUsers)
      socket.to(chatRoom).emit('received_messages', {
        message: `${user.username} has disconnected from the party.`,
      })
    }
  })
})
server.listen(4000, () => console.log('Server up at 3000'))
