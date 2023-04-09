const db = require("../models");

const transaction = [];
const random = Math.floor(Math.random() * 9) + 1;
const string = [
	"Sent",
	"Waiting Payment",
	"Waiting Approval",
	"On Process",
	"Delivered",
	"Canceled",
];
(async () => {
	const status = string[Math.floor(Math.random() * 6) + 1];
	const user = await db.user.findOne({ where: { id: 5 } });
	const invoice = `INV/${user.uid.slice(-12)}/${Date.now()}`;
	const product = await db.product.findAll({
		offset: Math.floor(Math.random() * (165 - random)),
		limit: random,
	});
	product.forEach(async (value) => {
		const qty = Math.floor(Math.random() * 9) + 1;
		transaction.push({
			product_name: value.name,
			qty: value.id === 2 ? parseInt(`${qty}00`) : qty,
			total_price: value.price * qty,
			shipping_cost: 10000,
			user_address: "Jl. Jalan",
			courier: "JNE",
			invoice,
			status,
			branch_id: 1,
			user_id: user.id,
			product_id: value.id,
		});
	});
	await db.transaction.bulkCreate(transaction);
})();
// (async () => {
// 	const user = await db.user.findOne({ where: { id: 4 } });
// 	await db.transaction.bulkCreate([
// 		{
// 			product_name: "Pakcoy",
// 			qty: 200,
// 			total_price: 8000,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 1,
// 		},
// 		{
// 			product_name: "Labu Siam Besar",
// 			qty: 300,
// 			total_price: 13500,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 2,
// 		},
// 		{
// 			product_name: "Terong Ungu",
// 			qty: 400,
// 			total_price: 36000,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 3,
// 		},
// 	]);
// })();
// (async () => {
// 	await db.transaction.bulkCreate([
// 		{
// 			product_name: "Minyak Sunflower Golden Bridge",
// 			qty: 2,
// 			total_price: 2 * 79500,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 150,
// 		},
// 		{
// 			product_name: "Minyak Canola Golden Bridge",
// 			qty: 1,
// 			total_price: 62300,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 149,
// 		},
// 		{
// 			product_name: "Minyak Wijen Lee Kum Kee",
// 			qty: 2,
// 			total_price: 2 * 64900,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 138,
// 		},
// 		{
// 			product_name: "Buncis Organik",
// 			qty: 50,
// 			total_price: 50 * 14700,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 7,
// 		},
// 		{
// 			product_name: "Wortel Organik",
// 			qty: 50,
// 			total_price: 50 * 20500,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 8,
// 		},
// 	]);
// })();
// (async () => {
// 	await db.transaction.bulkCreate([
// 		{
// 			product_name: "Cabai Rawit Merah",
// 			qty: 300,
// 			total_price: 3 * 11200,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 9,
// 		},
// 	]);
// })();
// (async () => {
// 	const user = await db.user.findOne({ where: { id: 1 } });
// 	await db.transaction.bulkCreate([
// 		{
// 			product_name: "Petai Kupas",
// 			qty: 400,
// 			total_price: 25400 * 4,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 23,
// 		},
// 		{
// 			product_name: "Labu Siam Besar",
// 			qty: 300,
// 			total_price: 13500,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 2,
// 		},
// 		{
// 			product_name: "Terong Ungu",
// 			qty: 400,
// 			total_price: 36000,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 3,
// 		},
// 	]);
// })();
// (async () => {
// 	await db.transaction.bulkCreate([
// 		{
// 			product_name: "Minyak Sunflower Golden Bridge",
// 			qty: 2,
// 			total_price: 2 * 79500,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 150,
// 		},
// 		{
// 			product_name: "Minyak Canola Golden Bridge",
// 			qty: 1,
// 			total_price: 62300,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 149,
// 		},
// 		{
// 			product_name: "Minyak Wijen Lee Kum Kee",
// 			qty: 2,
// 			total_price: 2 * 64900,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 138,
// 		},
// 		{
// 			product_name: "Buncis Organik",
// 			qty: 50,
// 			total_price: 50 * 14700,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 7,
// 		},
// 		{
// 			product_name: "Wortel Organik",
// 			qty: 50,
// 			total_price: 50 * 20500,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 8,
// 		},
// 	]);
// })();
// (async () => {
// 	await db.transaction.bulkCreate([
// 		{
// 			product_name: "Cabai Rawit Merah",
// 			qty: 300,
// 			total_price: 3 * 11200,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 9,
// 		},
// 	]);
// })();
// (async () => {
// 	const user = await db.user.findOne({ where: { id: 1 } });
// 	await db.transaction.bulkCreate([
// 		{
// 			product_name: "Pakcoy",
// 			qty: 200,
// 			total_price: 8000,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 1,
// 		},
// 		{
// 			product_name: "Labu Siam Besar",
// 			qty: 300,
// 			total_price: 13500,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 2,
// 		},
// 		{
// 			product_name: "Terong Ungu",
// 			qty: 400,
// 			total_price: 36000,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 3,
// 		},
// 	]);
// })();
// (async () => {
// 	await db.transaction.bulkCreate([
// 		{
// 			product_name: "Minyak Sunflower Golden Bridge",
// 			qty: 2,
// 			total_price: 2 * 79500,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 150,
// 		},
// 		{
// 			product_name: "Minyak Canola Golden Bridge",
// 			qty: 1,
// 			total_price: 62300,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 149,
// 		},
// 		{
// 			product_name: "Minyak Wijen Lee Kum Kee",
// 			qty: 2,
// 			total_price: 2 * 64900,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 138,
// 		},
// 		{
// 			product_name: "Buncis Organik",
// 			qty: 50,
// 			total_price: 50 * 14700,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 7,
// 		},
// 		{
// 			product_name: "Wortel Organik",
// 			qty: 50,
// 			total_price: 50 * 20500,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 8,
// 		},
// 	]);
// })();
// (async () => {
// 	await db.transaction.bulkCreate([
// 		{
// 			product_name: "Cabai Rawit Merah",
// 			qty: 300,
// 			total_price: 3 * 11200,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 9,
// 		},
// 	]);
// })();
// (async () => {
// 	await db.transaction.bulkCreate([
// 		{
// 			product_name: "Cabai Rawit Merah",
// 			qty: 300,
// 			total_price: 3 * 11200,
// 			shipping_cost: 10000,
// 			user_address: "Jl. Jalan",
// 			courier: "JNE",
// 			invoice: `INV/${user.uid.slice(-12)}/${Date.now()}`,
// 			branch_id: 1,
// 			user_id: 1,
// 			product_id: 9,
// 		},
// 	]);
// })();
