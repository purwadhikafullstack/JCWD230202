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
Router.patch(
	"/edit-category-image/:id",
	tokenVerify,
	adminController.updateCategoryImage
);
Router.patch(
	"/edit-category-data/:id",
	tokenVerify,
	adminController.updateCategoryData
);
Router.get(
	"/get-edited-category",
	tokenVerify,
	productController.getCategoryEdit
);
Router.patch(
	"/approve-discount",
	tokenVerify,
	discountController.approveDiscount
);
Router.patch(
	"/decline-discount",
	tokenVerify,
	discountController.declineDiscount
);
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
Router.delete(
	"/delete-product/:id",
	tokenVerify,
	productController.deleteProduct
);
Router.delete(
	"/delete-category/:id",
	tokenVerify,
	productController.deleteCategory
);
Router.get("/get-product-edit", tokenVerify, adminController.getProductEdit);
Router.patch(
	"/edit-product",
	tokenVerify,
	upload,
	productController.editProduct
);
Router.get("/unit", productController.getUnit);

module.exports = Router;
