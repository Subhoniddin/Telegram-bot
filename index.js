require("dotenv").config();

const { Telegraf } = require("telegraf");
const { BOT_TOKEN } = require("./config/env");
const connectDB = require("./utils/db");

const startCommand = require("./commands/start");
const { adminCommand, addAdminCommand } = require("./commands/admin");

const bot = new Telegraf(BOT_TOKEN);

// MongoDB ulash
connectDB();

// Bot komandalarini ishlatish
bot.start(startCommand);
bot.hears("👮 Admin", adminCommand);
bot.command("addadmin", addAdminCommand);

bot.launch()
    .then(() => console.log("✅ Bot ishga tushdi!"))
    .catch(err => console.error("❌ Xatolik:", err));
