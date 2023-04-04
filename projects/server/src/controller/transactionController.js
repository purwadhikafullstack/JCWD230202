const db = require("../sequelize/models");
const HTTPStatus = require("../helper/HTTPStatus");
const { Op } = require("sequelize");
const { sequelize } = require("../sequelize/models");
const moment = require("moment");

module.exports = {
	tryEventScheduler: async (req, res) => {
		const { uid } = req.uid;
		let query = "";
		try {
			const transaction = await db.transaction.bulkCreate([
				{
					product_name: "Pakcoy",
					qty: 200,
					total_price: 8000,
					shipping_cost: 1000,
					user_address: "Jl. Jalan",
					courier: "JNE",
					invoice: `INV/${uid.slice(-12)}/${Date.now()}`,
					status: "Waiting Payment",
					branch_id: 1,
					user_id: 21,
					product_id: 1,
				},
				{
					product_name: "Labu Siam Besar",
					qty: 300,
					total_price: 13500,
					shipping_cost: 1000,
					user_address: "Jl. Jalan",
					courier: "JNE",
					invoice: `INV/${uid.slice(-12)}/${Date.now()}`,
					status: "Waiting Payment",
					branch_id: 1,
					user_id: 21,
					product_id: 1,
				},
			]);

			transaction.forEach(async (element) => {
				const { stock } = await db.branch_product.findOne({
					where: {
						[Op.and]: [
							{ branch_id: element.branch_id },
							{ product_id: element.product_id },
						],
					},
				});
				console.log(stock);

				// query.push("12");
				query += "test";
				console.log(query);

				// query += `INSERT INTO toko.stock_history(stock,createdAt,branch_id,product_id) VALUES(${
				// 	element.invoice
				// },NOW(),${element.branch_id},${element.product_id});
				// 	UPDATE toko.branch_product SET stock = ${
				// 		stock + element.qty
				// 	} WHERE branch_id = ${element.branch_id} AND product_id = ${
				// 	element.product_id
				// };`;
			});

			// sequelize.query(`DELIMITER |
			// CREATE EVENT ${transaction[0].invoice}
			// 	ON SCHEDULE AT ${transaction[0].createdAt} + INTERVAL 1 MINUTE
			// 	DO
			// BEGIN
			// 	UPDATE toko.transaction SET status = "Expired" WHERE invoice = ${transaction[0].invoice};
			// 	INSERT INTO toko.transaction_history(status,invoice,createdAt) VALUES("Expired",${transaction[0].invoice},NOW());
			// 	${query}
			// END |
			// DELIMITER ;`);
			res.status(200).send("test");
			// new HTTPStatus(res, query).success("Event Created").send();
		} catch (error) {
			new HTTPStatus(res, error).error(error.message).send();
		}
	},
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
	addTransaction: async (req, res) => {
		const { uid } = req.uid;
		const {
			product_name,
			qty,
			total_price,
			user_address,
			courier,
			branch_id,
			product_id,
		} = req.body;
		const t = await sequelize.transaction();
		try {
			const { id } = await db.user.findOne({ where: { uid } });
			for (let i = 0; i < qty.length; i++) {
				try {
					const t1 = await sequelize.transaction();
					const { stock } = await db.branch_product.findOne({
						where: {
							[Op.and]: [
								{ branch_id: branch_id },
								{ product_id: product_id[i] },
							],
						},
					});
					await db.branch_product.update(
						{ stock: stock - qty[i] },
						{
							where: {
								[Op.and]: [
									{ branch_id: branch_id },
									{ product_id: product_id[i] },
								],
							},
						},
						{ transaction: t1 }
					);
					await db.stock_history.create(
						{
							stock: stock - qty[i],
							branch_id: branch_id,
							product_id: product_id[i],
						},
						{ transaction: t1 }
					);
					t1.commit();
				} catch (error) {
					t1.rollback();
				}
			}

			let dataToSend = [];
			const invoice = `INV/${uid.slice(-12)}/${Date.now()}`;
			let status = "Waiting Payment";
			for (let i = 0; i < product_name.length; i++) {
				dataToSend.push({
					product_name: product_name[i],
					qty: qty[i],
					total_price: total_price[i],
					user_address: user_address,
					courier: courier,
					branch_id: branch_id,
					product_id: product_id[i],
					invoice: invoice,
					user_id: id,
					status: status,
					expired: moment().add(2, "hour").toDate(),
				});
			}

			let data = await db.transaction.bulkCreate(dataToSend, {
				transaction: t,
			});
			await db.transaction_history.create(
				{ status: status, invoice: invoice },
				{ transaction: t }
			);
			// await db.cart.destroy({
			// 	where: { user_id: id },
			// });

			let Loader = "";
			for (let i = 0; i < qty.length; i++) {
				const { stock } = await db.branch_product.findOne({
					where: {
						[Op.and]: [{ branch_id: branch_id }, { product_id: product_id[i] }],
					},
				});

				Loader += `INSERT INTO stock_history (stock, branch_id, product_id) VALUES(${
					stock + qty[i]
				}, ${branch_id}, ${product_id[i]}); UPDATE branch_product SET stock = ${
					stock + qty[i]
				} WHERE branch_id = ${branch_id} AND product_id = ${product_id[i]};`;
			}

			await sequelize.query(
				`DELIMETER |
				CREATE EVENT expired_${
					invoice.split("/")[2]
				} ON SCHEDULE AT NOW() + INTERVAL 1 MINUTE 
				DO 
				BEGIN
				UPDATE transaction SET status = "Canceled" WHERE invoice = ${invoice} AND payment_proof IS NULL;
				INSERT INTO transaction_history (status, invoice) VALUES ("Canceled", ${invoice}); 
				${Loader} 
				END |
				DELIMETER ;
				`
			);

			t.commit();
			res.status(201).send({
				isError: false,
				message: "Add Transaction Success",
				data: data,
			});
		} catch (error) {
			t.rollback();
			res.status(500).send({
				isError: true,
				message: error.message,
				data: error,
			});
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
