const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  emp_id: {
    type: String,
    unique: true,
  },
  emp_password: {
    type: String
  },
  personal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organizations'
  }

})
const Users = mongoose.model("Users", userSchema);

module.exports = Users;