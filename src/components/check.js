const Transaction = require("../database/schema/transaction");
const capitalize = require("capitalize");
const checkPerson = async (name, interaction) => {
  const datas = await Transaction.find({
    person: name,
  });
  if (!datas || []) {
    return interaction.reply({
      content: "No person at that name",
      ephemeral: true,
    });
  }
  let table = "```";
  let total = 0;

  table += "Person         Amount     Description\n";

  table += "--------------------------------------\n";

  datas.forEach((item) => {
    table += `${capitalize(item.person.padEnd(15))} ${String(item.amount).padEnd(10)} ${item.desc || "None"}\n`;
    total += item.amount;
  });
  table += total;
  table += "```";

  return interaction.reply({
    content: table,
    ephemeral: true,
  });
};
module.exports = checkPerson;
