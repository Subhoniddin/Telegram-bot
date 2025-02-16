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


bot.launch()
    .then(() => console.log("✅ Bot ishga tushdi!"))
    .catch(err => console.error("❌ Xatolik:", err));
