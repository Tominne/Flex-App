require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

//middleware
app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

const CHAT_BOT = 'ChatBot'

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`)
})

server.listen(4000, () => console.log('server up at 4000'))
