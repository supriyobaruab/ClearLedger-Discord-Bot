const Transaction = require("./schema/transaction");

async function write(data) {
  try {
    await Transaction.create({
      userId: data.userId,
      username: data.username,
      person: data.person,
      amount: data.amount,
      desc: data.desc,
    });

    console.log("Transaction Added");
  } catch (error) {
    console.log(error);
  }
}

module.exports = write;
