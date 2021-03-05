const express = require('express')
const app = express()
const server = require('http').Server(app)
const mongoose = require('mongoose')
const config = require('config')

app.use(express.static('public'))
app.use('/u/auth', require('./routes/auth.routes'))

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


