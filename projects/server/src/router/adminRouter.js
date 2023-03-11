const express = require("express");
const Router = express.Router();
const { tokenVerify } = require("../middleware/verifyToken");
const { adminController } = require("../controller");

Router.get("/sales-report", adminController.salesReport);
Router.post("/register", adminController.adminRegister);
Router.get("/branch-admin-available", adminController.getBranchAdmin);
Router.post("/login", adminController.adminLogin);
Router.get("/stock-history", tokenVerify, adminController.stockHistory);

module.exports = Router;
