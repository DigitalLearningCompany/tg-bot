import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  telegramId: { type: String, unique: true },
  status: String,
});
//@ts-ignore
schema.path("telegramId").index();
const User = mongoose.model("User", schema);

export { User };
