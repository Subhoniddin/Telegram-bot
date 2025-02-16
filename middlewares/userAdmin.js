const { Markup } = require("telegraf");
const { MAIN_ADMIN_ID } = require("../config/env");

function isUserAdmin(userId) {
    return userId == MAIN_ADMIN_ID; // `===` emas, `==` ishlatish mumkin
}

async function showUserAdminPanel(ctx) {
    const keyboard = Markup.keyboard([
        ["📊 Statistika", "👥 Userlar"],
        ["➕ Admin qo'shish", "❌ Admin o'chirish"],
        ["📨 Xabar yuborish", "⚙ Sozlamalar"]
    ]).resize();

    await ctx.reply("🔹 Bosh admin paneliga xush kelibsiz!", keyboard);
}


module.exports = { isUserAdmin, showUserAdminPanel };
