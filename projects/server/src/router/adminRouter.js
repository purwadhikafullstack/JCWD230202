const express = require("express");
const Router = express.Router();
const { tokenVerify } = require("../middleware/verifyToken");
const { adminController } = require("../controller");

Router.get("/sales-report", adminController.salesReport);
Router.post("/register", adminController.adminRegister);
Router.get("/branch-admin-available", adminController.getBranchAdmin);
Router.post("/login", adminController.adminLogin);
Router.get("/stock-history", tokenVerify, adminController.stockHistory);
Router.get(
	"/branch-admin-product-list",
	tokenVerify,
	adminController.branchAdminProductList
);
Router.get("/total-page", tokenVerify, adminController.totalPageAdminProduct);
Router.get("/checkRole", tokenVerify, adminController.checkRole);
Router.get("/get-category", adminController.getCategory);
Router.get(
	"/get-product-by-category",
	tokenVerify,
	adminController.getProductByCategory
);

module.exports = Router;
