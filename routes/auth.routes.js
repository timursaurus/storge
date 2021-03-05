const {Router} = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const router = Router()
const jwt = require('jsonwebtoken')
const config = require('config')

router.post('/signup',
    [
        check('email', 'Incorrect email').isEmail(),
        check('password', 'Password has to contain at least 8 characters').isLength({min: 8})

    ], async (req, res) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: "Something went wrong. Try again later"})
        }

        const {email, password, nickname} = req.body

        const uniqueEmail = await User.findOne({ email })
        const uniqueNickname = await User.findOne({ nickname })

        if (uniqueEmail) {
            return res.status(400).json({message: 'This email is already taken'})
        }

        if (uniqueNickname) {
            return res.status(400).json({message: 'This nickname is already taken'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        const user = new User({ email, nickname, hashedPassword })

        await user.save()

        res.status(201).json({message: 'User has been signed up'})

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again later'})
    }
})

router.post('/login',
    [
        check('nickname', 'This user doesn\'t exist').toLowerCase().exists(),
        check('password', 'Incorrect password').exists()
    ], async (req, res) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array(), message: "Something went wrong. Try again later"})
        }

        const {nickname, password} = req.body

        const user = await User.findOne({ nickname })

        if (!user) {
            return res.status(400).json({message: 'This user doesn\'t exist'})
        }

        const loginSuccess = await bcrypt.compare(password, user.password)

        if (!loginSuccess) {
            return res.status(400).json({message: 'Incorrect nickname or password'})
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h'}
        )

        res.status(200).json({ token, userId: user.id })

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong. Try again later'})
    }
})

module.exports = router