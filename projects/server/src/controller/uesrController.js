const db = require("../sequelize/models");
const HTTPStatus = require("../helper/HTTPStatus");

module.exports = {
	getUser: async (req, res) => {
		const { token } = req.headers;
		try {
			const data = await db.user.findOne({
				where: { uid: token },
			});
			const httpStatus = new HTTPStatus(res, data).success("Get user profile");
			httpStatus.send();
		} catch (error) {
			res.status(400).send({
				isError: false,
				message: error.message,
				data: error,
			});
		}
	},
	updateUser: async (req, res) => {
		const { token } = req.headers;
		const { name, birthdate, gender, email, phone_number } = req.body;
		try {
			const data = await db.user.update(
				{ name, birthdate, gender, email, phone_number },
				{
					where: { uid: token },
				}
			);
			const httpStatus = new HTTPStatus(res, data).success("Get user profile");
			httpStatus.send();
		} catch (error) {
			res.status(400).send({
				isError: false,
				message: error.message,
				data: error,
			});
		}
	},
};
