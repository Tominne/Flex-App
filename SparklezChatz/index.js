require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
const harperGetMessages = require('./services/harper-save-messages')
const harperSaveMessage = require('./services/harper-get-messages')
const leaveRoom = require('./utils/leave-room')

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

io.on('connection', function (socket) {
  console.log(`User connected ${socket.id}`)

  socket.on('join_room', async (data) => {
    const { username, room } = data
    socket.join(room)

    let __createdtime__ = Date.now()

    socket.to(room).emit('recieved_message', {
      message: `${username} has entered the party!`,
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    })
    chatRoom = room
    allUsers.push({ id: socket.id, username, room })
    chatRoomUsers = allUsers.filter((user) => user.room === room)
    socket.to(room).emit('chatroom_users', chatRoomUsers)

    const last100Messages = await harperGetMessages(room)
    socket.emit('last_100_messages', last100Messages)
  })

  socket.on('send_message', async (data) => {
    const { message, username, room, __createdtime__ } = data
    io.in(room).emit('recieved messages', data)
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
    socket.to(room).emit('receive_message', {
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
      socket.to(chatRoom).emit('receive_message', {
        message: `${user.username} has disconnected from the party.`,
      })
    }
  })
})
server.listen(4000, () => console.log('server up at 4000'))
