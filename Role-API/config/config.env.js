require('dotenv').config()

const dotenv = {
    PORT : process.env.PORT,
    MONGODB_URL : process.env.MONGODB_URL
}

module.exports = dotenv