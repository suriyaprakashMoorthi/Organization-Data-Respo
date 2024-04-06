const express = require("express")
const router = express.Router();
const UserController = require("../controllers/Users.controller");

router.post("/add", UserController.CreateUser)
router.get("/all", UserController.GetUser)
router.delete("/deleteUser/:emp_id", UserController.DeleteUser)
router.get("/getuser/:emp_id", UserController.GetUserByID)
router.post("/update", UserController.UpdateUser)

// router.post("/login", UserController.GetUser);

module.exports = router;