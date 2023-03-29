import "./App.css";
import REST_API from "./support/services/RESTApiService";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import NavigationBar from "./components/navbar";
import Profile from "./pages/profile";
import { useEffect, useState } from "react";
import Login from "./pages/login";
import UpdatePassword from "./pages/newpass";
import Register from "./pages/register";
import Activation from "./pages/activation";
import ForgotPass from "./pages/forgotpass";
import Dashboard from "./pages/dashboard";
import SalesReport from "./components/salesReport";
import ProductCategory from "./pages/product_category";
import Checkout from "./pages/checkout";
import Cart from "./pages/cart";
import BranchAdminRegister from "./components/branchAdminRegister";
import Transaction from "./pages/transaction";
import LoginAdmin from "./pages/loginAdmin";
import StockHistory from "./components/stockHistory";
import { toast } from "react-hot-toast";
import ProductManagement from "./pages/productManagement";
import DiscountManagement from "./pages/discountManagement";
import BranchAdminProductList from "./components/branchAdminProductlist";
import NotFoundPage from "./pages/404";
import StockHistoryDetail from "./components/stockHistoryDetail";

function App() {
	const [disable, setdisable] = useState();
	const [profile, setprofile] = useState({
		id: null,
		name: null,
		birthdate: null,
		gender: null,
		email: null,
		phone_number: null,
		profile_picture: null,
		role: null,
		address: null,
	});
	const getProfile = async () => {
		try {
			const { data } = await REST_API({
				url: "/user/profile",
				method: "GET",
			});
			setprofile({
				...profile,
				id: data.data.id,
				name: data.data.name,
				birthdate: data.data.birthdate,
				gender: data.data.gender,
				email: data.data.email,
				phone_number: data.data.phone_number,
				profile_picture: data.data.img,
				role: data.data.role,
				address: data.data.user_addresses,
			});
		} catch (error) {
			console.log(error);
		}
	};

	let onLogin = async (email, password) => {
		try {
			setdisable(true);
			const { data } = await REST_API({
				url: "/user/login",
				method: "POST",
				data: {
					email: email,
					password: password,
				},
			});
			await localStorage.setItem("token", `${data.data.token}`);
			toast.success(data.message);
			email = "";
			password = "";
			getProfile();
			setTimeout(() => {
				window.location.href = "http://localhost:3000/home";
			}, 3000);
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(error);
		} finally {
			setdisable(false);
		}
	};

	let onLoginAdmin = async (email, password) => {
		try {
			setdisable(true);
			const { data } = await REST_API({
				url: "/admin/login",
				method: "POST",
				data: {
					email: email,
					password: password,
				},
			});

			localStorage.setItem("token", `${data.data.token}`);
			toast.success(data.message);
			// email.current.value = "";
			// password.current.value = "";
			email = "";
			password = "";
			getProfile();
			setTimeout(() => {
				window.location.href = "http://localhost:3000/admin";
			}, 1000);
		} catch (error) {
			toast.error(error.response.data.message);
		} finally {
			setdisable(false);
		}
	};

	let onLogout = () => {
		localStorage.removeItem("token");
		setprofile({ ...profile, name: "" });
	};
	useEffect(() => {
		getProfile();
		// if (profile.role === "super admin" || "branch admin") {
		// 	window.location.href = "http://localhost:3000/admin";
		// } else if (profile.role === "user") {
		// 	window.location.href = "http://localhost:3000/home";
		// } else {
		// 	null;
		// }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="relative">
			<Routes>
				{/* User */}
				<Route
					path="/"
					element={<NavigationBar state={{ profile }} Func={{ onLogout }} />}
				>
					<Route path="home" element={<LandingPage />} />
					<Route
						path="profile"
						element={
							<Profile func={{ getProfile }} state={{ profile, setprofile }} />
						}
					/>
					<Route path="category/:product" element={<ProductCategory />} />
					<Route path="checkout" element={<Checkout />} />
					<Route path="cart" element={<Cart />} />
					<Route path="transaction" element={<Transaction />} />
				</Route>
				<Route
					path="/login"
					element={<Login MyFunc={{ onLogin }} isDisable={{ disable }} />}
				/>
				<Route path="/updatePassword/:uid" element={<UpdatePassword />} />
				<Route path="/register" element={<Register />} />
				<Route path="/activation/:uid" element={<Activation />} />
				<Route path="/forgotpassword" element={<ForgotPass />} />
				{/* Admin */}
				<Route
					path="/admin"
					element={<Dashboard state={{ profile }} Func={{ onLogout }} />}
				>
					{/* <Route path="/admin" element={<Overview />} /> */}
					<Route path="sales-report" element={<SalesReport />} />
					<Route
						path="branch-admin-register"
						element={<BranchAdminRegister />}
					/>
					<Route path="stock-history" element={<StockHistory />} />
					<Route path="admin-product" element={<BranchAdminProductList />} />
					<Route path="product-management" element={<ProductManagement />} />
					<Route
						path="stock-history-detail/:id"
						element={<StockHistoryDetail state={{ profile }} />}
					/>
					<Route path="discount-management" element={<DiscountManagement />} />
				</Route>
				<Route
					path="/loginAdmin"
					element={<LoginAdmin Func={{ onLoginAdmin }} />}
				/>
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</div>
	);
}

export default App;
