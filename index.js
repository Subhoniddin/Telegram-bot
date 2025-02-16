const { Telegraf, Markup } = require("telegraf");

const YOUR_BOT_TOKEN = '7790091290:AAEyQTucOcDrN1F7_4RvUYf0QLXdlm1MJMA'
const bot = new Telegraf(YOUR_BOT_TOKEN);

async function isAddChannel(ctx) {
    const channel = "my_biznes2"; 
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

const main = (ctx) => {
    const keyboardinln = Markup.inlineKeyboard([
        [   
            Markup.button.callback("Sotish", "button1"),
            Markup.button.callback("Sotib olish", "button2")
        ],
        [
            Markup.button.callback("Bazor", "bazor"),
            Markup.button.callback("Statistika", "Statistika"),  
            Markup.button.callback("Ko'rish", "ko'rish")
        ]
    ]);
    
    ctx.reply(`Salom, ${ctx.chat.first_name}!`, keyboardinln);
    
    bot.action("button1", (ctx) => ctx.reply("13440"));
    bot.action("button2", (ctx) => ctx.reply("13200"));
    
    bot.action("bazor", (ctx) => {
        ctx.reply("Bazorlarni tahlil qiling", Markup.inlineKeyboard([
            [Markup.button.callback("Binance", "binance"), Markup.button.callback("Bitget", "bitget")]
        ]));
    });
};

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

bot.launch();
