const { CHANNEL_USERNAME } = require("../config/env");

async function isSubscribed(ctx) {
    if (!ctx.from) return false;

    try {
        const chatMember = await ctx.telegram.getChatMember(`@${CHANNEL_USERNAME}`, ctx.from.id);
        return ["creator", "administrator", "member"].includes(chatMember.status);
    } catch (error) {
        console.error("❌ Kanalga obuna tekshirishda xatolik:", error);
        return false;
    }
}

module.exports = isSubscribed;
