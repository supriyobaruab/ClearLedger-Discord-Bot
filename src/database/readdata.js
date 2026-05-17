const mongodb = require("./mongodb");

const read = async (username) => {
  const data = await mongodb.aggregate([
    {
      $match: {
        user: username,
      },
    },
    {
      $group: {
        _id: "$name",
        totalAmount: {
          $sum: "$amount",
        },
      },
    },
  ]);
  //   console.log(data);
  return data;
};
module.exports = read;
