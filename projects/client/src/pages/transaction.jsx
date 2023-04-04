import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Tabs, Badge, Modal } from "flowbite-react";
import REST_API from "../support/services/RESTApiService";

export default function Transaction(props) {
	const [transaction, settransaction] = useState(null);
	const [selected, setselected] = useState();
	const [show, setshow] = useState(false);

	const getTransaction = async (status) => {
		try {
			const { data } = await REST_API({
				url: `/transaction?status=${status}`,
				method: "GET",
			});
			settransaction(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const cancel = async (invoice) => {
		try {
			await REST_API({
				url: `/transaction/status/cancel`,
				method: "PATCH",
				data: { invoice },
			});
			toast.success("Transaction canceled");
			getTransaction();
		} catch (error) {
			toast.error("Something went wrong");
			console.log(error);
		}
	};
	const received = async (invoice) => {
		try {
			await REST_API({
				url: `/transaction/status/received`,
				method: "PATCH",
				data: { invoice },
			});
			toast.success("Pakage received");
			getTransaction();
		} catch (error) {
			toast.error("Something went wrong");
			console.log(error);
		}
	};

	const findTransaction = async (invoice) => {
		try {
			const { data } = await REST_API({
				url: `/transaction/find?invoice=${invoice}`,
				method: "GET",
			});
			// console.log(data.data);
			setselected(data.data);
			setshow(true);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getTransaction(0);
		props.state.setselected("transaction");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			{console.log(selected)}
			<div className="flex justify-center font-tokpedFont">
				<div className="max-w-screen-xl w-full p-8">
					<h1 className="pb-8 text-2xl font-semibold text-gray-500">
						Transaction List
					</h1>
					<Tabs.Group
						aria-label="Default tabs"
						onActiveTabChange={(e) => getTransaction(e)}
					>
						<Tabs.Item active={true} title="All transaction">
							{transaction?.length !== 0 ? (
								transaction?.map((value, index) => {
									return (
										<button
											onClick={() => findTransaction(value.invoice)}
											className="p-6 mt-5 flex bg-white border border-gray-200 rounded-lg shadow w-full"
											key={index}
										>
											<img
												src={value.product.img}
												alt=""
												className="h-32 w-32 object-cover rounded-lg mr-5"
											/>
											<div className="w-full">
												<div className="flex items-center space-x-2 mb-2 text-gray-500">
													<p>{value.createdAt.split("T")[0]}</p>
													<p className="text-xs my-1">{value.invoice}</p>
												</div>
												<div className="grid grid-cols-5">
													<div className="flex flex-col items-start col-span-4">
														{value.total_item === 1 ? (
															<h5 className="text-xl font-bold tracking-tight text-gray-500">
																{value.product_name}
															</h5>
														) : (
															<>
																<h5 className="text-xl font-bold tracking-tight text-gray-500">
																	{value.product_name}
																</h5>
																<h4 className="text-gray-500 text-xs">
																	+ {value.total_item - 1} item
																</h4>
															</>
														)}
														<div className="w-fit py-1 rounded-lg mt-2s">
															<Badge
																color={
																	value.status === "Delivered"
																		? "info"
																		: value.status === "Waiting Payment" ||
																		  "Sent" ||
																		  "On Process" ||
																		  "Waiting Approval"
																		? "warning"
																		: value.status === "Canceled"
																		? "failure"
																		: ""
																}
															>
																{value.status}
															</Badge>
														</div>
													</div>
													<div className="col-span-1 flex flex-col items-end justify-center border-l-[1px]">
														<p className="text-sm text-gray-500">Total price</p>
														<p>
															Rp. {parseInt(value.total_price).toLocaleString()}
														</p>
													</div>
												</div>
												<div className="flex justify-end">
													{value.status === "Waiting Payment" ? (
														<div className="space-x-5">
															<button className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-[#0095da] rounded-lg hover:bg-blue-800">
																Upload payment proof
															</button>
															<button
																onClick={() => cancel(value.invoice)}
																className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center border-[1px] text-red-900 border-[#0095da] bg-white rounded-lg hover:bg-blue-100"
															>
																Cancel
															</button>
														</div>
													) : value.status === "Sent" ? (
														<button
															onClick={() => received(value.invoice)}
															className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
														>
															Received
														</button>
													) : null}
												</div>
											</div>
										</button>
									);
								})
							) : (
								<div>
									<img
										src={require("../support/assets/49e58d5922019b8ec4642a2e2b9291c2.png")}
										alt="no transaction found"
										className="w-full z-50"
									/>
								</div>
							)}
						</Tabs.Item>
						<Tabs.Item title="Waiting payment">
							{transaction?.length !== 0 ? (
								transaction?.map((value, index) => {
									return (
										<div
											onClick={() => findTransaction(value.invoice)}
											className="p-6 mt-5 flex bg-white border border-gray-200 rounded-lg shadow w-full"
											key={index}
										>
											<img
												src={value.product.img}
												alt=""
												className="h-32 w-32 object-cover rounded-lg mr-5"
											/>
											<div className="w-full">
												<div className="flex items-center space-x-2 mb-2 text-gray-500">
													<p>{value.createdAt.split("T")[0]}</p>
													<p className="text-xs my-1">{value.invoice}</p>
												</div>
												<div className="grid grid-cols-5">
													<div className="flex flex-col items-start col-span-4">
														{value.total_item === 1 ? (
															<h5 className="text-xl font-bold tracking-tight text-gray-500">
																{value.product_name}
															</h5>
														) : (
															<>
																<h5 className="text-xl font-bold tracking-tight text-gray-500">
																	{value.product_name}
																</h5>
																<h4 className="text-gray-500 text-xs">
																	+ {value.total_item - 1} item
																</h4>
															</>
														)}
														<div className="w-fit py-1 rounded-lg mt-2s">
															<Badge
																color={
																	value.status === "Delivered"
																		? "info"
																		: value.status === "Waiting Payment" ||
																		  "Sent" ||
																		  "On Process" ||
																		  "Waiting Approval"
																		? "warning"
																		: value.status === "Canceled"
																		? "failure"
																		: ""
																}
															>
																{value.status}
															</Badge>
														</div>
													</div>
													<div className="col-span-1 flex flex-col items-end justify-center border-l-[1px]">
														<p className="text-sm text-gray-500">Total price</p>
														<p>
															Rp. {parseInt(value.total_price).toLocaleString()}
														</p>
													</div>
												</div>
												<div className="flex justify-end">
													{value.status === "Waiting Payment" ? (
														<div className="space-x-5">
															<button className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-[#0095da] rounded-lg hover:bg-blue-800">
																Upload payment proof
															</button>
															<button
																onClick={() => cancel(value.invoice)}
																className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center border-[1px] text-red-900 border-[#0095da] bg-white rounded-lg hover:bg-blue-100"
															>
																Cancel
															</button>
														</div>
													) : value.status === "Sent" ? (
														<button
															onClick={() => received(value.invoice)}
															className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
														>
															Received
														</button>
													) : null}
												</div>
											</div>
										</div>
									);
								})
							) : (
								<div>
									<img
										src={require("../support/assets/49e58d5922019b8ec4642a2e2b9291c2.png")}
										alt="no transaction found"
										className="w-full z-50"
									/>
								</div>
							)}
						</Tabs.Item>
						<Tabs.Item title="On going">
							{transaction?.length !== 0 ? (
								transaction?.map((value, index) => {
									return (
										<div
											onClick={() => findTransaction(value.invoice)}
											className="p-6 mt-5 flex bg-white border border-gray-200 rounded-lg shadow w-full"
											key={index}
										>
											<img
												src={value.product.img}
												alt=""
												className="h-32 w-32 object-cover rounded-lg mr-5"
											/>
											<div className="w-full">
												<div className="flex items-center space-x-2 mb-2 text-gray-500">
													<p>{value.createdAt.split("T")[0]}</p>
													<p className="text-xs my-1">{value.invoice}</p>
												</div>
												<div className="grid grid-cols-5">
													<div className="flex flex-col items-start col-span-4">
														{value.total_item === 1 ? (
															<h5 className="text-xl font-bold tracking-tight text-gray-500">
																{value.product_name}
															</h5>
														) : (
															<>
																<h5 className="text-xl font-bold tracking-tight text-gray-500">
																	{value.product_name}
																</h5>
																<h4 className="text-gray-500 text-xs">
																	+ {value.total_item - 1} item
																</h4>
															</>
														)}
														<div className="w-fit py-1 rounded-lg mt-2s">
															<Badge
																color={
																	value.status === "Delivered"
																		? "info"
																		: value.status === "Waiting Payment" ||
																		  "Sent" ||
																		  "On Process" ||
																		  "Waiting Approval"
																		? "warning"
																		: value.status === "Canceled"
																		? "failure"
																		: ""
																}
															>
																{value.status}
															</Badge>
														</div>
													</div>
													<div className="col-span-1 flex flex-col items-end justify-center border-l-[1px]">
														<p className="text-sm text-gray-500">Total price</p>
														<p>
															Rp. {parseInt(value.total_price).toLocaleString()}
														</p>
													</div>
												</div>
												<div className="flex justify-end">
													{value.status === "Waiting Payment" ? (
														<div className="space-x-5">
															<button className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-[#0095da] rounded-lg hover:bg-blue-800">
																Upload payment proof
															</button>
															<button
																onClick={() => cancel(value.invoice)}
																className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center border-[1px] text-red-900 border-[#0095da] bg-white rounded-lg hover:bg-blue-100"
															>
																Cancel
															</button>
														</div>
													) : value.status === "Sent" ? (
														<button
															onClick={() => received(value.invoice)}
															className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
														>
															Received
														</button>
													) : null}
												</div>
											</div>
										</div>
									);
								})
							) : (
								<div>
									<img
										src={require("../support/assets/49e58d5922019b8ec4642a2e2b9291c2.png")}
										alt="no transaction found"
										className="w-full z-50"
									/>
								</div>
							)}
						</Tabs.Item>
						<Tabs.Item title="Done">
							{transaction?.length !== 0 ? (
								transaction?.map((value, index) => {
									return (
										<div
											onClick={() => findTransaction(value.invoice)}
											className="p-6 mt-5 flex bg-white border border-gray-200 rounded-lg shadow w-full"
											key={index}
										>
											<img
												src={value.product.img}
												alt=""
												className="h-32 w-32 object-cover rounded-lg mr-5"
											/>
											<div className="w-full">
												<div className="flex items-center space-x-2 mb-2 text-gray-500">
													<p>{value.createdAt.split("T")[0]}</p>
													<p className="text-xs my-1">{value.invoice}</p>
												</div>
												<div className="grid grid-cols-5">
													<div className="flex flex-col items-start col-span-4">
														{value.total_item === 1 ? (
															<h5 className="text-xl font-bold tracking-tight text-gray-500">
																{value.product_name}
															</h5>
														) : (
															<>
																<h5 className="text-xl font-bold tracking-tight text-gray-500">
																	{value.product_name}
																</h5>
																<h4 className="text-gray-500 text-xs">
																	+ {value.total_item - 1} item
																</h4>
															</>
														)}
														<div className="w-fit py-1 rounded-lg mt-2s">
															<Badge
																color={
																	value.status === "Delivered"
																		? "info"
																		: value.status === "Waiting Payment" ||
																		  "Sent" ||
																		  "On Process" ||
																		  "Waiting Approval"
																		? "warning"
																		: value.status === "Canceled"
																		? "failure"
																		: ""
																}
															>
																{value.status}
															</Badge>
														</div>
													</div>
													<div className="col-span-1 flex flex-col items-end justify-center border-l-[1px]">
														<p className="text-sm text-gray-500">Total price</p>
														<p>
															Rp. {parseInt(value.total_price).toLocaleString()}
														</p>
													</div>
												</div>
												<div className="flex justify-end">
													{value.status === "Waiting Payment" ? (
														<div className="space-x-5">
															<button className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-[#0095da] rounded-lg hover:bg-blue-800">
																Upload payment proof
															</button>
															<button
																onClick={() => cancel(value.invoice)}
																className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center border-[1px] text-red-900 border-[#0095da] bg-white rounded-lg hover:bg-blue-100"
															>
																Cancel
															</button>
														</div>
													) : value.status === "Sent" ? (
														<button
															onClick={() => received(value.invoice)}
															className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
														>
															Received
														</button>
													) : null}
												</div>
											</div>
										</div>
									);
								})
							) : (
								<div>
									<img
										src={require("../support/assets/49e58d5922019b8ec4642a2e2b9291c2.png")}
										alt="no transaction found"
										className="w-full z-50"
									/>
								</div>
							)}
						</Tabs.Item>
						<Tabs.Item title="Canceled">
							{transaction?.length !== 0 ? (
								transaction?.map((value, index) => {
									return (
										<div
											onClick={() => findTransaction(value.invoice)}
											className="p-6 mt-5 flex bg-white border border-gray-200 rounded-lg shadow w-full"
											key={index}
										>
											<img
												src={value.product.img}
												alt=""
												className="h-32 w-32 object-cover rounded-lg mr-5"
											/>
											<div className="w-full">
												<div className="flex items-center space-x-2 mb-2 text-gray-500">
													<p>{value.createdAt.split("T")[0]}</p>
													<p className="text-xs my-1">{value.invoice}</p>
												</div>
												<div className="grid grid-cols-5">
													<div className="flex flex-col items-start col-span-4">
														{value.total_item === 1 ? (
															<h5 className="text-xl font-bold tracking-tight text-gray-500">
																{value.product_name}
															</h5>
														) : (
															<>
																<h5 className="text-xl font-bold tracking-tight text-gray-500">
																	{value.product_name}
																</h5>
																<h4 className="text-gray-500 text-xs">
																	+ {value.total_item - 1} item
																</h4>
															</>
														)}
														<div className="w-fit py-1 rounded-lg mt-2s">
															<Badge
																color={
																	value.status === "Delivered"
																		? "info"
																		: value.status === "Waiting Payment" ||
																		  "Sent" ||
																		  "On Process" ||
																		  "Waiting Approval"
																		? "warning"
																		: value.status === "Canceled"
																		? "failure"
																		: ""
																}
															>
																{value.status}
															</Badge>
														</div>
													</div>
													<div className="col-span-1 flex flex-col items-end justify-center border-l-[1px]">
														<p className="text-sm text-gray-500">Total price</p>
														<p>
															Rp. {parseInt(value.total_price).toLocaleString()}
														</p>
													</div>
												</div>
												<div className="flex justify-end">
													{value.status === "Waiting Payment" ? (
														<div className="space-x-5">
															<button className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-[#0095da] rounded-lg hover:bg-blue-800">
																Upload payment proof
															</button>
															<button
																onClick={() => cancel(value.invoice)}
																className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center border-[1px] text-red-900 border-[#0095da] bg-white rounded-lg hover:bg-blue-100"
															>
																Cancel
															</button>
														</div>
													) : value.status === "Sent" ? (
														<button
															onClick={() => received(value.invoice)}
															className="inline-flex items-center mt-4 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
														>
															Received
														</button>
													) : null}
												</div>
											</div>
										</div>
									);
								})
							) : (
								<div>
									<img
										src={require("../support/assets/49e58d5922019b8ec4642a2e2b9291c2.png")}
										alt="no transaction found"
										className="w-full z-50"
									/>
								</div>
							)}
						</Tabs.Item>
					</Tabs.Group>
				</div>
				<Toaster />
			</div>
			<Modal
				show={show}
				size="2xl"
				onClose={() => setshow(false)}
				id="transaction detail modal"
			>
				<Modal.Header>
					<p>Transaction Detail</p>
				</Modal.Header>
				<Modal.Body>
					<div className="mx-2">
						<div className="border-b-8 pb-3">
							<p className="font-bold tracking-wide">
								{selected ? selected[0].status : null}
							</p>
							<hr />
							<div className="flex justify-between">
								<p>Invoice</p>
								<p>{selected ? selected[0].invoice : null}</p>
							</div>
							<div className="flex justify-between">
								<p>Date</p>
								<p>
									{selected
										? `${new Date(selected[0].createdAt).toLocaleString(
												"id-ID",
												{
													timeZone: "Asia/Jakarta",
													dateStyle: "long",
												}
										  )},
										  ${new Date(selected[0].createdAt).toLocaleString("id-ID", {
												timeZone: "Asia/Jakarta",
												timeStyle: "short",
											})} WIB`
										: null}
								</p>
							</div>
						</div>
						<div className="pt-5 space-y-3 border-b-8 pb-3">
							<p className="font-bold">Product Details</p>
							{selected?.map((value, index) => {
								return (
									<div
										onClick={() => findTransaction(value.invoice)}
										className="p-6 flex bg-white border border-gray-200 rounded-lg shadow w-full"
										key={index}
									>
										<img
											src={value.product.img}
											alt=""
											className="w-14 h-14 object-cover rounded-lg mr-5"
										/>
										<div className="w-full">
											<div className="grid grid-cols-5">
												<div className="flex flex-col items-start col-span-4">
													<h5 className="font-bold tracking-tight text-gray-500">
														{value.product_name}
													</h5>
													<p className="text-sm font-light">
														{selected
															? `
															${value.qty / value.product.unit.price_at} (@${value.product.unit.price_at}${
																	value.product.unit.name
															  }) x ${value.product.price}
															`
															: null}
													</p>
												</div>
												<div className="col-span-1 flex flex-col items-end justify-center border-l-[1px]">
													<p className="text-sm text-gray-500">Total price</p>
													<p>
														Rp. {parseInt(value.total_price).toLocaleString()}
													</p>
												</div>
											</div>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}
