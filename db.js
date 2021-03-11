const mongoose = require('mongoose')
const config = require('config')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        console.log('connected to DB')
        
    } catch (e) {
        console.log('server error: ', e.message)
        process.exit(1)
    }
}   

module.exports = connectDB