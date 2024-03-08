require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const { Agenda } = require("@hokify/agenda");

mongoose.connect(process.env.MONGO_URI);
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const agenda = new Agenda({ db: { address: process.env.MONGO_URI } });

agenda.define("Send Message Monday to Saturday", async (job) => {
  const { message } = job.attrs.data;
  const users = await User.find({ status: "pending" });
  await sendScheduledEverydayMessage(users, message);
});

agenda.define("Send Message Sunday Only", async (job) => {
  const { message } = job.attrs.data;
  const users = await User.find({ status: "pending" });
  await sendScheduledEverydayMessage(users, message);
});

agenda.define("Send Message", async (job) => {
  const { telegramId, message } = job.attrs.data;
  const user = await User.findOne({ telegramId });
  if (user?.status !== "pending") return;
  await sendScheduledMessage(telegramId, message);
});

agenda.every(
  "0 9,14,20 * * 1-6",
  "Send Message Monday to Saturday",
  {
    message: "mensagem de seg à sab, horários: 9-2-10",
  },
  {
    timezone: "America/Sao_Paulo",
  }
);

agenda.every(
  "0 12,16,22 * * 0",
  "Send Message Sunday Only",
  {
    message: "mensagem de domingo apenas, horários: 12-16-22h",
  },
  {
    timezone: "America/Sao_Paulo",
  }
);

agenda.start();

bot.onText(/^\/start$/, async (update) => {
  const telegramId = update.from.id;
  const user = await User.findOne({ telegramId });
  if (!user)
    await User.create({
      name: update.from.first_name,
      telegramId,
      status: "pending",
    });

  if (user?.status === "done") return;

  const opts = {
    telegramId,
  };

  await sendStartMessage(update);
  await agenda.schedule("in 5 seconds", "Send Message", {
    ...opts,
    message: "5 seconds have passed",
  });
  await agenda.schedule("in 15 seconds", "Send Message", {
    ...opts,
    message: "15 seconds have passed",
  });
  await agenda.schedule("in 25 seconds", "Send Message", {
    ...opts,
    message: "25 seconds have passed",
  });
  await agenda.schedule("in 35 seconds", "Send Message", {
    ...opts,
    message: "35 seconds have passed",
  });
  await agenda.schedule("in 45 seconds", "Send Message", {
    ...opts,
    message: "45 seconds have passed",
  });
  await agenda.schedule("in 55 seconds", "Send Message", {
    ...opts,
    message: "55 seconds have passed",
  });
});

bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const userId = query.from.id;
  const option = query.data;

  // Handle the user's response
  if (option === "win") {
    bot.sendMessage(chatId, "VOCÊ GANHOU O PRÊMIO!");
    await User.updateOne({ telegramId: userId }, { status: "done" });
  }
});

async function sendStartMessage(update) {
  const keyboard = {
    inline_keyboard: [
      [
        {
          text: "FAZER PASSO-A-PASSO",
          callback_data: "yes",
        },
      ],
      [
        {
          text: "HMMM NÃO SEI...",
          callback_data: "no",
        },
      ],
      [
        {
          text: "JÁ FIZ O PASSO-A-PASSO!",
          callback_data: "win",
        },
      ],
    ],
  };

  const chatId = update.chat.id;

  await bot.sendMessage(chatId, `Opaaa, ${update.from.first_name}, tudo bem??`);
  await bot.sendMessage(
    chatId,
    `Queria te parabenizar porque você me chamou a tempo de garantir uma vaguinha no nosso grupo de Prêmios gratuitos 🎁.
  
      O primeiro passo para realizar os seus sonhos comigo é clicando no botão abaixo 👇`,
    { reply_markup: keyboard }
  );
}

async function sendScheduledMessage(telegramId, response) {
  await bot.sendMessage(telegramId, response);
}

async function sendScheduledEverydayMessage(allPendingUsers, response) {
  allPendingUsers.forEach((user) => {
    bot.sendMessage(user?.telegramId, response);
  });
}
