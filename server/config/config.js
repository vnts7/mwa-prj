// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

const e = process.env;
const config = {
    env: e.NODE_ENV,
    port: e.SERVER_PORT,
    jwtSecret: e.JWT_SECRET,
    mongo: {
        host: e.MONGO_HOST,
    }
}

module.exports = config;