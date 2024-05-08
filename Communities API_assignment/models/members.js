const mongoose = require('mongoose')
const { Snowflake } = require("@theinternetfolks/snowflake")

const memberSchema = mongoose.Schema({
    _id: {
        type: String,
        default: Snowflake.generate(Date.now())
    },
    community: {
        type: String,
        ref: 'community'
    },
    user: {
        type: String,
        ref: 'user'
    },
    role: {
        type: String,
        ref: 'role'
    }
},
{timestamps: true})

const Member = mongoose.model('member', memberSchema)

module.exports = Member