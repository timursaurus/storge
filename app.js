const express = require('express')
const app = express()
const server = require('http').Server(app)
const mongoose = require('mongoose')
const config = require('config')
const socket = require('socket.io')
const io = socket(server)


app.use(express.json({ extended: true}))
app.use(express.static('public'))
app.use('/auth', require('./routes/auth.routes'))

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        server.listen(5000)
    } catch (e) {
        console.log('server error', e.message)
        process.exit(1)
    }
}

start()


