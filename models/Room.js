const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
    roomName: {
        type: String,
        required: true,
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
    speakers: {
        type: String, 
        default: 'speaker',
    },
    startedAt: {
        type: Date,
        default: Date.now,
    }
    
})

module.exports = mongoose.model('Room', RoomSchema)