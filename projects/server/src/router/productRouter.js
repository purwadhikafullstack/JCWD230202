const express = require("express");
const Router = express.Router();

const { productController } = require("../controller");
const { tokenVerify } = require("../middleware/verifyToken");

Router.get("/suggested", tokenVerify, productController.getSuggested);
Router.get("/foryou", tokenVerify, productController.getRandom);
Router.get("/totalPage", productController.totalPage);
Router.get("/category", productController.getCategory);
Router.get("/detail", productController.product_detail);
Router.get("/pageCategory", productController.totalPageCategory);
Router.get("/getallproduct", productController.getAllUnit);
Router.get("/sortby", productController.sortby);
Router.get("/nearest", tokenVerify, productController.getNearestBranchProduct);

module.exports = Router;
