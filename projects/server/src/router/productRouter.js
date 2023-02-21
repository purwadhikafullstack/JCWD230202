const express = require("express");
const Router = express.Router();

const { productController } = require("../controller");

Router.get("/suggested", productController.getSuggested);
Router.get("/", productController.getAllProduct);
Router.get("/totalPage", productController.totalPage);
Router.get("/category", productController.getCategory);

module.exports = Router;
