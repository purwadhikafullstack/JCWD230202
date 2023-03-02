import React from "react";
import { useState } from "react";
import anjing from "../support/assets/carousel/anjing.jpg";
import axios from "axios";
import { useEffect } from "react";
import REST_API from "../support/services/RESTApiService";

export default function LandingPage() {
	const [product, setproduct] = useState();
	const [page, setpage] = useState();
	const [selectedpage, setselectedpage] = useState();
	const [category, setcategory] = useState();

	const getCategory = async () => {
		const { data } = await REST_API().get("/product/category");
		setcategory(data.data);
	};
	const getTotalPage = async (branch) => {
		try {
			const { data } = await axios.get(`http://localhost:8000/product/totalPage?branch=${branch}`);
			const totalPage = [];
			for (let i = 1; i <= data.data / 10; i++) {
				totalPage.push(i);
			}
			setpage(totalPage);
		} catch (error) {
			console.log(error);
		}
	};
	const getAllProduct = async (page) => {
		try {
			const { data } = await axios.get(`http://localhost:8000/product?page=${page}`);
			setproduct(data.data);
			setselectedpage(page);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getAllProduct(1);
		getTotalPage(1);
		getCategory();
	}, []);
	return (
		<div className="pt-20 max-w-screen-xl mx-auto font-tokpedFont">
			<div className="flex justify-center">
				<img src={anjing} alt="banner" className="h-[500px] shadow-xl" />
			</div>
			<div className="flex justify-evenly py-10">
				{category
					? category.map((value, index) => {
							return (
								<button key={index} className="space-y-2">
									<a
										href={`/category/category=${value.id}&branch=${
											product ? product[0].branch.id : ""
										}`}
									>
										<img
											src={value.img}
											alt={value.name}
											className="h-32 w-32 border-black border-[2px] rounded-full"
										/>
										<p className="font-semibold font-mandalaFont text-xl">{value.name}</p>
									</a>
								</button>
							);
					  })
					: null}
			</div>
			<div className="grid grid-cols-4 gap-7">
				{product
					? product.map((value, index) => {
							return (
								<div
									key={index}
									className="flex flex-col shadow-md justify-between w-full max-w-sms h-80 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
								>
									<img className="rounded-t-lg h-44" src={value.product.img} alt="product" />
									<div className="px-5 pb-5">
										<h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
											{value.product.name}
										</h5>
										<h4>Toko {value.branch.location}</h4>
										<div className="flex items-center justify-between">
											<span className="text-lg font-bold text-gray-900 dark:text-white">
												Rp. {value.product.price.toLocaleString()}
											</span>
											<button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
												Add to cart
											</button>
										</div>
									</div>
								</div>
							);
					  })
					: null}
			</div>
			<div className="flex justify-center my-5">
				<nav aria-label="Page navigation example">
					<ul className="inline-flex items-center -space-x-px">
						{page
							? page.map((value, index) => {
									return (
										<li key={index + 1}>
											<button
												onClick={() => getAllProduct(value)}
												className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 ${
													selectedpage === value ? "bg-red-200" : null
												} hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
											>
												{value}
											</button>
										</li>
									);
							  })
							: null}
					</ul>
				</nav>
			</div>
		</div>
	);
}
