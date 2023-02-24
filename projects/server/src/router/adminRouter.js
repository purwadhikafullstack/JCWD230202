const express = require("express");
const Router = express.Router();

const { adminController } = require("../controller");

Router.get("/sales-report", adminController.salesReport)    ;


module.exports = Router;
