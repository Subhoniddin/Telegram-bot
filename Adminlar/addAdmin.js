const Admin = require("../models/Admin");

// ✅ Admin qo‘shish funksiyasi
async function addAdmin(ctx, userId, username) {
    const isAdminExist = await Admin.findOne({ userId });
    if (isAdminExist) {
        await ctx.reply("❌ Bu foydalanuvchi allaqachon admin!");
        return;
    }

    const newAdmin = new Admin({ userId, username });
    await newAdmin.save();
    await ctx.reply("✅ Admin muvaffaqiyatli qo‘shildi!");
}

// ✅ Adminni tekshirish funksiyasi
async function isAdmin(userId) {
    return !!(await Admin.findOne({ userId }));
}

module.exports = { addAdmin, isAdmin };
