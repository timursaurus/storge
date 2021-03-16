const router = require('express')
const Room = require('../models/Room')
const auth = require('../middleware/auth')

router.post('/', auth, async (req, res) => {
    try {
        const {name} = req.body

        const newRoom = new Room({
            name
        })
        const saveRoom = await newRoom.save()

        res.json(saveRoom)

    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.get('/', auth, async (req, res) => {
    try {
        const rooms = await Room.find()
        res.json(rooms)

    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

module.exports = router
