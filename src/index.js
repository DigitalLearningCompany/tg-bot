const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on("chat_join_request", (msg) => {
  bot.approveChatJoinRequest(msg.chat.id, msg.from.id);
  bot.sendMessage(
    msg.from.id,
    `Olá ${msg.from.first_name}! Bem-vindo(a) ao DS_TEST_CHANNEL, o melhor canal de testes do Brasil e do mundo!`
  );
});
