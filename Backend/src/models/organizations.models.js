const mongoose = require("mongoose");

const OrganizationsSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true,
  },
  emp_firstname: {
    type: String,
  },
  emp_lastname: {
    type: String
  },
  emp_dob: {
    type: String
  },
  emp_email: {
    type: String
  },
  emp_address: {
    type: String
  },
  emp_role: {
    type: String,
    require: true
  },

  emp_department: {
    type: String
  },
  is_delete: {
    type: String
  },

})

const Organizations = mongoose.model("Organizations", OrganizationsSchema);
module.exports = Organizations;