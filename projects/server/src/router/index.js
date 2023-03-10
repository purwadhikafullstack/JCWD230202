const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const adminRouter = require("./adminRouter");
const cartRouter = require("./cartRouter");
const transactionRouter = require("./transactionRouter");

module.exports = {
	// export all router here
	productRouter,
	userRouter,
	adminRouter,
	cartRouter,
	transactionRouter,
};
