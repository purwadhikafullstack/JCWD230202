import React, { useEffect, useState } from "react";
import { Dropdown, Tabs } from "flowbite-react";
import REST_API from "../support/services/RESTApiService";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster, toast } from "react-hot-toast";

export default function SuperAdminDiscountManagement() {
	const [all, setall] = useState();

	const getAllDiscount = async (status) => {
		try {
			const { data } = await REST_API({
				url: `/admin/discount-list?status=${status}`,
				method: "GET",
			});
			setall(data.data);
		} catch (error) {}
	};
	const sortBy = async (sort, name) => {
		try {
			const { data } = await REST_API({
				url: `/admin/discount-list-sort?name=${name ? name : ""}&sort=${sort}`,
				method: "GET",
			});
			setall(data.data);
		} catch (error) {}
	};

	const approveDiscount = async (id) => {
		try {
			await REST_API({
				url: "/admin/approve-discount",
				method: "PATCH",
				data: { id },
			});
			getAllDiscount(1);
			toast.success("Discount Active");
		} catch (error) {
			console.log(error);
		}
	};
	const declineDiscount = async (id) => {
		try {
			await REST_API({
				url: "/admin/decline-discount",
				method: "PATCH",
				data: { id },
			});
			toast.success("Discount Declined");
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getAllDiscount(0);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<>
			<div className="p-10 relative">
				<Tabs.Group
					aria-label="Default tabs"
					className=" max-w-screen-xl"
					onActiveTabChange={(e) => getAllDiscount(e)}
				>
					<Tabs.Item active={true} title="All Discount">
						<div className="rounded-lg max-w-screen-xl relative">
							<div className="sticky w-full max-w-screen-xl grid grid-cols-6 bg-[#0095da] text-white px-3 rounded-md text-lg py-2 z-40">
								<Dropdown label="Type" inline={true}>
									<Dropdown.Item onClick={() => sortBy("type-asc")}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("type-desc")}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<Dropdown label="Minimum Purchase" inline={true}>
									<Dropdown.Item onClick={() => sortBy("min_purchase-asc")}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("min_purchase-desc")}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<Dropdown label="Percent(%)" inline={true}>
									<Dropdown.Item onClick={() => sortBy("percent-asc")}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("percent-desc")}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<Dropdown label="Product" inline={true}>
									<Dropdown.Item onClick={() => sortBy("asc", 1)}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("desc", 1)}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<Dropdown label="Expired" inline={true}>
									<Dropdown.Item onClick={() => sortBy("expired-asc")}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("expired-desc")}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<p className="inline">Status</p>
							</div>
							<div className="space-y-2 pt-4 max-w-screen-xl w-full">
								{all?.map((value, index) => {
									return (
										<div
											className="grid grid-cols-6 border-[2px] px-2 py-1 rounded-md"
											key={index}
										>
											<h3 className="w-full">
												{value.discount_id === 1
													? "BUY 1 GET 1"
													: value.discount_id === 2
													? "Minimum Purchased"
													: "Custom Discount"}
											</h3>
											<h3 className="w-full">{value.min_purchase}</h3>
											<h3 className="w-full">{value.percent}</h3>
											<h3 className="w-full">{value.product.name}</h3>
											<h3 className="w-full">{value.expired}</h3>
											<h3 className="w-full">{value.status}</h3>
										</div>
									);
								})}
							</div>
						</div>
					</Tabs.Item>
					<Tabs.Item title="Waiting Approval">
						<div className="rounded-lg max-w-screen-xl relative">
							<div className="sticky w-full max-w-screen-xl grid grid-cols-6 bg-[#0095da] text-white px-3 rounded-md text-lg py-2 z-40">
								<Dropdown label="Type" inline={true}>
									<Dropdown.Item onClick={() => sortBy("type-asc")}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("type-desc")}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<Dropdown label="Minimum Purchase" inline={true}>
									<Dropdown.Item onClick={() => sortBy("min_purchase-asc")}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("min_purchase-desc")}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<Dropdown label="Percent(%)" inline={true}>
									<Dropdown.Item onClick={() => sortBy("percent-asc")}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("percent-desc")}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<Dropdown label="Product" inline={true}>
									<Dropdown.Item onClick={() => sortBy("asc", 1)}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("desc", 1)}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<Dropdown label="Expired" inline={true}>
									<Dropdown.Item onClick={() => sortBy("expired-asc")}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("expired-desc")}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<p className="inline">Action</p>
							</div>
							<div className="space-y-2 pt-4 max-w-screen-xl w-full">
								{all?.map((value, index) => {
									return (
										<div
											className="grid grid-cols-6 border-[2px] px-2 py-1 rounded-md"
											key={index}
										>
											<h3 className="w-full">
												{value.discount_id === 1
													? "BUY 1 GET 1"
													: value.discount_id === 2
													? "Minimum Purchased"
													: "Custom Discount"}
											</h3>
											<h3 className="w-full">{value.min_purchase}</h3>
											<h3 className="w-full">{value.percent}</h3>
											<h3 className="w-full">{value.product.name}</h3>
											<h3 className="w-full">{value.expired}</h3>
											<div className="flex space-x-2">
												<button
													onClick={() => approveDiscount(value.id)}
													className="bg-[#0095da] px-2 rounded-md text-white"
												>
													Approve
												</button>
												<button
													onClick={() => declineDiscount(value.id)}
													className="bg-red-500 px-2 rounded-md text-white"
												>
													Decline
												</button>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</Tabs.Item>
					<Tabs.Item title="Active">
						<div className="rounded-lg max-w-screen-xl relative">
							<div className="sticky w-full max-w-screen-xl grid grid-cols-5 bg-[#0095da] text-white px-3 rounded-md text-lg py-2 z-40">
								<Dropdown label="Type" inline={true}>
									<Dropdown.Item onClick={() => sortBy("type-asc")}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("type-desc")}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<Dropdown label="Minimum Purchase" inline={true}>
									<Dropdown.Item onClick={() => sortBy("min_purchase-asc")}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("min_purchase-desc")}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<Dropdown label="Percent(%)" inline={true}>
									<Dropdown.Item onClick={() => sortBy("percent-asc")}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("percent-desc")}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<Dropdown label="Product" inline={true}>
									<Dropdown.Item onClick={() => sortBy("asc", 1)}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("desc", 1)}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<Dropdown label="Expired" inline={true}>
									<Dropdown.Item onClick={() => sortBy("expired-asc")}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("expired-desc")}>
										Descending
									</Dropdown.Item>
								</Dropdown>
							</div>
							<div className="space-y-2 pt-4 max-w-screen-xl w-full">
								{all?.map((value, index) => {
									return (
										<div
											className="grid grid-cols-5 border-[2px] px-2 py-1 rounded-md"
											key={index}
										>
											<h3 className="w-full">
												{value.discount_id === 1
													? "BUY 1 GET 1"
													: value.discount_id === 2
													? "Minimum Purchased"
													: "Custom Discount"}
											</h3>
											<h3 className="w-full">{value.min_purchase}</h3>
											<h3 className="w-full">{value.percent}</h3>
											<h3 className="w-full">{value.product.name}</h3>
											<h3 className="w-full">{value.expired}</h3>
										</div>
									);
								})}
							</div>
						</div>
					</Tabs.Item>
					<Tabs.Item title="Declined">
						<div className="rounded-lg max-w-screen-xl relative">
							<div className="sticky w-full max-w-screen-xl grid grid-cols-5 bg-[#0095da] text-white px-3 rounded-md text-lg py-2 z-40">
								<Dropdown label="Type" inline={true}>
									<Dropdown.Item onClick={() => sortBy("type-asc")}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("type-desc")}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<Dropdown label="Minimum Purchase" inline={true}>
									<Dropdown.Item onClick={() => sortBy("min_purchase-asc")}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("min_purchase-desc")}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<Dropdown label="Percent(%)" inline={true}>
									<Dropdown.Item onClick={() => sortBy("percent-asc")}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("percent-desc")}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<Dropdown label="Product" inline={true}>
									<Dropdown.Item onClick={() => sortBy("asc", 1)}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("desc", 1)}>
										Descending
									</Dropdown.Item>
								</Dropdown>
								<Dropdown label="Expired" inline={true}>
									<Dropdown.Item onClick={() => sortBy("expired-asc")}>
										Ascending
									</Dropdown.Item>
									<Dropdown.Item onClick={() => sortBy("expired-desc")}>
										Descending
									</Dropdown.Item>
								</Dropdown>
							</div>
							<div className="space-y-2 pt-4 max-w-screen-xl w-full">
								{all?.map((value, index) => {
									return (
										<div
											className="grid grid-cols-5 border-[2px] px-2 py-1 rounded-md"
											key={index}
										>
											<h3 className="w-full">
												{value.discount_id === 1
													? "BUY 1 GET 1"
													: value.discount_id === 2
													? "Minimum Purchased"
													: "Custom Discount"}
											</h3>
											<h3 className="w-full">{value.min_purchase}</h3>
											<h3 className="w-full">{value.percent}</h3>
											<h3 className="w-full">{value.product.name}</h3>
											<h3 className="w-full">{value.expired}</h3>
										</div>
									);
								})}
							</div>
						</div>
					</Tabs.Item>
				</Tabs.Group>
			</div>
			<Toaster />
		</>
	);
}
