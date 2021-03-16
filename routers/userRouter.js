const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

router.post('/', async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body
        
        if (!email || !password || !confirmPassword) 
            return res.status(400).json({errorMessage: 'Bad input'})
        
        if(password.length < 6) {
            return res.status(400).json({errorMessage: 'More than 6 characters'})
        }

        if (password !== confirmPassword) {
            return res.status(400).json({errorMessage: 'Passwords are not the same'})
        }

        const existingUser = await User.findOne({email})
        console.log(existingUser)

        if (existingUser) {
            return res.status(400).json({errorMessage: 'An account with this email already exists'})
        }

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            username, email, passwordHash
        })

        const saveUser = await newUser.save()

        const token = jwt.sign({
            user: saveUser._id
        }, config.get('jwtSecret'))

        res.cookie('token', token, {
            httpOnly: true,
        }).send()

    } catch (err) {
        console.error(err)
        res.status(500).send()
    }

})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({errorMessage: "Bad input"})
        }

        const existingUser = await User.findOne({email})
        if (!existingUser) {
            return res.status(401).json({errorMessage: 'Wrong password or email'})
        }

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash)
        if (!passwordCorrect) {
            return res.status(401).json({errorMessage: 'Wrong password or email'})
        }

        const token = jwt.sign({
            user: existingUser._id
        }, config.get('jwtSecret'))

        res.cookie('token', token, {
            httpOnly: true,
        }).send()


    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

router.get('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0)
    }).send()
})

router.get('/loggedIn', (req, res) => {
    
    try {
        const token = req.cookies.token
        if (!token) {
            return res.json(false)
        }

        jwt.verify(token, config.get('jwtSecret'))
        
        res.send(true)

    } catch (err) {
        res.json(false)
    }
})


module.exports = router
