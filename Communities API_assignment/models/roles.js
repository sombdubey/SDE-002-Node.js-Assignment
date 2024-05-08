const mongoose = require('mongoose')
const { Snowflake } = require("@theinternetfolks/snowflake")

const roleSchema = mongoose.Schema({
    _id: {
        type: String,
        default: Snowflake.generate(Date.now())
    },
    name: {
        type: String,
        require: true,
        unique: true
    },
},
{timestamps: true})

const Role = mongoose.model('role', roleSchema)

module.exports = Role