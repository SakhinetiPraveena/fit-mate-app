const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    from: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});


const Request = mongoose.model("Request", requestSchema);

module.exports = Request