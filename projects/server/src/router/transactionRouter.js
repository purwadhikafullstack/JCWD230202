const express = require("express");
const Router = express.Router();
const { transactionController } = require("../controller");
const { tokenVerify } = require("../middleware/verifyToken");
const upload = require("../middleware/upload");

Router.get("/", tokenVerify, transactionController.getTransaction);
Router.get("/find", tokenVerify, transactionController.findTransaction);
Router.patch("/status/received", tokenVerify, transactionController.received);
Router.patch("/status/cancel", tokenVerify, transactionController.cancel);
Router.post("/add", tokenVerify, transactionController.addTransaction)

module.exports = Router;
