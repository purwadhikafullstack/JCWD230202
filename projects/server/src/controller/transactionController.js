const db = require("../sequelize/models");
const HTTPStatus = require("../helper/HTTPStatus");
const { Op } = require("sequelize");
const { sequelize } = require("../sequelize/models");

module.exports = {
	getTransaction: async (req, res) => {
		const { uid } = req.uid;
		const { status } = req.query;
		try {
			const { id } = await db.user.findOne({ where: { uid } });
			let where;
			if (status == 0) where = { user_id: id };
			if (status == 1)
				where = { [Op.and]: [{ user_id: id }, { status: "Waiting Payment" }] };
			if (status == 2)
				where = {
					[Op.and]: [
						{ user_id: id },
						{
							[Op.or]: [
								{ status: "Waiting Approval" },
								{ status: "On Process" },
								{ status: "Sent" },
							],
						},
					],
				};
			if (status == 3)
				where = { [Op.and]: [{ user_id: id }, { status: "Delivered" }] };
			if (status == 4)
				where = { [Op.and]: [{ user_id: id }, { status: "Canceled" }] };

			const data = await db.transaction.findAll({
				attributes: [
					"invoice",
					"createdAt",
					"status",
					"product_name",
					[sequelize.fn("SUM", sequelize.col("total_price")), "total_price"],
					[sequelize.fn("COUNT", sequelize.col("product_name")), "total_item"],
				],
				where,
				include: [{ model: db.branch }, { model: db.product }],
				group: "invoice",
				order: [["createdAt", "ASC"]],
			});
			new HTTPStatus(res, data).success("Get all transaction").send();
		} catch (error) {
			new HTTPStatus(res, error).error(error.message, 400).send();
		}
	},
	findTransaction: async (req, res) => {
		const { invoice } = req.query;
		try {
			const data = await db.transaction.findAll({
				where: { invoice },
				include: [
					{ model: db.product, include: { model: db.unit } },
					{ model: db.user, attributes: ["name"] },
				],
			});
			new HTTPStatus(res, data).success("Find transaction by invoice").send();
		} catch (error) {
			new HTTPStatus(res, error).error(error.message).send();
		}
	},
	cancel: async (req, res) => {
		const { uid } = req.uid;
		const { invoice } = req.body;
		const t1 = await sequelize.transaction();
		try {
			const { id } = await db.user.findOne({ where: { uid } });
			const result = await db.transaction.findAll({
				where: { invoice },
			});
			result.map(async (value) => {
				const t = await sequelize.transaction();
				try {
					const { stock } = await db.branch_product.findOne({
						where: {
							[Op.and]: [
								{ branch_id: value.branch_id },
								{ product_id: value.product_id },
							],
						},
					});

					await db.branch_product.update(
						{ stock: stock + value.qty },
						{
							where: {
								[Op.and]: [
									{ branch_id: value.branch_id },
									{ product_id: value.product_id },
								],
							},
						},
						{ transaction: t }
					);
					await db.stock_history.create(
						{
							stock: stock + value.qty,
							branch_id: value.branch_id,
							product_id: value.product_id,
						},
						{ transaction: t }
					);
					t.commit();
				} catch (error) {
					t.rollback();
				}
			});
			await db.transaction_history.create(
				{ status: "Canceled", invoice },
				{ transaction: t1 }
			);
			await db.transaction.update(
				{ status: "Canceled" },
				{ where: { [Op.and]: [{ user_id: id }, { invoice }] } },
				{ transaction: t1 }
			);
			t1.commit();
			new HTTPStatus(res).success("Status changed to canceled").send();
		} catch (error) {
			t1.rollback();
			new HTTPStatus(res, error).error(error.message, 400).send();
		}
	},
	received: async (req, res) => {
		const { uid } = req.uid;
		const { invoice } = req.body;
		const t = await sequelize.transaction();
		try {
			const { id } = await db.user.findOne({ where: { uid } });

			await db.transaction_history.create(
				{ status: "Received", invoice },
				{ transaction: t }
			);
			await db.transaction.update(
				{ status: "Received" },
				{ where: { [Op.and]: [{ user_id: id }, { invoice }] } },
				{ transaction: t }
			);
			t.commit();
			const httpStatus = new HTTPStatus(res)
				.success("Status changed to received")
				.send();
		} catch (error) {
			t.rollback();
			const httpStatus = new HTTPStatus(res, error)
				.error(error.message, 400)
				.send();
		}
	},
	// getTransactionAdmin:(req,res)=>{
	// 	const transaction = await db.transaction.findAll({group:"invoice"})
	// 	transaction.forEach(async(value,index)=>{
	// 		const detail = await db.transaction.findAll({where:{invoice:value.invoice}})
	// 		transaction[index].append(detail)
	// 	})
	// 	new HTTPStatus(res,transaction).success("Get all transaction admin").send()
	// }
};
