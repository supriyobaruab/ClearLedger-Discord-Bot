//DB CONNECTION
const mongoose = require("mongoose");
const DB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("DB Connected");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = DB;
