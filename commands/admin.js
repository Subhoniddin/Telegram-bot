const { isAdmin, addAdmin } = require("../utils/adminUtils");
const { MAIN_ADMIN_ID } = require("../config/env");

async function adminCommand(ctx) {
    ctx.reply(`salom you id ${ctx.from.id}`)
    if (!(await isAdmin(ctx.from.id))) {
        return ctx.reply("❌ Siz admin emassiz!");
    }
    return ctx.reply("🔹 Admin paneliga xush kelibsiz!");
}

async function addAdminCommand(ctx) {
    if (ctx.from.id !== MAIN_ADMIN_ID) {
        return ctx.reply("❌ Siz admin qo'sha olmaysiz!");
    }

    if (!ctx.message.reply_to_message) {
        return ctx.reply("❌ Admin qo'shish uchun reply qiling!");
    }

    const userId = ctx.message.reply_to_message.from.id;
    const username = ctx.message.reply_to_message.from.username || "Noma'lum";
    const result = await addAdmin(userId, username);
    
    return ctx.reply(result.message);
}

module.exports = { adminCommand, addAdminCommand };
