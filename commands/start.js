
const { Markup } = require("telegraf");

const { isMainAdmin, showMainAdminPanel, statistiks, addAdmin, XabarYuborish, users, removeAdmin, sozlamalar } = require("../middlewares/isMainAdmin");

const isSubscribed = require("../middlewares/isSubscribed");

async function startCommand(ctx) {
    const CHANNEL_USERNAME = "dostlar_2001_36"
    const userId = ctx.from.id;

    // 1️⃣ Agar foydalanuvchi BOSH ADMIN bo'lsa
    if (isMainAdmin(userId)) {
        return showMainAdminPanel(ctx);
    }
    if (isMainAdmin(userId)) {
        return showUserAdminPanel(ctx);
    }u

    // 2️⃣ Agar oddiy user bo'lsa, avval kanalga obuna bo'lganmi, tekshiramiz
    if (!(await isSubscribed(ctx))) {
        return ctx.reply("❌ Kanalga obuna bo'ling:" + '@' + CHANNEL_USERNAME );
    }

    // 3️⃣ Agar oddiy foydalanuvchi bo'lsa, unga odatiy menyuni ko'rsatamiz
    const menuKeyboard = Markup.keyboard([
        ["👮 Admin", "👥 Foydalanuvchilar"],
        ["🔗 Referal", "💰 Hisobim"],
        ["📜 Yo'riqnoma", "❓ Yordam"]
    ]).resize();

    await ctx.reply("👋 Salom " + ctx.chat.first_name, menuKeyboard);
}

module.exports = startCommand;
