const mongoose = require('mongoose')
const { Snowflake } = require("@theinternetfolks/snowflake")

const userSchema = mongoose.Schema({
    _id: {
        type: String,
        default: Snowflake.generate(Date.now())
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
},
{timestamps: true})

const User = mongoose.model('user', userSchema)

module.exports = User