const express = require("express");
const { userController } = require("../controller");
const Router = express.Router();
const { tokenVerify } = require("../middleware/verifyToken");
const upload = require("../middleware/upload");

Router.get("/profile", userController.getUser);
Router.patch("/profile/picture", userController.editProfilePic);
Router.patch("/edit", userController.updateUser);
Router.post("/register", userController.register);
Router.post("/login", userController.login);
Router.post("/keep-login", tokenVerify, userController.keepLogin);
Router.patch("/activation/:uid", userController.activation);
Router.patch("/reset-password/:uid", userController.resetPassword);
Router.post("/forgot-password", userController.forgotPassword);

module.exports = Router;
