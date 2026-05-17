const mongodb = require("./mongodb");
const write = async (msg) => {
  try {
    await mongodb.create({
      name: msg.name,
      amount: msg.amount,
      description: msg.desc,
      user: msg.user,
    });
  } catch (error) {}
};

module.exports = write;
