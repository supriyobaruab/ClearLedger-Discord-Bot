const Transaction = require("./schema/transaction");

async function read(username) {
  try {
    const data = await Transaction.find({
      username: username,
    }).sort({
      createdAt: -1,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = read;
