import { Card, Modal, Table } from "flowbite-react";
import { TabList, TabPanel, TabPanels, Tabs, Tab, Avatar } from "@chakra-ui/react";
import { useState } from "react";
import PaymentProof from "../support/assets/buktitf.png";
import swal from "sweetalert";


export default function TransactionAdmin() {
	const [show, setShow] = useState(false);
	return (
		<div className=" py-10 h-fit px-8 mr-8">
			<div>
				<div className="mb-4 flex items-center justify-between">
					<h5 className="text-xl font-semibold font-tokpedFont">
						Transaction List
					</h5>
				</div>
				<Tabs>
					<TabList
						display="flex"
						justifyContent="space-around"
						fontWeight={"semibold"}
						color={"#0095DA"}
					>
						<Tab fontSize={"20px"}>Waiting</Tab>
						<Tab fontSize={"20px"}>Process</Tab>
						<Tab fontSize={"20px"}>Done</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>

							{/* WAITING TAB START HERE */}
							<Tabs>
								<TabList fontWeight="semibold" color={"#38ADE3"} gap={5}>
									<Tab
										mb={2}
										_selected={{ bg: "#38ADE3", color: "white", borderRadius: "md" }}
										fontSize={"16px"}
									>
										Payment
									</Tab>
									<Tab
										mb={2}
										_selected={{ bg: "#38ADE3", color: "white", borderRadius: "md" }}
										fontSize={"16px"}
									>
										Approve
									</Tab>
								</TabList>
								<TabPanels>
									{/* WAITING PAYMENT START HERE */}
									<TabPanel>
										<div className=" border-b-8 pb-5 mb-5">
											<Card>
												<div className=" flex justify-between">
													<div className=" ml-5 flex gap-2 flex-row items-center">
														<Avatar bg={"teal.500"} size="sm" />
														<p className=" font-tokpedFont text-[16px] font-semibold ">Branz</p>
													</div>
													<div className=" mr-11">
														<p className=" font-semibold font-tokpedFont text-[14px]">
															INV/1bfc8fdd81f1/1680117877602
														</p>
														<div className=" flex gap-2 items-center">
															<p className="font-tokpedFont font-semibold text-[14px]">Status :</p>{" "}
															<p className="  text-white bg-orange-400 font-tokpedFont rounded-full text-[12px] font-semibold p-1">
																Waiting Payment
															</p>
														</div>
													</div>
												</div>
												<div className=" font-tokpedFont mt-4">
													<div className=" pb-5 border-b flex gap-7">
														<div className=" w-full">
															<Table className="text-center">
																<Table.Head>
																	<Table.HeadCell>No.</Table.HeadCell>
																	<Table.HeadCell>Product Name</Table.HeadCell>
																	<Table.HeadCell>Quantity</Table.HeadCell>
																	<Table.HeadCell>Price</Table.HeadCell>
																	<Table.HeadCell>Total Price</Table.HeadCell>
																</Table.Head>
																<Table.Body>
																	<Table.Row>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/70000600018_1_20022023084852.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Tahu Cina Manalagi</p>{" "}
																		</Table.Cell>
																		<Table.Cell>5</Table.Cell>
																		<Table.Cell>Rp. 5,000</Table.Cell>
																		<Table.Cell>Rp. 25,000</Table.Cell>
																	</Table.Row>
																	<Table.Row>
																		<Table.Cell>2</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/10006400027_03012023103425.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Pakcoy Hidroponik Segari</p>{" "}
																		</Table.Cell>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell>Rp. 11,800 </Table.Cell>
																		<Table.Cell>Rp. 11,800</Table.Cell>
																	</Table.Row>
																	<Table.Row>
																		<Table.Cell>3</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/20000300003_1_21022023124159.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Apel Fuji</p>{" "}
																		</Table.Cell>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell>Rp. 35,500</Table.Cell>
																		<Table.Cell>Rp. 35,500</Table.Cell>
																	</Table.Row>
																</Table.Body>
															</Table>
														</div>
														<div className="pt-2 font-tokpedFont font-semibold">
															<p>Courier</p>
															<div className=" flex justify-between mt-3 w-[270px] h-[60px] px-[15px] py-3 items-center border rounded-lg">
																<div className=" text-left ">
																	<p className=" font-bold font-tokpedFont text-[12px]">POS</p>
																	<p className=" font-tokpedFont text-slate-500 text text-[12px]">
																		Estimasi Hari 4-5
																	</p>
																</div>
																<p className=" text-[14px] font-semibold font-tokpedFont">
																	Rp. 10,000
																</p>
															</div>
															<div className=" mt-10">
																<p>Total Payment</p>
																<div className=" text-right flex mt-3 w-[270px] h-[60px] px-[15px] py-3 items-center border rounded-lg">
																	<p className=" font-tokpedFont font-semibold text-[18px]">
																		Rp. 82,300
																	</p>
																</div>
															</div>
														</div>
													</div>
												</div>
											</Card>

										</div>
									</TabPanel>
									{/* WAITING PAYMENT END HERE */}
									{/* WAITING APPROVE START HERE */}
									<TabPanel>
										<div className=" border-b-8 pb-5 mb-5">
											<Card>
												<div className=" flex justify-between">
													<div className=" ml-5 flex gap-2 flex-row items-center">
														<Avatar bg={"teal.500"} size="sm" />
														<p className=" font-tokpedFont text-[16px] font-semibold ">Branz</p>
													</div>
													<div className=" mr-11">
														<p className=" font-semibold font-tokpedFont text-[14px]">
															INV/1bfc8fdd81f1/1680117877602
														</p>
														<div className=" flex gap-2 items-center">
															<p className="font-tokpedFont font-semibold text-[14px]">Status :</p>{" "}
															<p className="  text-white bg-yellow-400 font-tokpedFont rounded-full text-[12px] font-semibold p-1">
																Waiting Approvement
															</p>
														</div>
													</div>
												</div>
												<div className=" font-tokpedFont mt-4">
													<div className=" pb-5 border-b flex gap-7">
														<div className=" w-full">
															<Table className="text-center">
																<Table.Head>
																	<Table.HeadCell>No.</Table.HeadCell>
																	<Table.HeadCell>Product Name</Table.HeadCell>
																	<Table.HeadCell>Quantity</Table.HeadCell>
																	<Table.HeadCell>Price</Table.HeadCell>
																	<Table.HeadCell>Total Price</Table.HeadCell>
																</Table.Head>
																<Table.Body>
																	<Table.Row>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/70000600018_1_20022023084852.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Tahu Cina Manalagi</p>{" "}
																		</Table.Cell>
																		<Table.Cell>5</Table.Cell>
																		<Table.Cell>Rp. 5,000</Table.Cell>
																		<Table.Cell>Rp. 25,000</Table.Cell>
																	</Table.Row>
																	<Table.Row>
																		<Table.Cell>2</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/10006400027_03012023103425.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Pakcoy Hidroponik Segari</p>{" "}
																		</Table.Cell>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell>Rp. 11,800 </Table.Cell>
																		<Table.Cell>Rp. 11,800</Table.Cell>
																	</Table.Row>
																	<Table.Row>
																		<Table.Cell>3</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/20000300003_1_21022023124159.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Apel Fuji</p>{" "}
																		</Table.Cell>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell>Rp. 35,500</Table.Cell>
																		<Table.Cell>Rp. 35,500</Table.Cell>
																	</Table.Row>
																</Table.Body>
															</Table>
														</div>
														<div className="pt-2 font-tokpedFont font-semibold">
															<p>Courier</p>
															<div className=" flex justify-between mt-3 w-[270px] h-[60px] px-[15px] py-3 items-center border rounded-lg">
																<div className=" text-left ">
																	<p className=" font-bold font-tokpedFont text-[12px]">POS</p>
																	<p className=" font-tokpedFont text-slate-500 text text-[12px]">
																		Estimasi Hari 4-5
																	</p>
																</div>
																<p className=" text-[14px] font-semibold font-tokpedFont">
																	Rp. 10,000
																</p>
															</div>
															<div className=" mt-10">
																<p>Total Payment</p>
																<div className=" text-right flex mt-3 w-[270px] h-[60px] px-[15px] py-3 items-center border rounded-lg">
																	<p className=" font-tokpedFont font-semibold text-[18px]">
																		Rp. 82,300
																	</p>
																</div>
															</div>
															<div className=" mt-6">
																<button
																	onClick={() => setShow(true)}
																	className=" hover:bg-gray-300 text-center w-full bg-yellow-400 rounded-full text-white font-tokpedFont font-semibold p-3"
																>
																	Check Payment
																</button>
															</div>
														</div>
													</div>
												</div>
											</Card>
										</div>
									</TabPanel>
									{/* WAITING APPROVE END HERE */}
								</TabPanels>
							</Tabs>
							{/* WAITING TAB END HERE */}
						</TabPanel>
						<TabPanel>

							{/* PROCESS TAB START HERE */}
							<Tabs>
								<TabList fontWeight="semibold" color={"#38ADE3"} gap={5}>
									<Tab
										mb={2}
										_selected={{ bg: "#38ADE3", color: "white", borderRadius: "md" }}
										fontSize={"16px"}
									>
										Packing
									</Tab>
									<Tab
										mb={2}
										_selected={{ bg: "#38ADE3", color: "white", borderRadius: "md" }}
										fontSize={"16px"}
									>
										Sending
									</Tab>
								</TabList>
								<TabPanels>
									{/* PACKING ORDER START HERE */}
									<TabPanel>
										<div className=" border-b-8 pb-5 mb-5">
											<Card>
												<div className=" flex justify-between">
													<div className=" ml-5 flex gap-2 flex-row items-center">
														<Avatar bg={"teal.500"} size="sm" />
														<p className=" font-tokpedFont text-[16px] font-semibold ">Branz</p>
													</div>
													<div className=" mr-11">
														<p className=" font-semibold font-tokpedFont text-[14px]">
															INV/1bfc8fdd81f1/1680117877602
														</p>
														<div className=" flex gap-2 items-center">
															<p className="font-tokpedFont font-semibold text-[14px]">Status :</p>{" "}
															<p className="  text-white bg-blue-400 rounded-full font-tokpedFont text-[12px] font-semibold p-1">
																Packing Orders
															</p>
														</div>
													</div>
												</div>
												<div className=" font-tokpedFont mt-4">
													<div className=" pb-5 border-b flex gap-7">
														<div className=" w-full">
															<Table className="text-center">
																<Table.Head>
																	<Table.HeadCell>No.</Table.HeadCell>
																	<Table.HeadCell>Product Name</Table.HeadCell>
																	<Table.HeadCell>Quantity</Table.HeadCell>
																	<Table.HeadCell>Price</Table.HeadCell>
																	<Table.HeadCell>Total Price</Table.HeadCell>
																</Table.Head>
																<Table.Body>
																	<Table.Row>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/70000600018_1_20022023084852.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Tahu Cina Manalagi</p>{" "}
																		</Table.Cell>
																		<Table.Cell>5</Table.Cell>
																		<Table.Cell>Rp. 5,000</Table.Cell>
																		<Table.Cell>Rp. 25,000</Table.Cell>
																	</Table.Row>
																	<Table.Row>
																		<Table.Cell>2</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/10006400027_03012023103425.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Pakcoy Hidroponik Segari</p>{" "}
																		</Table.Cell>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell>Rp. 11,800 </Table.Cell>
																		<Table.Cell>Rp. 11,800</Table.Cell>
																	</Table.Row>
																	<Table.Row>
																		<Table.Cell>3</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/20000300003_1_21022023124159.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Apel Fuji</p>{" "}
																		</Table.Cell>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell>Rp. 35,500</Table.Cell>
																		<Table.Cell>Rp. 35,500</Table.Cell>
																	</Table.Row>
																</Table.Body>
															</Table>
														</div>
														<div className="pt-2 font-tokpedFont font-semibold">
															<p>Courier</p>
															<div className=" flex justify-between mt-3 w-[270px] h-[60px] px-[15px] py-3 items-center border rounded-lg">
																<div className=" text-left ">
																	<p className=" font-bold font-tokpedFont text-[12px]">POS</p>
																	<p className=" font-tokpedFont text-slate-500 text text-[12px]">
																		Estimasi Hari 4-5
																	</p>
																</div>
																<p className=" text-[14px] font-semibold font-tokpedFont">
																	Rp. 10,000
																</p>
															</div>
															<div className=" mt-10">
																<p>Total Payment</p>
																<div className=" text-right flex mt-3 w-[270px] h-[60px] px-[15px] py-3 items-center border rounded-lg">
																	<p className=" font-tokpedFont font-semibold text-[18px]">
																		Rp. 82,300
																	</p>
																</div>
															</div>
															<div className=" mt-6">
																<button className=" text-center w-full bg-blue-400 rounded-full text-white font-tokpedFont font-semibold p-3">
																	Send Order
																</button>
															</div>
														</div>
													</div>
												</div>
											</Card>

										</div>
									</TabPanel>
									{/* PACKING ORDER END HERE */}
									{/* SENDING ORDER START HERE */}
									<TabPanel>
										<div className=" border-b-8 pb-5 mb-5">
											<Card>
												<div className=" flex justify-between">
													<div className=" ml-5 flex gap-2 flex-row items-center">
														<Avatar bg={"teal.500"} size="sm" />
														<p className=" font-tokpedFont text-[16px] font-semibold ">Branz</p>
													</div>
													<div className=" mr-11">
														<p className=" font-semibold font-tokpedFont text-[14px]">
															INV/1bfc8fdd81f1/1680117877602
														</p>
														<div className=" flex gap-2 items-center">
															<p className="font-tokpedFont font-semibold text-[14px]">Status :</p>{" "}
															<p className="  text-white bg-cyan-600 rounded-full font-tokpedFont text-[12px] font-semibold p-1">
																Sending Orders
															</p>
														</div>
													</div>
												</div>
												<div className=" font-tokpedFont mt-4">
													<div className=" pb-5 border-b flex gap-7">
														<div className=" w-full">
															<Table className="text-center">
																<Table.Head>
																	<Table.HeadCell>No.</Table.HeadCell>
																	<Table.HeadCell>Product Name</Table.HeadCell>
																	<Table.HeadCell>Quantity</Table.HeadCell>
																	<Table.HeadCell>Price</Table.HeadCell>
																	<Table.HeadCell>Total Price</Table.HeadCell>
																</Table.Head>
																<Table.Body>
																	<Table.Row>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/70000600018_1_20022023084852.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Tahu Cina Manalagi</p>{" "}
																		</Table.Cell>
																		<Table.Cell>5</Table.Cell>
																		<Table.Cell>Rp. 5,000</Table.Cell>
																		<Table.Cell>Rp. 25,000</Table.Cell>
																	</Table.Row>
																	<Table.Row>
																		<Table.Cell>2</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/10006400027_03012023103425.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Pakcoy Hidroponik Segari</p>{" "}
																		</Table.Cell>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell>Rp. 11,800 </Table.Cell>
																		<Table.Cell>Rp. 11,800</Table.Cell>
																	</Table.Row>
																	<Table.Row>
																		<Table.Cell>3</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/20000300003_1_21022023124159.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Apel Fuji</p>{" "}
																		</Table.Cell>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell>Rp. 35,500</Table.Cell>
																		<Table.Cell>Rp. 35,500</Table.Cell>
																	</Table.Row>
																</Table.Body>
															</Table>
														</div>
														<div className="pt-2 font-tokpedFont font-semibold">
															<p>Courier</p>
															<div className=" flex justify-between mt-3 w-[270px] h-[60px] px-[15px] py-3 items-center border rounded-lg">
																<div className=" text-left ">
																	<p className=" font-bold font-tokpedFont text-[12px]">POS</p>
																	<p className=" font-tokpedFont text-slate-500 text text-[12px]">
																		Estimasi Hari 4-5
																	</p>
																</div>
																<p className=" text-[14px] font-semibold font-tokpedFont">
																	Rp. 10,000
																</p>
															</div>
															<div className=" mt-10">
																<p>Total Payment</p>
																<div className=" text-right flex mt-3 w-[270px] h-[60px] px-[15px] py-3 items-center border rounded-lg">
																	<p className=" font-tokpedFont font-semibold text-[18px]">
																		Rp. 82,300
																	</p>
																</div>
															</div>
														</div>
													</div>
												</div>
											</Card>
										</div>
									</TabPanel>
									{/* SENDING ORDER END HERE */}
								</TabPanels>
							</Tabs>
							{/* PROCESS TAB END HERE */}
						</TabPanel>
						<TabPanel>

							{/* DONE TAB START HERE */}
							<Tabs>
								<TabList fontWeight="semibold" color={"#38ADE3"} gap={5}>
									<Tab
										mb={2}
										_selected={{ bg: "#38ADE3", color: "white", borderRadius: "md" }}
										fontSize={"16px"}
									>
										Delivered
									</Tab>
									<Tab
										mb={2}
										_selected={{ bg: "#38ADE3", color: "white", borderRadius: "md" }}
										fontSize={"16px"}
									>
										Canceled
									</Tab>
								</TabList>
								<TabPanels>
									{/* DELIVERED START HERE */}
									<TabPanel>
										<div className=" border-b-8 pb-5 mb-5">
											<Card>
												<div className=" flex justify-between">
													<div className=" ml-5 flex gap-2 flex-row items-center">
														<Avatar bg={"teal.500"} size="sm" />
														<p className=" font-tokpedFont text-[16px] font-semibold ">Branz</p>
													</div>
													<div className=" mr-11">
														<p className=" font-semibold font-tokpedFont text-[14px]">
															INV/1bfc8fdd81f1/1680117877602
														</p>
														<div className=" flex gap-2 items-center">
															<p className="font-tokpedFont font-semibold text-[14px]">Status :</p>{" "}
															<p className="  text-white bg-green-600 rounded-full font-tokpedFont text-[12px] font-semibold p-1">
																Delivered
															</p>
														</div>
													</div>
												</div>
												<div className=" font-tokpedFont mt-4">
													<div className=" pb-5 border-b flex gap-7">
														<div className=" w-full">
															<Table className="text-center">
																<Table.Head>
																	<Table.HeadCell>No.</Table.HeadCell>
																	<Table.HeadCell>Product Name</Table.HeadCell>
																	<Table.HeadCell>Quantity</Table.HeadCell>
																	<Table.HeadCell>Price</Table.HeadCell>
																	<Table.HeadCell>Total Price</Table.HeadCell>
																</Table.Head>
																<Table.Body>
																	<Table.Row>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/70000600018_1_20022023084852.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Tahu Cina Manalagi</p>{" "}
																		</Table.Cell>
																		<Table.Cell>5</Table.Cell>
																		<Table.Cell>Rp. 5,000</Table.Cell>
																		<Table.Cell>Rp. 25,000</Table.Cell>
																	</Table.Row>
																	<Table.Row>
																		<Table.Cell>2</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/10006400027_03012023103425.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Pakcoy Hidroponik Segari</p>{" "}
																		</Table.Cell>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell>Rp. 11,800 </Table.Cell>
																		<Table.Cell>Rp. 11,800</Table.Cell>
																	</Table.Row>
																	<Table.Row>
																		<Table.Cell>3</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/20000300003_1_21022023124159.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Apel Fuji</p>{" "}
																		</Table.Cell>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell>Rp. 35,500</Table.Cell>
																		<Table.Cell>Rp. 35,500</Table.Cell>
																	</Table.Row>
																</Table.Body>
															</Table>
														</div>
														<div className="pt-2 font-tokpedFont font-semibold">
															<p>Courier</p>
															<div className=" flex justify-between mt-3 w-[270px] h-[60px] px-[15px] py-3 items-center border rounded-lg">
																<div className=" text-left ">
																	<p className=" font-bold font-tokpedFont text-[12px]">POS</p>
																	<p className=" font-tokpedFont text-slate-500 text text-[12px]">
																		Estimasi Hari 4-5
																	</p>
																</div>
																<p className=" text-[14px] font-semibold font-tokpedFont">
																	Rp. 10,000
																</p>
															</div>
															<div className=" mt-10">
																<p>Total Payment</p>
																<div className=" text-right flex mt-3 w-[270px] h-[60px] px-[15px] py-3 items-center border rounded-lg">
																	<p className=" font-tokpedFont font-semibold text-[18px]">
																		Rp. 82,300
																	</p>
																</div>
															</div>
														</div>
													</div>
												</div>
											</Card>
										</div>
									</TabPanel>
									{/* DELIVERED END HERE */}
									{/* CANCELED START HERE */}
									<TabPanel>
										<div className=" border-b-8 pb-5 mb-5">
											<Card>
												<div className=" flex justify-between">
													<div className=" ml-5 flex gap-2 flex-row items-center">
														<Avatar bg={"teal.500"} size="sm" />
														<p className=" font-tokpedFont text-[16px] font-semibold ">Branz</p>
													</div>
													<div className=" mr-11">
														<p className=" font-semibold font-tokpedFont text-[14px]">
															INV/1bfc8fdd81f1/1680117877602
														</p>
														<div className=" flex gap-2 items-center">
															<p className="font-tokpedFont font-semibold text-[14px]">Status :</p>{" "}
															<p className="  text-white bg-red-600 rounded-full font-tokpedFont text-[12px] font-semibold p-1">
																Canceled
															</p>
														</div>
													</div>
												</div>
												<div className=" font-tokpedFont mt-4">
													<div className=" pb-5 border-b flex gap-7">
														<div className=" w-full">
															<Table className="text-center">
																<Table.Head>
																	<Table.HeadCell>No.</Table.HeadCell>
																	<Table.HeadCell>Product Name</Table.HeadCell>
																	<Table.HeadCell>Quantity</Table.HeadCell>
																	<Table.HeadCell>Price</Table.HeadCell>
																	<Table.HeadCell>Total Price</Table.HeadCell>
																</Table.Head>
																<Table.Body>
																	<Table.Row>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/70000600018_1_20022023084852.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Tahu Cina Manalagi</p>{" "}
																		</Table.Cell>
																		<Table.Cell>5</Table.Cell>
																		<Table.Cell>Rp. 5,000</Table.Cell>
																		<Table.Cell>Rp. 25,000</Table.Cell>
																	</Table.Row>
																	<Table.Row>
																		<Table.Cell>2</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/10006400027_03012023103425.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Pakcoy Hidroponik Segari</p>{" "}
																		</Table.Cell>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell>Rp. 11,800 </Table.Cell>
																		<Table.Cell>Rp. 11,800</Table.Cell>
																	</Table.Row>
																	<Table.Row>
																		<Table.Cell>3</Table.Cell>
																		<Table.Cell className=" flex flex-row gap-3 justify-start items-center">
																			<img
																				alt="product_image"
																				src="https://assets.segari.id/products/20000300003_1_21022023124159.webp"
																				className=" h-[60px] w-[60px] rounded-full"
																			/>{" "}
																			<p>Apel Fuji</p>{" "}
																		</Table.Cell>
																		<Table.Cell>1</Table.Cell>
																		<Table.Cell>Rp. 35,500</Table.Cell>
																		<Table.Cell>Rp. 35,500</Table.Cell>
																	</Table.Row>
																</Table.Body>
															</Table>
														</div>
														<div className="pt-2 font-tokpedFont font-semibold">
															<p>Courier</p>
															<div className=" flex justify-between mt-3 w-[270px] h-[60px] px-[15px] py-3 items-center border rounded-lg">
																<div className=" text-left ">
																	<p className=" font-bold font-tokpedFont text-[12px]">POS</p>
																	<p className=" font-tokpedFont text-slate-500 text text-[12px]">
																		Estimasi Hari 4-5
																	</p>
																</div>
																<p className=" text-[14px] font-semibold font-tokpedFont">
																	Rp. 10,000
																</p>
															</div>
															<div className=" mt-10">
																<p>Total Payment</p>
																<div className=" text-right flex mt-3 w-[270px] h-[60px] px-[15px] py-3 items-center border rounded-lg">
																	<p className=" font-tokpedFont font-semibold text-[18px]">
																		Rp. 82,300
																	</p>
																</div>
															</div>
														</div>
													</div>
												</div>
											</Card>
										</div>
									</TabPanel>
									{/* CANCELED END HERE */}
								</TabPanels>
							</Tabs>
							{/* DONE TAB END HERE */}

						</TabPanel>
					</TabPanels>
				</Tabs>
				<Modal
					show={show}
					size="md"
					popup={true}
					onClose={() => setShow(false)}
				>
					<Modal.Header />
					<div className=" flex justify-center items-center p-5">
						<img className="h-[600px]" alt="Payment Proof" src={PaymentProof} />
					</div>
					<div className=" flex justify-center pb-5 gap-4">
						<button
							onClick={() => setShow(false)}
							className=" border rounded-full p-2 bg-green-400 text-white font-tokpedFont font-semibold hover:bg-gray-300"
						>
							Accept Order
						</button>
						<button
							onClick={() => setShow(false)}
							className=" border rounded-full p-2 bg-red-400 text-white font-tokpedFont font-semibold hover:bg-gray-300"
						>
							Cancel Order
						</button>
					</div>
				</Modal>
			</div>
		</div>
	);
}
