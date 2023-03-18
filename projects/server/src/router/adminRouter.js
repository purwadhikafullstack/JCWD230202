const express = require("express");
const Router = express.Router();
const { tokenVerify } = require("../middleware/verifyToken");
const upload = require("../middleware/upload");
const {
	adminController,
	productController,
	discountController,
} = require("../controller");

Router.get("/sales-report", adminController.salesReport);
Router.post("/register", adminController.adminRegister);
Router.get("/branch-admin-available", adminController.getBranchAdmin);
Router.post("/login", adminController.adminLogin);
Router.get("/stock-history", tokenVerify, adminController.stockHistory);

// Nathan
Router.post("/create-discount", tokenVerify, discountController.createDiscount);
Router.get("/discount-list", tokenVerify, discountController.discountList);
Router.get(
	"/discount-list-sort",
	tokenVerify,
	discountController.discountListSort
);
Router.get("/discount", discountController.getDiscount);
Router.get("/search-product", discountController.searchProduct);
Router.post(
	"/create-product",
	tokenVerify,
	upload,
	productController.createProduct
);

module.exports = Router;
