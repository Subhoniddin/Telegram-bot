const { Markup } = require("telegraf");
const isSubscribed = require("../middlewares/isSubscribed");

async function startCommand(ctx) {
    if (!(await isSubscribed(ctx))) {
        return ctx.reply(`❌ Kanalga obuna bo‘ling: https://t.me/${process.env.CHANNEL_USERNAME}`);
    }

    const menuKeyboard = Markup.keyboard([
        ["👮 Admin", "👥 Foydalanuvchilar"],
        ["🔗 Referal", "💰 Hisobim"],
        ["📜 Yo'riqnoma", "❓ Yordam"]
    ]).resize();

    await ctx.reply("👋 Salom " + ctx.chat.first_name, menuKeyboard);
}

module.exports = startCommand;
