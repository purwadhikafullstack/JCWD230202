const db = require("../models");

(async () => {
	await db.user.bulkCreate([
		{
			name: "nathan",
			email: "nathan@gmail.com",
			password: "asdfasdf12341234",
			phone_number: 123412341,
		},
		{
			name: "nathan",
			email: "nathan@gmail.com",
			password: "asdfasdf12341234",
			phone_number: 123412341,
		},
		{
			name: "nathan",
			email: "nathan@gmail.com",
			password: "asdfasdf12341234",
			phone_number: 123412341,
		},
		{
			name: "nathan",
			email: "nathan@gmail.com",
			password: "asdfasdf12341234",
			phone_number: 123412341,
		},
	]);
})();
