const Users = require("../models/user.models");
const fakerUserData = require("../../Utils/faker");
const Organizations = require("../models/organizations.models");

const UserController = () => {

  const CreateUser = async (req, res) => {
    try {
      var getUserData = fakerUserData.GetUserData();
      await Users.create(getUserData).then(dbres => {
        if (dbres) {
          res.status(201).json({
            status: "ok",
            data: "User Created successfully!"
          })
        }
      })
    }
    catch (err) {
      return res.status(500).json({
        status: "not_ok",
        data: err
      })
    }
  }

  const GetUser = async (req, res) => {
    try {

      await Users.find().populate("personal").then(dbres => {
        if (dbres) {
          const personalData = dbres.map(user => user.personal);
          res.status(201).json({
            status: "ok",
            data: personalData
          })
        }
      })
    }
    catch (err) {
      return res.status(500).json({
        status: "not_ok",
        data: err
      })
    }
  }
  const GetUserByID = async (req, res) => {
    try {
      var user_id = req.params.emp_id;
      await Organizations.findOne({ "user_id": user_id }).then(dbres => {
        if (dbres) {
          res.status(201).json({
            status: "ok",
            data: dbres
          })
        }
      })
    }
    catch (err) {
      console.log(err)
      return res.status(500).json({
        status: "not_ok",
        data: err
      })
    }
  }
  const DeleteUser = async (req, res) => {
    try {
      var emp_id = req.params.emp_id;
      await Users.findOneAndDelete({ emp_id: emp_id })
      await Organizations.findOneAndDelete({ user_id: emp_id })
      res.status(201).json({
        status: "ok",
        data: "User Deleted!"
      })
    }
    catch (err) {
      return res.status(500).json({
        status: "not_ok",
        data: err
      })
    }
  }
  const UpdateUser = async (req, res) => {
    try {
      var updateData = req.body;
      let user_id = updateData.user_id;

      const Org_filter = { user_id: user_id };

      const options = { upsert: true, new: true };

      const updateOrg = {
        $set: updateData,
      };
      const result = await Organizations.findOneAndUpdate(Org_filter, updateOrg, options);
      var user_data = {
        "emp_id": user_id,
        "emp_password": user_id,
        "personal": result._id
      }

      var userData = await Users.findOne({ emp_id: user_id })
      if (!userData) {
        const User_filter = { emp_id: user_id };
        const user = await Users.findOneAndUpdate(User_filter, user_data, options);
      }
      res.status(201).json({
        status: "ok",
        data: "User updated successfully!"
      })
    }
    catch (err) {
      console.log(err)
      return res.status(500).json({
        status: "not_ok",
        data: err
      })
    }
  }



  return {
    CreateUser,
    GetUser,
    DeleteUser,
    UpdateUser,
    GetUserByID
  }

}
module.exports = UserController();