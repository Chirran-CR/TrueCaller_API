require("dotenv").config();

module.exports = {
    HOST:process.env.GLOBAL_DB_HOST,
    USER:process.env.GLOBAL_DB_USER,
    PASSWORD: process.env.GLOBAL_DB_PASSWORD,
    DB:process.env.GLOBAL_DB_NAME,
    dialect:process.env.DB_DIALECT,
}