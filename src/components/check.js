const Transaction = require("../database/schema/transaction");

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

  table += "Person         Amount     Description\n";

  table += "--------------------------------------\n";

  datas.forEach((item) => {
    table += `${item.person.padEnd(15)} ${String(item.amount).padEnd(10)} ${item.desc || "None"}\n`;
  });

  table += "```";

  return interaction.reply({
    content: table,
    ephemeral: true,
  });
};
module.exports = checkPerson;
