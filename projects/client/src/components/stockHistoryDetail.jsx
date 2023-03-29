import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import REST_API from "../support/services/RESTApiService";
import { Tabs, Table } from "flowbite-react";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

function StockHistoryDetail(props) {
	// var productId = useParams();
	const [data, setData] = useState([]);
	const [activeTab, setActiveTab] = useState(0);
	const [tab, setTab] = useState(1);
	const [dateFrom, setDateFrom] = useState("");
	const [dateTo, setDateTo] = useState("");
	// const placementChange = (anu) => {
	// 	console.log(anu, "masuk pak ekoo");
	// 	// SetPlacement(e.target.value);
	// };
	// const placementChange1 = (anu) => {
	// 	console.log(anu, "masuk pak COK");
	// 	// SetPlacement(e.target.value);
	// };
	const tabsRef = useRef();
	let idParam = useParams();

	let onGetData = async (branchId, filter, sort) => {
		try {
			let { data } = await REST_API({
				url: `/admin/product-history-detail?ProductId=${idParam.id}&branchId=${branchId}&sort=${sort}&filter=${filter}`,
				method: "GET",
			});

			setData(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		onGetData(1, "", "");
	}, []);

	if (props.state.profile.role === "branch admin") {
		return (
			<div>
				<div className="flex gap-5 items-center">
					{data
						? data
								.map((value) => {
									return (
										<>
											<img
												className="h-40 w-40 rounded-full"
												src={value.product.img}
												alt=""
											/>
											<h1>{value.product.name}</h1>
										</>
									);
								})
								.slice(0, 1)
						: null}
				</div>
				<div className=" mt-10 flex justify-between">
					<div>
						<RangePicker
							onChange={(date) => {
								setDateFrom(date[0].toISOString().split("T")[0]);
								setDateTo(date[1].toISOString().split("T")[0]);
							}}
						/>
					</div>
					<div>
						<select
							onChange={(e) =>
								onGetData(
									tab,
									dateFrom === "" && dateTo === ""
										? ""
										: `${dateFrom}/${dateTo}`,
									e.target.value
								)
							}
							className=" w-24 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						>
							<option disabled selected>
								sort by
							</option>
							<option value="date-asc">date ascending</option>
							<option value="date-desc">date descending</option>
						</select>
					</div>
				</div>
				<div className="mt-8">
					<Table hoverable={true}>
						<Table.Head>
							<Table.HeadCell>Product name</Table.HeadCell>
							<Table.HeadCell>Stock</Table.HeadCell>
							<Table.HeadCell>Date</Table.HeadCell>
						</Table.Head>
						{data
							? data.map((value) => {
									return (
										<>
											<Table.Body className="divide-y">
												<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
													<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
														{value.product.name}
													</Table.Cell>
													<Table.Cell>{value.stock}</Table.Cell>
													<Table.Cell>
														{new Date(value.createdAt).toLocaleString("id-ID", {
															timeZone: "Asia/Jakarta",
														})}
													</Table.Cell>
												</Table.Row>
											</Table.Body>
										</>
									);
							  })
							: null}
					</Table>
				</div>
			</div>
		);
	}
	return (
		<div>
			<div className="flex gap-5 items-center">
				{data
					? data
							.map((value) => {
								return (
									<>
										<img
											className="h-40 w-40 rounded-full"
											src={value.product.img}
											alt=""
										/>
										<h1>{value.product.name}</h1>
									</>
								);
							})
							.slice(0, 1)
					: null}
			</div>
			<div className=" mt-10 flex justify-between">
				<div>
					<RangePicker
						onChange={(date) => {
							setDateFrom(date[0].toISOString().split("T")[0]);
							setDateTo(date[1].toISOString().split("T")[0]);
						}}
					/>
				</div>
				<div>
					<select
						onChange={(e) =>
							onGetData(
								tab,
								dateFrom === "" && dateTo === "" ? "" : `${dateFrom}/${dateTo}`,
								e.target.value
							)
						}
						className="w-24 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-24 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					>
						<option disabled selected>
							sort by
						</option>
						<option value="date-asc">date ascending</option>
						<option value="date-desc">date descending</option>
					</select>
				</div>
			</div>
			<div className="mt-8 flex gap-4">
				<div className="w-full">
					<Tabs.Group
						aria-label="Default tabs"
						style="underline"
						ref={tabsRef}
						onActiveTabChange={(tab) => {
							onGetData(
								tab + 1,
								dateFrom === "" && dateTo === "" ? "" : `${dateFrom}/${dateTo}`,
								""
							);
							setTab(tab + 1);
						}}
					>
						<Tabs.Item active title="Jakarta">
							<Table hoverable={true}>
								<Table.Head>
									<Table.HeadCell>Product name</Table.HeadCell>
									<Table.HeadCell>Stock</Table.HeadCell>
									<Table.HeadCell>Date</Table.HeadCell>
								</Table.Head>
								{data
									? data.map((value) => {
											return (
												<>
													<Table.Body className="divide-y">
														<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
															<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
																{value.product.name}
															</Table.Cell>
															<Table.Cell>{value.stock}</Table.Cell>
															<Table.Cell>
																{new Date(value.createdAt).toLocaleString(
																	"id-ID",
																	{
																		timeZone: "Asia/Jakarta",
																	}
																)}
															</Table.Cell>
														</Table.Row>
													</Table.Body>
												</>
											);
									  })
									: null}
							</Table>
						</Tabs.Item>
						<Tabs.Item title="Bandung">
							<Table hoverable={true}>
								<Table.Head>
									<Table.HeadCell>Product name</Table.HeadCell>
									<Table.HeadCell>Stock</Table.HeadCell>
									<Table.HeadCell>Date</Table.HeadCell>
								</Table.Head>
								{data
									? data.map((value) => {
											return (
												<>
													<Table.Body className="divide-y">
														<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
															<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
																{value.product.name}
															</Table.Cell>
															<Table.Cell>{value.stock}</Table.Cell>
															<Table.Cell>
																{new Date(value.createdAt).toLocaleString(
																	"id-ID",
																	{
																		timeZone: "Asia/Jakarta",
																	}
																)}
															</Table.Cell>
														</Table.Row>
													</Table.Body>
												</>
											);
									  })
									: null}
							</Table>
						</Tabs.Item>
						<Tabs.Item title="Yogyakarta">
							<Table hoverable={true}>
								<Table.Head>
									<Table.HeadCell>Product name</Table.HeadCell>
									<Table.HeadCell>Stock</Table.HeadCell>
									<Table.HeadCell>Date</Table.HeadCell>
								</Table.Head>
								{data
									? data.map((value) => {
											return (
												<>
													<Table.Body className="divide-y">
														<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
															<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
																{value.product.name}
															</Table.Cell>
															<Table.Cell>{value.stock}</Table.Cell>
															<Table.Cell>
																{new Date(value.createdAt).toLocaleString(
																	"id-ID",
																	{
																		timeZone: "Asia/Jakarta",
																	}
																)}
															</Table.Cell>
														</Table.Row>
													</Table.Body>
												</>
											);
									  })
									: null}
							</Table>
						</Tabs.Item>
						<Tabs.Item title="Semarang">
							<Table hoverable={true}>
								<Table.Head>
									<Table.HeadCell>Product name</Table.HeadCell>
									<Table.HeadCell>Stock</Table.HeadCell>
									<Table.HeadCell>Date</Table.HeadCell>
								</Table.Head>
								{data
									? data.map((value) => {
											return (
												<>
													<Table.Body className="divide-y">
														<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
															<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
																{value.product.name}
															</Table.Cell>
															<Table.Cell>{value.stock}</Table.Cell>
															<Table.Cell>
																{new Date(value.createdAt).toLocaleString(
																	"id-ID",
																	{
																		timeZone: "Asia/Jakarta",
																	}
																)}
															</Table.Cell>
														</Table.Row>
													</Table.Body>
												</>
											);
									  })
									: null}
							</Table>
						</Tabs.Item>
						<Tabs.Item title="Kalimantan">
							<Table hoverable={true}>
								<Table.Head>
									<Table.HeadCell>Product name</Table.HeadCell>
									<Table.HeadCell>Stock</Table.HeadCell>
									<Table.HeadCell>Date</Table.HeadCell>
								</Table.Head>
								{data
									? data.map((value) => {
											return (
												<>
													<Table.Body className="divide-y">
														<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
															<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
																{value.product.name}
															</Table.Cell>
															<Table.Cell>{value.stock}</Table.Cell>
															<Table.Cell>
																{new Date(value.createdAt).toLocaleString(
																	"id-ID",
																	{
																		timeZone: "Asia/Jakarta",
																	}
																)}
															</Table.Cell>
														</Table.Row>
													</Table.Body>
												</>
											);
									  })
									: null}
							</Table>
						</Tabs.Item>
						<Tabs.Item title="Sulawesi">
							<Table hoverable={true}>
								<Table.Head>
									<Table.HeadCell>Product name</Table.HeadCell>
									<Table.HeadCell>Stock</Table.HeadCell>
									<Table.HeadCell>Date</Table.HeadCell>
								</Table.Head>
								{data
									? data.map((value) => {
											return (
												<>
													<Table.Body className="divide-y">
														<Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
															<Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
																{value.product.name}
															</Table.Cell>
															<Table.Cell>{value.stock}</Table.Cell>
															<Table.Cell>
																{new Date(value.createdAt).toLocaleString(
																	"id-ID",
																	{
																		timeZone: "Asia/Jakarta",
																	}
																)}
															</Table.Cell>
														</Table.Row>
													</Table.Body>
												</>
											);
									  })
									: null}
							</Table>
						</Tabs.Item>
					</Tabs.Group>
				</div>
			</div>
		</div>
	);
}

export default StockHistoryDetail;
