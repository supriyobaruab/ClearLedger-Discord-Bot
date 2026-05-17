const time = new Date().toISOString().split("T")[0];
const mongoose = require("mongoose");
const write = require("./database/managedb");
const read = require("./database/readdata");

async function interaction(interaction) {
  if (!interaction.isChatInputCommand()) {
    return;
  }
  if (interaction.commandName === "track") {
    const name = interaction.options.getString("add-person");
    const amount = interaction.options.getNumber("add-amount");
    const desc = interaction.options.getString("description");
    await interaction.reply("Adding Meal");
    await interaction.editReply(
      `${time}\n**Log added**\nType /check to Check your log`,
    );
    const msg = {
      name: name,
      amount: amount,
      desc: desc,
      user: interaction.user.username,
    };
    write(msg);
    const sentMsg = await interaction.channel.send(
      `Name: ${name}\nAmount: ${amount}`,
    );
    setTimeout(() => {
      sentMsg.delete();
    }, 5000);
  }
  if (interaction.commandName === "check") {
    const data = await read(interaction.user.username);

    if (data.length === 0) {
      return interaction.reply("No logs found.");
    }

    let table = "```";

    table += "Name           Amount\n";

    table += "----------------------\n";

    data.forEach((item) => {
      table += `${item._id.padEnd(15)} ${item.totalAmount}\n`;
    });

    table += "```";

    await interaction.reply(table);
  }
}
module.exports = interaction;
