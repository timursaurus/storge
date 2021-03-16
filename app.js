const express = require('express')
const app = express()
const server = require('http').Server(app)
const connectDB = require('./db')
const socket = require("socket.io");
const io = socket(server)

app.use(express.json({ extended: true}))
app.use(express.static('public'))
app.use('/auth', require('./routes/auth.routes'))

const rooms = {}

connectDB()

io.on('connection', socket => {
    socket.on('join', roomId => {
        if (rooms[roomId]) {
            rooms[roomId].push(socket.id)
        } else {
            rooms[roomId] = [socket.id]
        }
        const otherUser = rooms[roomId].find(id => id !== socket.id)
        if (otherUser) {
            socket.emit('other', otherUser)
            socket.to(otherUser).emit('joined', socket.id)
        }
    })

    socket.on('request', payload => {
        io.to(payload.target).emit('request', payload)
    })

    socket.on('accept', payload => {
        io.to(payload.target).emit('accept', payload)
    })

    socket.on('ice-candidate', incoming => {
        io.to(incoming.target).emit('ice-candidate', incoming.candidate)
    })

})

server.listen(5000, () => console.log('server is running on port 5000'))