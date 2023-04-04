const express = require("express");
const Router = express.Router();
const { transactionController } = require("../controller");
const { tokenVerify } = require("../middleware/verifyToken");
const upload = require("../middleware/upload");

Router.get("/", tokenVerify, transactionController.getTransaction);
Router.get("/find", tokenVerify, transactionController.findTransaction);
Router.patch("/status/received", tokenVerify, transactionController.received);
Router.patch("/status/cancel", tokenVerify, transactionController.cancel);
Router.post("/add", tokenVerify, transactionController.addTransaction);
Router.get("/try", tokenVerify, transactionController.tryEventScheduler);

module.exports = Router;

// DELIMITER |
// CREATE EVENT test
// 	ON SCHEDULE AT NOW() + INTERVAL 10 SECOND
// 	DO
// BEGIN
// 	UPDATE toko.transaction SET status = "Expired" WHERE invoice = "11111";
//     INSERT INTO toko.transaction_history(status,invoice,createdAt) VALUES("Expired","11111",NOW());
//     UPDATE toko.branch_product SET stock = 11111 WHERE branch_id = 1 AND product_id = 1;
//     UPDATE toko.branch_product SET stock = 22222 WHERE branch_id = 1 AND product_id = 2;
//     UPDATE toko.branch_product SET stock = 33333 WHERE branch_id = 1 AND product_id = 3;
// 	INSERT INTO toko.stock_history(stock,createdAt,branch_id,product_id) VALUES(11111,NOW(),1,1);
// 	INSERT INTO toko.stock_history(stock,createdAt,branch_id,product_id) VALUES(22222,NOW(),1,2);
// 	INSERT INTO toko.stock_history(stock,createdAt,branch_id,product_id) VALUES(33333,NOW(),1,3);
// END |
// DELIMITER ;
