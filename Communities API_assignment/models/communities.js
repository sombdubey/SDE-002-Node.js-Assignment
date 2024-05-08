const mongoose = require('mongoose')
const { Snowflake } = require("@theinternetfolks/snowflake")

const communitySchema = mongoose.Schema({
    _id: {
        type: String,
        default: Snowflake.generate(Date.now())
    },
    name: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true,
        unique: true,
    },
    owner: {
        type: String,
        ref: 'user'
    }
},
{timestamps: true})

const Community = mongoose.model('community', communitySchema)

module.exports = Community