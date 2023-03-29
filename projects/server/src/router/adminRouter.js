const express = require("express");
const Router = express.Router();
const { tokenVerify } = require("../middleware/verifyToken");
const upload = require("../middleware/upload");
const {
	adminController,
	productController,
	discountController,
} = require("../controller");

Router.get("/sales-report", tokenVerify, adminController.salesReport);
Router.get("/sales-report-detail", adminController.salesReportDetail);
Router.post("/register", tokenVerify, adminController.adminRegister);
Router.get(
	"/branch-admin-available",
	tokenVerify,
	adminController.getBranchAdmin
);
Router.post("/login", adminController.adminLogin);
// Router.get("/stock-history", tokenVerify, adminController.stockHistory);
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
Router.get("/history-stock", tokenVerify, adminController.stockHistory2);
Router.get(
	"/product-history-detail",
	tokenVerify,
	adminController.stockHistoryDetail
);

module.exports = Router;
