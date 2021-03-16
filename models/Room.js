const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    startedAt: {
        type: Date,
        default: Date.now,
    }
    
})

const Room = mongoose.model('room', roomSchema)


module.exports = Room