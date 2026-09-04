const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    issuedBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
        required: false
    },
    issuedDate: {
        type: String,
        required: false
    },
    returnDate: {
        type: String,
        required: false,
    },
    subscriptionType: {
        type: String,
        required: true
    },
    subscriptionDate: {
        type: String,
        required: true
    }
}, {Timestamp: true})

module.exports = mongoose.model('user', userSchema)