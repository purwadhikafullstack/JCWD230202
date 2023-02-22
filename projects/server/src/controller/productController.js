const db = require("../sequelize/models");

module.exports = {
	getSuggested: async (req, res) => {
		const {} = req.query;
		try {
			const data = await db.discount_history.findAll({
				where: { branch_id: 1 },
				include: [
					{
						model: db.product,
					},
					{
						model: db.branch,
					},
				],
				offset: 0,
				limit: 10,
			});
			res.status(200).send({
				isError: false,
				message: "Get All Product",
				data,
			});
		} catch (error) {
			res.status(400).send({
				isError: true,
				message: error.message,
				data: error,
			});
		}
	},
	getAllProduct: async (req, res) => {
		const { page } = req.query;
		try {
			const data = await db.branch_product.findAll({
				where: { branch_id: 1 },
				include: [
					{
						model: db.product,
					},
					{ model: db.branch },
				],
				offset: page == 1 ? 0 : page * 10 - 10,
				limit: 10,
			});
			res.status(200).send({
				isError: false,
				message: "Get All Product",
				data,
			});
		} catch (error) {
			res.status(400).send({
				isError: false,
				message: error.message,
				data: error,
			});
		}
	},
	totalPage: async (req, res) => {
		const { branch } = req.query;
		try {
			const data = await db.branch_product.count({
				where: { branch_id: branch },
			});
			res.status(200).send({
				isError: false,
				message: "Get Total Page",
				data,
			});
		} catch (error) {
			res.status(400).send({
				isError: false,
				message: error.message,
				data: error,
			});
		}
	},
	getCategory: async (req, res) => {
		try {
			const data = await db.category.findAll();
			res.status(200).send({
				isError: false,
				message: "Get All Category",
				data,
			});
		} catch (error) {
			res.status(400).send({
				isError: false,
				message: error.message,
				data: error,
			});
		}
	},
};
