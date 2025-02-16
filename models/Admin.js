const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    userId: { type: Number, unique: true },
    username: { type: String }
});

module.exports = mongoose.model("Admin", adminSchema);
