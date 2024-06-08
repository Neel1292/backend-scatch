const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    full: {
        type: String,
        minLength: 3,
        trim: true,
    },
    email: String,
    password: String,
    isadmin: Boolean,
    products: {
        type: Array,
        default: []
    },
    picture: String,
    gstin: String,
})

module.exports = mongoose.model("owner", ownerSchema)