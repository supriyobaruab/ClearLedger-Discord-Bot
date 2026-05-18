const mongoose = require("mongoose");

const DB = async () => {
  try {
    mongoose.connect(process.env.DB);
    console.log("DB CONNECTED");
  } catch (error) {
    mongoose.disconnect();
    console.log("DB ERROR " + "error");
  }
};
module.exports = DB;
