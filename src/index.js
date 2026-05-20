const { Client, IntentsBitField } = require("discord.js");
const crypto = require("crypto");
global.crypto = crypto;
const clearMsg = require("./clearMsg");
const interaction = require("./interaction");
const DB = require("./database/DB");
const read = require("./database/read");
require("dotenv").config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});
client.on("clientReady", (c) => {
  console.log(c.user.username);
});
client.on("messageCreate", (msg) => {
  if (msg.content === "!clear") {
    clearMsg(msg);
  }
});
client.on("interactionCreate", interaction);
DB();
client.login(process.env.DISCORD_TOKEN);
