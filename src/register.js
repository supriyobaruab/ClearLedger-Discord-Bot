require("dotenv").config();

const {
  REST,
  Routes,
  Application,
  ApplicationCommand,
  ApplicationCommandOptionBase,
  ApplicationCommandOptionType,
  AutocompleteInteraction,
} = require("discord.js");

const commands = [
  {
    name: "track",
    description: "Track Money",
    options: [
      {
        name: "add-person",
        description: "Enter Person Name",
        type: ApplicationCommandOptionType.String,
        required: true,
        autocomplete: true,
      },
      {
        name: "add-amount",
        description: "Enter Amount",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: "description",
        description: "Enter details",
        type: ApplicationCommandOptionType.String,
        required: false,
      },
    ],
  },
  {
    name: "check",
    description: "Check the total amount",
  },
  {
    name: "addperson",
    description: "Add a new person",
    options: [
      {
        name: "name",
        description: "Person name",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];
const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);
(async () => {
  try {
    console.log("Registaring");
    await rest.put(
      Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
      { body: commands },
    );
    console.log("Registered");
  } catch (error) {
    console.log(error);
  }
})();
