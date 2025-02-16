const Admin = require("../models/Admin");

async function addAdmin(userId, username) {
    const existingAdmin = await Admin.findOne({ userId });
    if (existingAdmin) {
        return { success: false, message: "❌ Bu foydalanuvchi allaqachon admin!" };
    }

    const newAdmin = new Admin({ userId, username });
    await newAdmin.save();
    return { success: true, message: "✅ Admin muvaffaqiyatli qo'shildi!" };
}

async function isAdmin(userId) {
    return !!(await Admin.findOne({ userId }));
}

module.exports = { addAdmin, isAdmin };
