const { Telegraf, Markup, Telegram } = require("telegraf");
require("dotenv").config();
const filmsArray = require("./Films.js");

const bot = new Telegraf(process.env.BOT_TOKEN);
const client = new Telegram(process.env.BOT_TOKEN);

// Функция для проверки подписки пользователя
async function checkSubscription(chatId) {
  try {
    const result = await client.getChatMember("@kinoKytezh", chatId);
    if (
      result &&
      ["member", "administrator", "creator"].includes(result.status)
    ) {
      return true;
    }
  } catch (error) {
    console.error("Ошибка проверки подписки:", error);
  }
  return false;
}

// Приветствие и Start
bot.start((ctx) => {
  const buttons = Markup.inlineKeyboard([
    Markup.button.url("✅ Подписаться на канал", "https://t.me/kinoKytezh"),
    Markup.button.callback("🔍 Найти фильм", "search_movie"),
  ]);

  ctx.reply(
    "🔍 Введите код фильма\n\n☑️ Бот отправит вам название вашего фильма",
    buttons
  );
});

bot.action("search_movie", (ctx) => {
  ctx.reply("Введите номер фильма для поиска");
});

// Обработка текстовых сообщений
bot.on("text", async (ctx) => {
  const chatId = ctx.chat.id;
  const isSubscribed = await checkSubscription(chatId);

  if (isSubscribed) {
    const num = parseInt(ctx.message.text);
    if (isNaN(num)) {
      ctx.reply("Введите число, пожалуйста.");
    } else if (num >= 1 && num < filmsArray.length) {
      ctx.reply(filmsArray[num]);
    } else {
      ctx.reply("Недопустимый номер фильма.");
    }
  } else {
    const buttons = Markup.inlineKeyboard([
      Markup.button.url("✅ Подписаться на канал", "https://t.me/kinoKytezh"),
    ]);
    ctx.reply(
      "Вы не подписаны на канал. Пожалуйста, подпишитесь на канал, чтобы продолжить.",
      buttons
    );
  }
});

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
