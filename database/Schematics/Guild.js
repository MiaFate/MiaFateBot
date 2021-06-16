const MONGOOSE = require("mongoose");
//config = require("../../config.json");

module.exports = MONGOOSE.model(
  "Guild",
  new MONGOOSE.Schema({
    id: { type: String }, //ID of the guild
    registeredAt: { type: Number, default: Date.now() },
    prefix: { type: String, default: process.env.prefix },
  })
);
