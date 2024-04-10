import { config } from "dotenv";
config();
import {
  Bot,
  Context,
  GrammyError,
  HttpError,
  InlineKeyboard,
  InputFile,
} from "grammy";
import { hydrateReply, ParseModeFlavor } from "@grammyjs/parse-mode";
import { connect } from "mongoose";
import { Agenda } from "@hokify/agenda";
import { User } from "./models/userModel";
import introMessage from "./responses/start";
import secondMessage from "./responses/secondMessage";
import thirdMessage from "./responses/thirdMessage";
import fourthMessage from "./responses/fourthMessage";
import fifthMessage from "./responses/fifthMessage";
import sixthMessage from "./responses/sixthMessage";
import seventhMessage from "./responses/seventhMessage";
import eightMessage from "./responses/eightMessage";
import ninethMessage from "./responses/ninethMessage";
import tenthMessage from "./responses/tenthMessage";
import fixedTimeMessage from "./responses/fixedTimeMessage";
import congrats from "./responses/congratulations";

const MONGO_URI = process.env.MONGO_URI;
const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN || !MONGO_URI) {
  console.error("Missing environment variables");
  process.exit(1);
}
connect(MONGO_URI);

const bot = new Bot<ParseModeFlavor<Context>>(TOKEN);
const agenda = new Agenda({ db: { address: MONGO_URI } });
bot.use(hydrateReply);

agenda.define("Send Message Monday to Saturday", async (job) => {
  const { message } = job.attrs.data;
  const users = await User.find({ status: "pending" });
  await sendScheduledEverydayMessage(users, message, job);
});

agenda.define("Send Message Sunday Only", async (job) => {
  const { message } = job.attrs.data;
  const users = await User.find({ status: "pending" });
  await sendScheduledEverydayMessage(users, message, job);
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
  "50 8,13,19 * * 1-6",
  "Send Message Monday to Saturday",
  {
    message: fixedTimeMessage,
  },
  {
    timezone: "America/Sao_Paulo",
  }
);

agenda.every(
  "50 11,13,21 * * 0",
  "Send Message Sunday Only",
  {
    message: fixedTimeMessage,
  },
  {
    timezone: "America/Sao_Paulo",
  }
);

agenda.start();

const user = bot.chatType("private");

user.command("start", async (update) => {
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

  const chatId = update.chat.id;
  await bot.api.sendVideo(
    chatId,
    'BAACAgEAAxkBAAEENFVmFhnIzJXwDEhEC2BP5S8k_ARO5QACMgQAAsyZsUR0piNsi6-oJjQE'
  );

  await bot.api.sendMessage(chatId, message.text, {
    reply_markup: new InlineKeyboard().url(
      "Quero entrar no grupo AGORA!",
      "https://t.me/+aQSAAQ05iUplNjNh"
    ),
    entities: message.entities,
  });
}

async function sendSecondMessage(
  telegramId: number,
  telegramFirstName: string
) {
  const reply = secondMessage(telegramFirstName);

  await bot.api.sendPhoto(
    telegramId,
    new InputFile("./src/assets/images/image-2.jpeg")
  );
  await bot.api.sendMessage(telegramId, reply.text, {
    reply_markup: new InlineKeyboard()
      .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
      .row()
      .text("Eu JÁ FIZ o passo a passo todo!", "win"),
    entities: reply.entities,
  });
}

async function sendThirdMessage(telegramId, telegramFirstName) {
  const reply = thirdMessage(telegramFirstName);

  await bot.api.sendVideo(
    telegramId,
    new InputFile("./src/assets/videos/video-3.mp4")
  );
  await bot.api.sendMessage(telegramId, reply.text, {
    reply_markup: new InlineKeyboard()
      .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
      .row()
      .text("Eu JÁ FIZ o passo a passo todo!", "win"),
    entities: reply.entities,
  });
}

async function sendFourthMessage(telegramId, telegramFirstName) {
  const reply = fourthMessage(telegramFirstName);

  await bot.api.sendPhoto(
    telegramId,
    new InputFile("./src/assets/images/image-4.jpeg")
  );
  await bot.api.sendMessage(telegramId, reply.text, {
    reply_markup: new InlineKeyboard()
      .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
      .row()
      .text("Eu JÁ FIZ o passo a passo todo!", "win"),
    entities: reply.entities,
  });
}

async function sendFithMessage(telegramId, telegramFirstName) {
  const reply = fifthMessage(telegramFirstName);

  await bot.api.sendVideo(
    telegramId,
    new InputFile("./src/assets/videos/video-5.mp4")
  );
  await bot.api.sendMessage(telegramId, reply.text, {
    reply_markup: new InlineKeyboard()
      .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
      .row()
      .text("Eu JÁ FIZ o passo a passo todo!", "win"),
    entities: reply.entities,
  });
}

async function sendSixthMessage(telegramId, telegramFirstName) {
  const reply = sixthMessage(telegramFirstName);

  await bot.api.sendPhoto(
    telegramId,
    new InputFile("./src/assets/images/image-6.jpeg")
  );
  await bot.api.sendMessage(telegramId, reply.text, {
    reply_markup: new InlineKeyboard()
      .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
      .row()
      .text("Eu JÁ FIZ o passo a passo todo!", "win"),
    entities: reply.entities,
  });
}

async function sendSeventhMessage(telegramId, telegramFirstName) {
  const reply = seventhMessage(telegramFirstName);

  await bot.api.sendPhoto(
    telegramId,
    new InputFile("./src/assets/images/image-7.jpeg")
  );
  await bot.api.sendMessage(telegramId, reply.text, {
    reply_markup: new InlineKeyboard()
      .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
      .row()
      .text("Eu JÁ FIZ o passo a passo todo!", "win"),
    entities: reply.entities,
  });
}

async function sendEighthMessage(telegramId, telegramFirstName) {
  const reply = eightMessage(telegramFirstName);

  await bot.api.sendVideo(
    telegramId,
    new InputFile("./src/assets/videos/video-8.mp4")
  );
  await bot.api.sendMessage(telegramId, reply.text, {
    reply_markup: new InlineKeyboard()
      .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
      .row()
      .text("Eu JÁ FIZ o passo a passo todo!", "win"),
    entities: reply.entities,
  });
}

async function sendNinethMessage(telegramId, telegramFirstName) {
  const reply = ninethMessage(telegramFirstName);

  await bot.api.sendPhoto(
    telegramId,
    new InputFile("./src/assets/images/image-9.jpeg")
  );
  await bot.api.sendMessage(telegramId, reply.text, {
    reply_markup: new InlineKeyboard()
      .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
      .row()
      .text("Eu JÁ FIZ o passo a passo todo!", "win"),
    entities: reply.entities,
  });
}

async function sendTenthMessage(telegramId, telegramFirstName) {
  const reply = tenthMessage(telegramFirstName);

  await bot.api.sendVideo(
    telegramId,
    new InputFile("./src/assets/videos/video-10.mp4")
  );
  await bot.api.sendMessage(telegramId, reply.text, {
    reply_markup: new InlineKeyboard()
      .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
      .row()
      .text("Eu JÁ FIZ o passo a passo todo!", "win"),
    entities: reply.entities,
  });
}

async function sendScheduledEverydayMessage(allPendingUsers, response, job) {
  for (const user of allPendingUsers) {
    try {
      await job.touch();
      await bot.api.sendMessage(user?.telegramId, response?.text, {
        reply_markup: new InlineKeyboard()
          .url(
            "Quero participar da live AGORA!",
            "https://t.me/+aQSAAQ05iUplNjNh"
          )
          .row()
          .text("Eu JÁ FIZ o passo a passo todo!", "win"),
        entities: response.entities,
      });
    } catch (error) {
      // checks for 403 errors in case user blocked the bot or deleted telegram account
      if (error.message.includes('403')) {
        await User.updateOne(
          { telegramId: user?.telegramId },
          { status: "blocked" }
        );
      } else {
        console.error("Everyday Message Error ", error.message);
      }
    }
  }
}

user.on("callback_query", async (query) => {
  try {
    const chatId = query.chat.id;
    const userId = query.from.id;
    const option = query.callbackQuery.data;

    // Handle the user's response
    if (option === "win") {
      const reply = congrats(query.from.first_name);
      await bot.api.sendMessage(chatId, reply.text, {
        entities: reply.entities,
      });
      await User.updateOne({ telegramId: userId }, { status: "done" });
    }
  } catch (error) {
    console.error(error);
  }
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.start();
