const { Telegraf, Markup } = require("telegraf");
const app = require("./server");
require("dotenv").config();
const mongoose = require("mongoose");
const { addAdmin, isAdmin } = require("./utils/adminFunctions"); // 🔥 Import qildik

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB muvaffaqiyatli ulandi"))
  .catch(err => console.error("❌ MongoDB xatosi:", err));

const BOT_TOKEN = '7790091290:AAEyQTucOcDrN1F7_4RvUYf0QLXdlm1MJMA'
const bot = new Telegraf(BOT_TOKEN);

// ✅ Kanalga obuna tekshirish funksiyasi
async function isAddChannel(ctx) {
    const channel = "dostlar_2001_36"; 
    if (!ctx.from) return console.log("Botlar kirishi taqiqlanadi :(");
    
    try {
        const chatMember = await ctx.telegram.getChatMember(`@${channel}`, ctx.from.id);
        const isSubscribed = ["creator", "administrator", "member"].includes(chatMember.status);

        if (isSubscribed) {
            return true; 
        } else {
            await ctx.reply(`❌ Kanalga obuna bo‘ling: https://t.me/${channel}`);
            return false; 
        }
    } catch (error) {
        console.error("Xato yuz berdi:", error);
        await ctx.reply("⚠️ Kanalga obuna tekshirishda nosozlik yuz berdi.");
        return false;
    }
}

// ✅ Bot start komandasi
bot.start(async ctx => {
    const isSubscribed = await isAddChannel(ctx); 
    if (!isSubscribed) return;
    
    const menuKeyboard = Markup.keyboard([
        ["👮 Admin", "👥 Foydalanuvchilar"],
        ["🔗 Referal", "💰 Hisobim"],
        ["📜 Yo'riqnoma", "❓ Yordam"]
    ]).resize().oneTime(false);

    await ctx.reply("👋 Salom " + ctx.chat.first_name, menuKeyboard);    
});

// ✅ Admin qo‘shish uchun buyruq
bot.command("addadmin", async ctx => {
    const userId = ctx.message.text.split(" ")[1]; // `/addadmin 123456789`
    if (!userId) {
        return ctx.reply("❌ Iltimos, admin qo‘shish uchun ID kiriting! Masalan: `/addadmin 123456789`");
    }

    const username = ctx.message.from.username || "No username";
    await addAdmin(ctx, userId, username);
});

// ✅ Tugmalarni bosganda javob berish
bot.hears(["👮 Admin", "👥 Foydalanuvchilar", "🔗 Referal", "💰 Hisobim", "📜 Yo'riqnoma", "❓ Yordam"], async (ctx) => {
    const responses = {
        "👮 Admin": "🔹 Adminlar bo'limi",
        "👥 Foydalanuvchilar": "🔹 Foydalanuvchilar",
        "🔗 Referal": "🔹 Referallar bo'limi",
        "💰 Hisobim": "🔹 Mening hisobim",
        "📜 Yo'riqnoma": "🔹 Botdan foydalanish ko'rsatmalari",
        "❓ Yordam": "🔹 Yordam so'rash"
    };

    await ctx.reply(responses[ctx.message.text]);
});

// ✅ Botni ishga tushiramiz
bot.launch().then(() => console.log("✅ Bot ishga tushdi!")).catch(err => console.error("❌ Xatolik:", err));
