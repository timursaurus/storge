const express = require('express')
const app = express()
const server = require('http').Server(app)
const connectDB = require('./db')
const socket = require("socket.io");
const io = socket(server)
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}))

app.use('/auth', require('./routers/userRouter'))
app.use('/room', require('./routers/roomRouter'))


const rooms = {}

connectDB()

const users = {};

io.on('connection', socket => {
    if (!users[socket.id]) {
        users[socket.id] = socket.id;
    }
    socket.emit("yourID", socket.id);
    io.sockets.emit("allUsers", users);
    socket.on('disconnect', () => {
        delete users[socket.id];
    })

    socket.on("callUser", (data) => {
        io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
    })

    socket.on("acceptCall", (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    })
});



server.listen(5000, () => console.log('server is running on port 5000'))