const fs = require("fs");
const gtts = require("node-gtts");
const axios = require("axios");

const languages = {
    "🇺🇿 O'zbekcha": "uz",
    "🇷🇺 Русский": "ru",
    "🇬🇧 English": "en"
};

// Tilni tanlash uchun inline keyboard
function languageKeyboard() {
    return {
        reply_markup: {
            inline_keyboard: Object.keys(languages).map(lang => [{ text: lang, callback_data: `lang_${languages[lang]}` }])
        }
    };
}

// Matnni ovozga aylantirish (TTS)
async function textToSpeech(ctx, text, lang = "uz") {
    try {
        const gttsInstance = gtts(lang);
        const filePath = `./audio_${Date.now()}.mp3`;

        gttsInstance.save(filePath, text, () => {
            ctx.replyWithVoice({ source: filePath })
                .then(() => fs.unlinkSync(filePath)) // Faqatgina jo‘natilganidan keyin faylni o‘chiramiz
                .catch(err => console.error("❌ Faylni o‘chirishda xatolik:", err));
        });
    } catch (err) {
        ctx.reply("❌ Xatolik yuz berdi, qayta urinib ko‘ring.");
        console.error(err);
    }
}

// Ovozli xabarni matnga aylantirish (STT)
async function speechToText(ctx, fileLink, lang = "uz") {
    try {
        const response = await axios.get(fileLink, { responseType: "stream" });
        const filePath = `./audio_${Date.now()}.ogg`;
        const writer = fs.createWriteStream(filePath);

        response.data.pipe(writer);

        writer.on("finish", async () => {
            // 🎙 STT modelidan foydalanish kerak (masalan, OpenAI Whisper)
            ctx.reply(`📝 *Matn:* [Ovozdan matnga o‘girildi]`);
            fs.unlinkSync(filePath);
        });
    } catch (err) {
        ctx.reply("❌ Xatolik yuz berdi, qayta urinib ko‘ring.");
        console.error(err);
    }
}

module.exports = {
    textToSpeech,
    speechToText,
    languageKeyboard
};
