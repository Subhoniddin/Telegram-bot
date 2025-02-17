const { Markup } = require("telegraf");
const { MAIN_ADMIN_ID } = require("../config/env");

const {
  textToSpeech,
  speechToText,
  languageKeyboard,
} = require("../commands/tts_stt");

function isMainAdmin(userId) {
  return userId == MAIN_ADMIN_ID; // `===` emas, `==` ishlatish mumkin
}

async function showMainAdminPanel(ctx) {
  const keyboard = Markup.keyboard([
    ["📊 Statistika", "👥 Userlar"],
    ["➕ Admin qo'shish", "❌ Admin o'chirish"],
    ["📨 Xabar yuborish", "⚙ Sozlamalar"],
  ]).resize();

  await ctx.reply("🔹 Bosh admin paneliga xush kelibsiz!", keyboard);
}

function statistiks(ctx) {
  ctx.reply("Statistika malumotlari endi qo'shilsdi");
}
function addAdmin(ctx) {
  ctx.reply("Admin qoshish tez orada ishga tushuriladi");
}
function XabarYuborish(ctx) {
  ctx.reply("Barcha bot foydalanuvchilariga xabar yubora olasiz");
}
function users(ctx) {
  ctx.reply("Bu yerda userlar haqida malumot");
}
function removeAdmin(ctx) {
  ctx.reply("Botdagi admin statusidagilarni olib tashlashingiz mumkin");
}
function sozlamalar(ctx) {
  ctx.reply("Tilni tanlang:", languageKeyboard());
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
}

// TO'G'RI EKSPORT
module.exports = {
  isMainAdmin,
  showMainAdminPanel,
  statistiks,
  addAdmin,
  XabarYuborish,
  users,
  removeAdmin,
  sozlamalar,
};
