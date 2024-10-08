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

agenda.define("Send Second Message", async (job) => {
  const { telegramId, telegramFirstName, queuePosition } = job.attrs.data;
  await sendSecondMessage(telegramId, telegramFirstName, queuePosition);
});

agenda.define("Send 5h Message", async (job) => {
  const { telegramId, telegramFirstName, queuePosition } = job.attrs.data;

  if (queuePosition < 3) return;

  await sendSecondMessage(telegramId, telegramFirstName, queuePosition);

  const newQueuePosition = queuePosition - 1;

  await agenda.schedule("in 5 hours", "Send 5h Message", {
    telegramId,
    telegramFirstName,
    queuePosition: newQueuePosition,
  });
});

agenda.start();

const user = bot.chatType("private");

user.command("start", async (update) => {
  try {
    const telegramId = update.from.id;
    const telegramFirstName = update.from.first_name;
    const queuePosition = 36; // arbitrary number choosen by the client

    await sendStartMessage(update);

    await agenda.schedule("in 10 minutes", "Send Second Message", {
      telegramId,
      telegramFirstName,
      queuePosition,
    });

    await agenda.schedule("in 5 hours", "Send 5h Message", {
      telegramId,
      telegramFirstName,
      queuePosition: queuePosition - 1,
    });
  } catch (error) {
    console.error(error);
  }
});

async function sendStartMessage(update) {
  const message = introMessage(update.from.first_name);

  const chatId = update.chat.id;

  await bot.api.sendMessage(chatId, message.text, {
    reply_markup: new InlineKeyboard().url(
      "QUERO ENTRAR NO GRUPO VIP!",
      "https://t.me/+zqDKJPLAEw03Nzhh"
    ),
    entities: message.entities,
  });
}

async function sendSecondMessage(
  telegramId: number,
  telegramFirstName: string,
  position: number
) {
  const reply = secondMessage(telegramFirstName, position);
  await bot.api.sendMessage(telegramId, reply.text, {
    reply_markup: new InlineKeyboard()
      .url("QUERO AQUECER MINHA CONTA AGORA!", "https://youtu.be/4LmdK6gFsxw")
      .row(),
    entities: reply.entities,
  });
}

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
