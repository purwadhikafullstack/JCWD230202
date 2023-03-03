import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavigationBar from "../components/navbar";
// import { API } from "../support/services/restAPI";
import { SlClose } from "react-icons/sl";
import LoadingSpin from "react-loading-spin";
import { toast, Toaster } from "react-hot-toast";
import axios from 'axios'

export default function ProductCategory() {
	const params = useParams();
	const [product, setproduct] = useState();
	const [category, setcategory] = useState();
	const [page, setpage] = useState();
	const [selectedpage, setselectedpage] = useState();
	const [disable, setdisable] = useState(false);
	const [detail, setdetail] = useState();
	const [quantity, setquantity] = useState(1);
	const [unit, setunit] = useState();
	const [show, setshow] = useState(false);

	let onGetData = async (page) => {
		try {
			const { data } = await axios.get(
				`http://localhost:8000/product/branch_product?category=${params.product
					.split("&")[0]
					.slice(-1)}&branch=${params.product.split("&")[1].slice(-1)}&page=${page}`
			);
			console.log(data.data);
			setproduct(data.data);
			setselectedpage(page);
		} catch (error) {
			console.log(error);
		}
	};

	let onGetPage = async () => {
		try {
			const { data } = await axios.get(
				`http://localhost:8000/product/pageCategory?branch=${params.product
					.split("&")[1]
					.slice(-1)}&category=${params.product.split("&")[0].slice(-1)}`
			);

			const totalPage = [];
			for (let i = 1; i <= data.data / 10; i++) {
				totalPage.push(i);
			}
			setpage(totalPage);
		} catch (error) {}
	};

	let onGetDetail = async (branch, products) => {
		console.log(branch);
		console.log(products);
		try {
			const { data } = await axios.get(`http://localhost:8000/product/detail?branch=${branch}&product=${products}`);
			console.log(data.data[0].product);
			console.log(data.data[0].branch);
			console.log(data.data[0]);
			setdetail(data.data[0]);
			setquantity(1)
			setshow(true);
		} catch (error) {
			console.log(error);
		}
	};

	let onGetUnit = async() => {
		try {
			const {data} = await axios.get(`http://localhost:8000/product/getallproduct?category=${params.product.split("&")[0].slice(-1)}`)
			console.log(data.data[0])
			setunit(data.data[0])
		} catch (error) {
			console.log(error)
		}
	}

	let onSubmit = async() => {
		try {
			setdisable(true)
			const {data} = await axios.post("http://localhost:8000/cart/add", {qty: quantity, branch_id: detail.branch_id ,user_id:4,product_id: detail.product_id })
			toast.success(data.message)
		} catch (error) {
			toast.error(error.response.data.message)
		}finally{
			setdisable(false)
		}
	}


	const getCategory = async () => {
		const { data } = await axios.get("http://localhost:8000/product/category");
		setcategory(data.data);
	};

	useEffect(() => {
		onGetData(1);
		getCategory();
		onGetPage();
		onGetUnit()
	}, []);

	return (
		<div>
			<NavigationBar />
			<div className=" bg-slate-200">
				<div className="pt-[45px] max-w-screen-xl mx-auto ">
					<div className="flex justify-evenly bg-white  rounded-lg shadow-2xl my-8 py-10">
						{category
							? category.map((value, index) => {
									return (
										<a
											href={`/category/category=${value.id}&branch=${
												product ? product[0].branch_id : ""
											}`}
										>
											<button key={index} className="space-y-2">
												<img
													src={value.img}
													alt={value.name}
													className="h-32 w-32 rounded-full overflow-visible shadow-lg"
												/>
												<p className="font-semibold font-mandalaFont text-xl">{value.name}</p>
											</button>
										</a>
									);
							  })
							: null}
					</div>
					<div className=" flex justify-end my-5">
							  <div className=" flex justify-center items-center gap-1 w-[256px] h-10">
								<p>Sort by</p> <select className=" rounded-md w-[200px]">
									<option>Price</option>
									<option>Name</option>
								</select>
							  </div>
					</div>
					<div className=" grid grid-cols-4 gap-7">
						{product
							? product.map((value, index) => {
									return (
										<button
											onClick={() => onGetDetail(value.branch_id, value.product_id)}
											key={index}
											className="flex flex-col shadow-xl h-full w-full bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
										>
											<img
												className="rounded-t-lg h-44 w-full"
												src={value.product.img}
												alt="product"
											/>
											<div className="px-5 py-5 text-left">
												<h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
													{value.product.name}
												</h5>
												<h4>Toko {value.branch.location}</h4>

												<p className="text-lg font-bold text-gray-900 dark:text-white">
													Rp. {value.product.price.toLocaleString()}
												</p>
											</div>
										</button>
									);
							  })
							: null}
					</div>
					<div className="flex justify-center pt-8 pb-12">
						<nav aria-label="Page navigation example">
							<ul className="inline-flex items-center -space-x-px">
								{page
									? page.map((value, index) => {
											return (
												<li key={index + 1}>
													<button
														onClick={() => onGetData(value)}
														className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 ${
															selectedpage === value ? "!bg-red-700 text-white" : null
														} hover:bg-slate-300  dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
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
			</div>
			<Modal show={show} popup={true} size="md" onClose={() => setshow(false)}>
				{/* <Modal.Header/> */}
				<div>
					<img
						src={`${detail ? detail.product.img : null}`}
						alt="product"
						className=" z-10 rounded-t-lg h-full w-full"
					/>
				</div>
				<div className=" mx-8 mt-6 font-tokpedFont max-w-[500px]">
					<h1 className=" text-[20px] font-bold  text-orange-700">
						Rp. {detail ? detail.product.price.toLocaleString() : null}
					</h1>
					<h2 className=" mt-1 text-[16px] font-semibold">{detail ? detail.product.name : null}</h2>
					<p className=" mt-1 text-[12px] text-slate-400 "> per {unit? unit.unit.name : null}</p>
					<h2 className=" mt-1 text-[16px] font-semibold">Description</h2>
					<p className=" text-[12px] mt-2 text-slate-400">
						{detail ? detail.product.description : null}
					</p>
					<div className=" flex justify-between">
						<div className="mt-2.5 mb-2.5 flex items-center">
							<svg
								className="h-5 w-5 text-yellow-300"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							<svg
								className="h-5 w-5 text-yellow-300"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							<svg
								className="h-5 w-5 text-yellow-300"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							<svg
								className="h-5 w-5 text-yellow-300"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							<svg
								className="h-5 w-5 text-yellow-300"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
							</svg>
							<span className="mr-2 ml-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
								5.0
							</span>
						</div>
						<div className=" flex items-center font-tokpedFont font-semibold">
							Toko {detail ? detail.branch.location : null}
						</div>
					</div>

					<div className="flex">
						<div className=" flex justify-center gap-2 border  my-4 rounded-lg w-[102px] font-medium text-sm h-[32px]">
							<button
								value={"-"}
								disabled={quantity <=1? true : false}
								onClick={() => setquantity(quantity-1)}
								className="font-bold"
							>
								-
							</button>
							<input
								className=" outline-none text-center max-w-[46px]"
								defaultValue={1}
								value={quantity}
							/>
							<button
								value={"+"}
								onClick={() => setquantity(quantity+1)}
								className=" text-green-500 font-bold"
							>
								+
							</button>
						</div>
						{detail && detail.stock <= 5 ? (
							<div className=" flex justify-center items-center ml-4 font-semibold">
								Stock: <p className="text-orange-700  px-2">{detail.stock} left</p>
							</div>
						) : null}
					</div>

					<div className="flex mt-5 pb-4">
						<button type="submit" disabled={disable} onClick={() => onSubmit()} className="font-medium w-full text-sm px-5 py-2.5 rounded-lg text-white bg-red-700 hover:bg-red-800 ">
							{disable? (
								<LoadingSpin size={"30px"} primaryColor={"red"} secondaryColor={"gray"}/>
							) : ("Add to cart")}
						</button>
					</div>
				</div>
				<div className=" flex justify-center pb-5">
					<button>
						<SlClose size={25} onClick={() => setshow(false)} />
					</button>
				</div>
			</Modal>
			<Toaster/>
		</div>
	);
}
