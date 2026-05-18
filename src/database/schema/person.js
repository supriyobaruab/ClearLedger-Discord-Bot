const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema({
  userId: String,
  name: String,
  value: String,
});

module.exports = mongoose.model("People", peopleSchema);
