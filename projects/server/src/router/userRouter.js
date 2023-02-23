const express = require("express");
const { userController } = require("../controller");
const Router = express.Router();
const { tokenVerify } = require("../middleware/verifyToken");

Router.get("/profile", userController.getUser);
Router.patch("/edit", userController.updateUser);

module.exports = Router;
