const mongoose = require('mongoose');

function DBconnection() {
    const DB_URL = process.env.MONGO_URI;

    mongoose.connect(DB_URL)

        const db = mongoose.connection;

        db.on('error', console.error.bind(console, 'connection error'))
        db.once("open", function() {
            console.log("DB connected")
        })
}

module.exports = DBconnection;