const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  telegramId: { type: String, unique: true },
  status: String,
});
schema.path("telegramId").index();
const User = mongoose.model("User", schema);

module.exports = User;
