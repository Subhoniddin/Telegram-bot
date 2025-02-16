const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Adminning Telegram ID'si
  username: { type: String }, // Foydalanuvchi nomi (ixtiyoriy)
  createdAt: { type: Date, default: Date.now }
});

// 🔥 Modelni eksport qilamiz
module.exports = mongoose.model("Admin", adminSchema);
