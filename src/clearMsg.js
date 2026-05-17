const clearMsg = async (msg) => {
  if (!msg.member.permissions.has("ManageMessages")) {
    return msg.reply("You don't have permission to do that.");
  }
  try {
    await msg.channel.bulkDelete(100, true);

    msg.channel.send("Deleted messages.").then((m) => {
      setTimeout(() => m.delete(), 3000);
    });
  } catch (err) {
    console.error(err);

    msg.channel.send("Failed to delete messages.");
  }
};

module.exports = clearMsg;
