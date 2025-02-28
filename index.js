require("dotenv").config();

const { Telegraf } = require("telegraf");
const { BOT_TOKEN } = require("./config/env");
const connectDB = require("./utils/db");

const startCommand = require("./commands/start");
const { adminCommand, addAdminCommand } = require("./commands/admin");
const { isMainAdmin, showMainAdminPanel, statistiks, addAdmin, XabarYuborish, users, removeAdmin, sozlamalar } = require("./middlewares/isMainAdmin");

const bot = new Telegraf(BOT_TOKEN);

// MongoDB ulash
connectDB();

// 🔹 User komandalarini ishlatish
bot.start(startCommand);
bot.hears("👮 Admin", adminCommand);
bot.command("addadmin", addAdminCommand);

bot.hears("📊 Statistika", statistiks);
bot.hears("➕ Admin qo'shish", addAdmin);
bot.hears("📨 Xabar yuborish", XabarYuborish);
bot.hears("👥 Userlar", users);
bot.hears("❌ Admin o'chirish", removeAdmin);
bot.hears("⚙ Sozlamalar", sozlamalar);

let userLanguages = {};

bot.on("callback_query", async (ctx) => {
  const langCode = ctx.callbackQuery.data.split("_")[1];
  if (langCode) {
    userLanguages[ctx.from.id] = langCode;
    ctx.answerCbQuery();
    ctx.reply(`✅ Til o'zgartirildi: ${langCode.toUpperCase()}`);
  }
});

// ✍️ Matnni ovozga aylantirish
bot.on("text", (ctx) => {
  const lang = userLanguages[ctx.from.id] || "uz"; // Default O'zbek tili
  textToSpeech(ctx, ctx.message.text, lang);
});

// 🎙 Ovozdan matnga aylantirish
bot.on("voice", async (ctx) => {
  const fileId = ctx.message.voice.file_id;
  const fileLink = await ctx.telegram.getFileLink(fileId);
  const lang = userLanguages[ctx.from.id] || "uz"; // Default O'zbek tili
  speechToText(ctx, fileLink.href, lang);
});

bot.launch()
    .then(() => console.log("✅ Bot ishga tushdi!"))
    .catch(err => console.error("❌ Xatolik:", err));
