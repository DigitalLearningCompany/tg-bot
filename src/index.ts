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



agenda.define("Send Second Message", async (job) => {
  const { telegramId, telegramFirstName, queuePosition } = job.attrs.data;
  //const user = await User.findOne({ telegramId });
  //if (user?.status !== "pending") return;
  await sendSecondMessage(telegramId, telegramFirstName, queuePosition);
});

agenda.start();

const user = bot.chatType("private");

user.command("start", async (update) => {
  const telegramId = update.from.id;
  const telegramFirstName = update.from.first_name;
  const queuePosition = 22

  //const user = await User.findOne({ telegramId });
  //if (!user)
    //await User.create({
      //name: update.from.first_name,
      //telegramId,
      //status: "pending",
    //});

  //if (user?.status === "done") return;

  await sendStartMessage(update);

  await agenda.schedule("in 10 minutes", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition
  });

  await agenda.schedule("in 5 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-1
  });

  await agenda.schedule("in 10 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-2
  });

  await agenda.schedule("in 15 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-3
  });

  await agenda.schedule("in 20 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-4
  });

  await agenda.schedule("in 25 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-5
  });

  await agenda.schedule("in 30 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-6
  });

  await agenda.schedule("in 35 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-7
  });

  await agenda.schedule("in 40 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-8
  });

  await agenda.schedule("in 45 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-9
  });

  await agenda.schedule("in 50 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-10
  });

  await agenda.schedule("in 55 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-11
  });
  await agenda.schedule("in 60 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-12
  });

  await agenda.schedule("in 65 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-13
  });

  await agenda.schedule("in 70 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-14
  });

  await agenda.schedule("in 75 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-15
  });

  await agenda.schedule("in 80 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-16
  });

  await agenda.schedule("in 85 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-17
  });
  
  await agenda.schedule("in 90 hours", "Send Second Message", {
    telegramId,
    telegramFirstName,
    queuePosition: queuePosition-18
  });

  //await agenda.schedule("in 5 hours", "Send Third Message", {
    //   telegramId,
    //   telegramFirstName,
    // });
    // await agenda.schedule("in 10 hours", "Send Fourth Message", {
    //   telegramId,
    //   telegramFirstName,
    // });
    // await agenda.schedule("in 15 hours", "Send Fifth Message", {
    //   telegramId,
    //   telegramFirstName,
    // });
    // await agenda.schedule("in 20 hours", "Send Sixth Message", {
    //   telegramId,
    //   telegramFirstName,
    // });
    // await agenda.schedule("in 25 hours", "Send Seventh Message", {
    //   telegramId,
    //   telegramFirstName,
    // });
    // await agenda.schedule("in 30 hours", "Send Eighth Message", {
    //   telegramId,
    //   telegramFirstName,
    // });
    // await agenda.schedule("in 35 hours", "Send Nineth Message", {
    //   telegramId,
    //   telegramFirstName,
    // });
    // await agenda.schedule("in 40 hours", "Send Tenth Message", {
    //   telegramId,
    //   telegramFirstName,
    // });
});

async function sendStartMessage(update) {
  const message = introMessage(update.from.first_name);

  const chatId = update.chat.id;
  //await bot.api.sendVideo(
    //chatId,
    //'BAACAgEAAxkBAAEENFVmFhnIzJXwDEhEC2BP5S8k_ARO5QACMgQAAsyZsUR0piNsi6-oJjQE'
  //);

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
  position: int
) {
  const reply = secondMessage(telegramFirstName, position);
  //await bot.api.sendPhoto(
    //telegramId,
    //new InputFile("./src/assets/images/image-2.jpeg")
  //);
  await bot.api.sendMessage(telegramId, reply.text, {
    reply_markup: new InlineKeyboard()
      .url("QUERO AQUECER MINHA CONTA AGORA!", "https://youtu.be/StJ_3NXtLwQ")
      .row()
    entities: reply.entities,
  });
}

// async function sendThirdMessage(telegramId, telegramFirstName) {
//   const reply = thirdMessage(telegramFirstName);

//   await bot.api.sendVideo(
//     telegramId,
//     new InputFile("./src/assets/videos/video-3.mp4")
//   );
//   await bot.api.sendMessage(telegramId, reply.text, {
//     reply_markup: new InlineKeyboard()
//       .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
//       .row()
//       .text("Eu JÁ FIZ o passo a passo todo!", "win"),
//     entities: reply.entities,
//   });
// }

// async function sendFourthMessage(telegramId, telegramFirstName) {
//   const reply = fourthMessage(telegramFirstName);

//   await bot.api.sendPhoto(
//     telegramId,
//     new InputFile("./src/assets/images/image-4.jpeg")
//   );
//   await bot.api.sendMessage(telegramId, reply.text, {
//     reply_markup: new InlineKeyboard()
//       .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
//       .row()
//       .text("Eu JÁ FIZ o passo a passo todo!", "win"),
//     entities: reply.entities,
//   });
// }

// async function sendFithMessage(telegramId, telegramFirstName) {
//   const reply = fifthMessage(telegramFirstName);

//   await bot.api.sendVideo(
//     telegramId,
//     new InputFile("./src/assets/videos/video-5.mp4")
//   );
//   await bot.api.sendMessage(telegramId, reply.text, {
//     reply_markup: new InlineKeyboard()
//       .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
//       .row()
//       .text("Eu JÁ FIZ o passo a passo todo!", "win"),
//     entities: reply.entities,
//   });
// }

// async function sendSixthMessage(telegramId, telegramFirstName) {
//   const reply = sixthMessage(telegramFirstName);

//   await bot.api.sendPhoto(
//     telegramId,
//     new InputFile("./src/assets/images/image-6.jpeg")
//   );
//   await bot.api.sendMessage(telegramId, reply.text, {
//     reply_markup: new InlineKeyboard()
//       .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
//       .row()
//       .text("Eu JÁ FIZ o passo a passo todo!", "win"),
//     entities: reply.entities,
//   });
// }

// async function sendSeventhMessage(telegramId, telegramFirstName) {
//   const reply = seventhMessage(telegramFirstName);

//   await bot.api.sendPhoto(
//     telegramId,
//     new InputFile("./src/assets/images/image-7.jpeg")
//   );
//   await bot.api.sendMessage(telegramId, reply.text, {
//     reply_markup: new InlineKeyboard()
//       .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
//       .row()
//       .text("Eu JÁ FIZ o passo a passo todo!", "win"),
//     entities: reply.entities,
//   });
// }

// async function sendEighthMessage(telegramId, telegramFirstName) {
//   const reply = eightMessage(telegramFirstName);

//   await bot.api.sendVideo(
//     telegramId,
//     new InputFile("./src/assets/videos/video-8.mp4")
//   );
//   await bot.api.sendMessage(telegramId, reply.text, {
//     reply_markup: new InlineKeyboard()
//       .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
//       .row()
//       .text("Eu JÁ FIZ o passo a passo todo!", "win"),
//     entities: reply.entities,
//   });
// }

// async function sendNinethMessage(telegramId, telegramFirstName) {
//   const reply = ninethMessage(telegramFirstName);

//   await bot.api.sendPhoto(
//     telegramId,
//     new InputFile("./src/assets/images/image-9.jpeg")
//   );
//   await bot.api.sendMessage(telegramId, reply.text, {
//     reply_markup: new InlineKeyboard()
//       .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
//       .row()
//       .text("Eu JÁ FIZ o passo a passo todo!", "win"),
//     entities: reply.entities,
//   });
// }

// async function sendTenthMessage(telegramId, telegramFirstName) {
//   const reply = tenthMessage(telegramFirstName);

//   await bot.api.sendVideo(
//     telegramId,
//     new InputFile("./src/assets/videos/video-10.mp4")
//   );
//   await bot.api.sendMessage(telegramId, reply.text, {
//     reply_markup: new InlineKeyboard()
//       .url("Vou fazer o passo a passo AGORA!", "https://t.me/+aQSAAQ05iUplNjNh")
//       .row()
//       .text("Eu JÁ FIZ o passo a passo todo!", "win"),
//     entities: reply.entities,
//   });
// }

// async function sendScheduledEverydayMessage(allPendingUsers, response, job) {
//   for (const user of allPendingUsers) {
//     try {
//       await job.touch();
//       await bot.api.sendMessage(user?.telegramId, response?.text, {
//         reply_markup: new InlineKeyboard()
//           .url(
//             "Quero participar da live AGORA!",
//             "https://t.me/+aQSAAQ05iUplNjNh"
//           )
//           .row()
//           .text("Eu JÁ FIZ o passo a passo todo!", "win"),
//         entities: response.entities,
//       });
//     } catch (error) {
//       // checks for 403 errors in case user blocked the bot or deleted telegram account
//       if (error.message.includes('403')) {
//         await User.updateOne(
//           { telegramId: user?.telegramId },
//           { status: "blocked" }
//         );
//       } else {
//         console.error("Everyday Message Error ", error.message);
//       }
//     }
//   }
// }


//user.on("callback_query", async (query) => {
  //try {
    //const chatId = query.chat.id;
    //const userId = query.from.id;
    //const option = query.callbackQuery.data;

    // Handle the user's response
    //if (option === "win") {
      //const reply = congrats(query.from.first_name);
      //await bot.api.sendMessage(chatId, reply.text, {
        //entities: reply.entities,
      //});
      //await User.updateOne({ telegramId: userId }, { status: "done" });
    //}
  //} catch (error) {
    //console.error(error);
  //}
//});

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
