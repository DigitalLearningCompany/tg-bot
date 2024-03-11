require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const { Agenda } = require("@hokify/agenda");
const { createKeyboard } = require("./utils/createKeyboard");
const introMessage = require("./responses/start");
const { secondMessage } = require("./responses/secondMessage");
const { thirdMessage } = require("./responses/thirdMessage");
const { fourthMessage } = require("./responses/fourthMessage");
const { fifthMessage } = require("./responses/fifthMessage");
const { sixthMessage } = require("./responses/sixthMessage");
const { seventhMessage } = require("./responses/seventhMessage");
const { eightMessage } = require("./responses/eightMessage");
const { ninethMessage } = require("./responses/ninethMessage");
const { tenthMessage } = require("./responses/tenthMessage");
const fixedTimeMessage = require("./responses/fixedTimeMessage");
const congrats = require("./responses/congratulations");

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

agenda.define("Send Second Message", async (job) => {
  const { telegramId, telegramFirstName } = job.attrs.data;
  const user = await User.findOne({ telegramId });
  if (user?.status !== "pending") return;
  await sendSecondMessage(telegramId, telegramFirstName);
});

agenda.define("Send Third Message", async (job) => {
  const { telegramId, telegramFirstName } = job.attrs.data;
  const user = await User.findOne({ telegramId });
  if (user?.status !== "pending") return;
  await sendThirdMessage(telegramId, telegramFirstName);
});

agenda.define("Send Fourth Message", async (job) => {
  const { telegramId, telegramFirstName } = job.attrs.data;
  const user = await User.findOne({ telegramId });
  if (user?.status !== "pending") return;
  await sendFourthMessage(telegramId, telegramFirstName);
});

agenda.define("Send Fifth Message", async (job) => {
  const { telegramId, telegramFirstName } = job.attrs.data;
  const user = await User.findOne({ telegramId });
  if (user?.status !== "pending") return;
  await sendFithMessage(telegramId, telegramFirstName);
});

agenda.define("Send Sixth Message", async (job) => {
  const { telegramId, telegramFirstName } = job.attrs.data;
  const user = await User.findOne({ telegramId });
  if (user?.status !== "pending") return;
  await sendSixthMessage(telegramId, telegramFirstName);
});

agenda.define("Send Seventh Message", async (job) => {
  const { telegramId, telegramFirstName } = job.attrs.data;
  const user = await User.findOne({ telegramId });
  if (user?.status !== "pending") return;
  await sendSeventhMessage(telegramId, telegramFirstName);
});

agenda.define("Send Eighth Message", async (job) => {
  const { telegramId, telegramFirstName } = job.attrs.data;
  const user = await User.findOne({ telegramId });
  if (user?.status !== "pending") return;
  await sendEighthMessage(telegramId, telegramFirstName);
});

agenda.define("Send Nineth Message", async (job) => {
  const { telegramId, telegramFirstName } = job.attrs.data;
  const user = await User.findOne({ telegramId });
  if (user?.status !== "pending") return;
  await sendNinethMessage(telegramId, telegramFirstName);
});

agenda.define("Send Tenth Message", async (job) => {
  const { telegramId, telegramFirstName } = job.attrs.data;
  const user = await User.findOne({ telegramId });
  if (user?.status !== "pending") return;
  await sendTenthMessage(telegramId, telegramFirstName);
});

agenda.every(
  "0 9,14,20 * * 1-6",
  "Send Message Monday to Saturday",
  {
    message: fixedTimeMessage,
  },
  {
    timezone: "America/Sao_Paulo",
  }
);

agenda.every(
  "0 12,16,22 * * 0",
  "Send Message Sunday Only",
  {
    message: fixedTimeMessage,
  },
  {
    timezone: "America/Sao_Paulo",
  }
);

agenda.start();

bot.onText(/^\/start$/, async (update) => {
  const telegramId = update.from.id;
  const telegramFirstName = update.from.first_name;
  const user = await User.findOne({ telegramId });
  if (!user)
    await User.create({
      name: update.from.first_name,
      telegramId,
      status: "pending",
    });

  if (user?.status === "done") return;

  await sendStartMessage(update);

  await agenda.schedule("in 10 minutes", "Send Second Message", {
    telegramId,
    telegramFirstName,
  });
  await agenda.schedule("in 3 hours", "Send Third Message", {
    telegramId,
    telegramFirstName,
  });
  await agenda.schedule("in 6 hours", "Send Fourth Message", {
    telegramId,
    telegramFirstName,
  });
  await agenda.schedule("in 9 hours", "Send Fifth Message", {
    telegramId,
    telegramFirstName,
  });
  await agenda.schedule("in 12 hours", "Send Sixth Message", {
    telegramId,
    telegramFirstName,
  });
  await agenda.schedule("in 15 hours", "Send Seventh Message", {
    telegramId,
    telegramFirstName,
  });
  await agenda.schedule("in 18 hours", "Send Eighth Message", {
    telegramId,
    telegramFirstName,
  });
  await agenda.schedule("in 21 hours", "Send Nineth Message", {
    telegramId,
    telegramFirstName,
  });
  await agenda.schedule("in 24 hours", "Send Tenth Message", {
    telegramId,
    telegramFirstName,
  });
});

async function sendStartMessage(update) {
  const message = introMessage(update.from.first_name);

  const keyboard = createKeyboard([
    {
      text: "Quero entrar no grupo AGORA!",
      url: "https://t.me/+aQSAAQ05iUplNjNh",
    },
  ]);

  try {
    const chatId = update.chat.id;
    await bot.sendVideo(chatId, "./src/assets/videos/intro-message.mp4");
    await bot.sendMessage(chatId, message, {
      reply_markup: keyboard,
      parse_mode: "Markdown",
    });
  } catch (error) {
    console.log(error.message);
  }
}

async function sendSecondMessage(telegramId, telegramFirstName) {
  const reply = secondMessage(telegramFirstName);

  await bot.sendPhoto(telegramId, "./src/assets/images/image-2.jpeg");
  await bot.sendMessage(telegramId, reply, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Vou fazer o passo a passo AGORA!",
            url: "https://t.me/c/1567748657/61177",
          },
        ],
        [
          {
            text: "Eu JÁ FIZ o passo a passo todo!",
            callback_data: "win",
          },
        ],
      ],
    },
    parse_mode: "Markdown",
  });
}

async function sendThirdMessage(telegramId, telegramFirstName) {
  const reply = thirdMessage(telegramFirstName);

  await bot.sendVideo(telegramId, "./src/assets/videos/video-3.mp4");
  await bot.sendMessage(telegramId, reply, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Vou fazer o passo a passo AGORA!",
            url: "https://t.me/c/1567748657/61177",
          },
        ],
        [
          {
            text: "Eu JÁ FIZ o passo a passo todo!",
            callback_data: "win",
          },
        ],
      ],
    },
    parse_mode: "Markdown",
  });
}

async function sendFourthMessage(telegramId, telegramFirstName) {
  const reply = fourthMessage(telegramFirstName);

  await bot.sendPhoto(telegramId, "./src/assets/images/image-4.jpeg");
  await bot.sendMessage(telegramId, reply, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Vou fazer o passo a passo AGORA!",
            url: "https://t.me/c/1567748657/61177",
          },
        ],
        [
          {
            text: "Eu JÁ FIZ o passo a passo todo!",
            callback_data: "win",
          },
        ],
      ],
    },
    parse_mode: "Markdown",
  });
}

async function sendFithMessage(telegramId, telegramFirstName) {
  const reply = fifthMessage(telegramFirstName);

  await bot.sendVideo(telegramId, "./src/assets/videos/video-5.mp4");
  await bot.sendMessage(telegramId, reply, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Vou fazer o passo a passo AGORA!",
            url: "https://t.me/c/1567748657/61177",
          },
        ],
        [
          {
            text: "Eu JÁ FIZ o passo a passo todo!",
            callback_data: "win",
          },
        ],
      ],
    },
    parse_mode: "Markdown",
  });
}

async function sendSixthMessage(telegramId, telegramFirstName) {
  const reply = sixthMessage(telegramFirstName);

  await bot.sendPhoto(telegramId, "./src/assets/images/image-6.jpeg");
  await bot.sendMessage(telegramId, reply, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Vou fazer o passo a passo AGORA!",
            url: "https://t.me/c/1567748657/61177",
          },
        ],
        [
          {
            text: "Eu JÁ FIZ o passo a passo todo!",
            callback_data: "win",
          },
        ],
      ],
    },
    parse_mode: "Markdown",
  });
}

async function sendSeventhMessage(telegramId, telegramFirstName) {
  const reply = seventhMessage(telegramFirstName);

  await bot.sendPhoto(telegramId, "./src/assets/images/image-7.jpeg");
  await bot.sendMessage(telegramId, reply, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Vou fazer o passo a passo AGORA!",
            url: "https://t.me/c/1567748657/61177",
          },
        ],
        [
          {
            text: "Eu JÁ FIZ o passo a passo todo!",
            callback_data: "win",
          },
        ],
      ],
    },
    parse_mode: "Markdown",
  });
}

async function sendEighthMessage(telegramId, telegramFirstName) {
  const reply = eightMessage(telegramFirstName);

  await bot.sendVideo(telegramId, "./src/assets/videos/video-8.mp4");
  await bot.sendMessage(telegramId, reply, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Vou fazer o passo a passo AGORA!",
            url: "https://t.me/c/1567748657/61177",
          },
        ],
        [
          {
            text: "Eu JÁ FIZ o passo a passo todo!",
            callback_data: "win",
          },
        ],
      ],
    },
    parse_mode: "Markdown",
  });
}

async function sendNinethMessage(telegramId, telegramFirstName) {
  const reply = ninethMessage(telegramFirstName);

  await bot.sendPhoto(telegramId, "./src/assets/images/image-9.jpeg");
  await bot.sendMessage(telegramId, reply, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Vou fazer o passo a passo AGORA!",
            url: "https://t.me/c/1567748657/61177",
          },
        ],
        [
          {
            text: "Eu JÁ FIZ o passo a passo todo!",
            callback_data: "win",
          },
        ],
      ],
    },
    parse_mode: "Markdown",
  });
}

async function sendTenthMessage(telegramId, telegramFirstName) {
  const reply = tenthMessage(telegramFirstName);

  await bot.sendVideo(telegramId, "./src/assets/videos/video-10.mp4");
  await bot.sendMessage(telegramId, reply, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Vou fazer o passo a passo AGORA!",
            url: "https://t.me/c/1567748657/61177",
          },
        ],
        [
          {
            text: "Eu JÁ FIZ o passo a passo todo!",
            callback_data: "win",
          },
        ],
      ],
    },
    parse_mode: "Markdown",
  });
}

async function sendScheduledEverydayMessage(allPendingUsers, response) {
  allPendingUsers.forEach((user) => {
    bot.sendMessage(user?.telegramId, response, {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Quero participar da live AGORA!",
              url: "https://t.me/+aQSAAQ05iUplNjNh",
            },
          ],
          [
            {
              text: "Eu JÁ FIZ o passo a passo todo!",
              callback_data: "win",
            },
          ],
        ],
      },
      parse_mode: "Markdown",
    });
  });
}

bot.on("callback_query", async (query) => {
  try {
    const chatId = query.message.chat.id;
    const userId = query.from.id;
    const option = query.data;

    // Handle the user's response
    if (option === "win") {
      const reply = congrats(query.from.first_name);
      bot.sendMessage(chatId, reply, { parse_mode: "Markdown" });
      await User.updateOne({ telegramId: userId }, { status: "done" });
    }
  } catch (error) {
    console.error(error);
  }
});
