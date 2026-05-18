const write = require("./database/write");
const read = require("./database/read");
const People = require("./database/schema/person");
const checkPerson = require("./components/check");
async function interaction(interaction) {
  if (interaction.isAutocomplete()) {
    const focused = interaction.options.getFocused();

    const people = await People.find({
      userId: interaction.user.id,
      name: {
        $regex: focused,
        $options: "i",
      },
    });

    await interaction.respond(
      people.slice(0, 25).map((person) => ({
        name: person.name,
        value: person.value,
      })),
    );

    return;
  }
  if (!interaction.isChatInputCommand()) {
    return;
  }
  if (interaction.commandName === "addperson") {
    const rawName = interaction.options.getString("name");

    const normalized = rawName.trim().toLowerCase();

    const exists = await People.findOne({
      userId: interaction.user.id,
      value: normalized,
    });

    if (exists) {
      return interaction.reply("Person already exists.");
    }

    await People.create({
      userId: interaction.user.id,
      name: rawName,
      value: normalized,
    });

    return interaction.reply({
      content: `${rawName} added successfully.`,
      ephemeral: true,
    });
  }
  if (interaction.commandName === "track") {
    const name = interaction.options.getString("add-person");
    const validPerson = await People.findOne({
      userId: interaction.user.id,
      value: name,
    });

    if (!validPerson) {
      return interaction.reply({
        content: "Person not registered.",
        ephemeral: true,
      });
    }
    const msg = {
      userId: interaction.user.id,

      username: interaction.user.username,

      person: name,

      amount: interaction.options.getNumber("add-amount"),

      desc: interaction.options.getString("description"),
    };

    await write(msg);

    const time = new Date().toISOString().split("T")[0];

    return interaction.reply({
      content: `${time}\n**Log added**\nName: ${validPerson.name}\nAmount: ${msg.amount}\nType /check to check your log`,
      ephemeral: true,
    });
  }
  if (interaction.commandName === "check") {
    // console.log(await interaction);
    const name = interaction.options.getString("person");
    // console.log(name);

    const data = await read(interaction.user.username);

    if (!data || data.length === 0) {
      return interaction.reply({ content: "No logs found.", ephemeral: true });
    }
    if (name) {
      checkPerson(name, interaction);
      return;
    }

    let table = "```";

    table += "Person         Amount     Description\n";

    table += "--------------------------------------\n";

    data.forEach((item) => {
      table += `${item.person.padEnd(15)} ${String(item.amount).padEnd(10)} ${item.desc || "None"}\n`;
    });

    table += "```";

    return interaction.reply({
      content: table,
      ephemeral: true,
    });
  }
}
module.exports = interaction;
