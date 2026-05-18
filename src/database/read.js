const Transaction = require("./schema/transaction");

async function read(userId) {
  try {
    const data = await Transaction.find({
      userId: userId,
    }).sort({
      createdAt: -1,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = read;
