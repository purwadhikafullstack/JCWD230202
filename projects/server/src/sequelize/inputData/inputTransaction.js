const db = require("../models");

(async () => {
	await db.transaction.bulkCreate([
		{
			product_name: "Pakcoy",
			qty: 200,
			price: 8000,
			branch_id: 1,
			user_id: 5,
			invoice_no: `INV/097b46c2001b/${Date.now()}`,
		},
		{
			product_name: "Labu Siam Besar",
			qty: 300,
			price: 13500,
			branch_id: 1,
			user_id: 5,
			invoice_no: `INV/097b46c2001b/${Date.now()}`,
		},
		{
			product_name: "Terong Ungu",
			qty: 400,
			price: 36000,
			branch_id: 1,
			user_id: 21,
			invoice_no: `INV/097b46c2001b/${Date.now()}`,
		},
	]);
})();
(async () => {
	await db.transaction.bulkCreate([
		{
			product_name: "Minyak Sunflower Golden Bridge",
			qty: 2,
			total_price: 2 * 79500,
			branch_id: 1,
			user_id: 11,
			invoice: `INV/097b46c2001c/${Date.now()}`,
			product_id: 150,
			status: "delivered",
		},
		{
			product_name: "Minyak Canola Golden Bridge",
			qty: 1,
			total_price: 62300,
			branch_id: 1,
			user_id: 11,
			invoice: `INV/097b46c2001c/${Date.now()}`,
			product_id: 149,
			status: "delivered",
		},
		{
			product_name: "Minyak Wijen Lee Kum Kee",
			qty: 2,
			total_price: 2 * 64900,
			branch_id: 1,
			user_id: 11,
			invoice: `INV/097b46c2001c/${Date.now()}`,
			product_id: 138,
			status: "delivered",
		},
		{
			product_name: "Buncis Organik",
			qty: 50,
			total_price: 50 * 14700,
			branch_id: 2,
			user_id: 9,
			invoice: `INV/097b46c2001b/${Date.now()}`,
			product_id: 7,
			status: "delivered",
		},
		{
			product_name: "Wortel Organik",
			qty: 50,
			total_price: 50 * 20500,
			branch_id: 2,
			user_id: 9,
			invoice: `INV/097b46c2001b/${Date.now()}`,
			product_id: 8,
			status: "delivered",
		},
	]);
})();
(async () => {
	await db.transaction.bulkCreate([
		{
			product_name: "Cabai Rawit Merah",
			qty: 300,
			price: 3 * 11200,
			branch_id: 1,
			user_id: 21,
			invoice_no: `INV/097b46c2001b/${Date.now()}`,
		},
	]);
})();
