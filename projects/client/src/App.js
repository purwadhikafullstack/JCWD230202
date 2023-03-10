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

function App() {
	const [profile, setprofile] = useState({
		name: null,
		birthdate: null,
		gender: null,
		email: null,
		phone_number: null,
		profile_picture: null,
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
				name: data.data.name,
				birthdate: data.data.birthdate,
				gender: data.data.gender,
				email: data.data.email,
				phone_number: data.data.phone_number,
				profile_picture: data.data.img,
				address: data.data.user_addresses,
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getProfile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let onLogout = () => {
		localStorage.removeItem("token");
		setprofile({ ...profile, name: "" });
	};

	return (
		<>
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
								<Profile
									func={{ getProfile }}
									state={{ profile, setprofile }}
								/>
							}
						/>
						<Route path="category/:product" element={<ProductCategory />} />
						<Route path="checkout/:cart" element={<Checkout />} />
						<Route path="cart/:id" element={<Cart />} />
						<Route path="transaction" element={<Transaction />} />
					</Route>
					<Route path="/login" element={<Login />} />
					<Route path="/updatePassword/:uid" element={<UpdatePassword />} />
					<Route path="/register" element={<Register />} />
					<Route path="/activation/:uid" element={<Activation />} />
					<Route path="/forgotpassword" element={<ForgotPass />} />
					{/* Admin */}
					<Route path="/admin" element={<Dashboard />}>
						{/* <Route path="/admin" element={<Overview />} /> */}
						<Route path="sales-report" element={<SalesReport />} />
						<Route
							path="branch-admin-register"
							element={<BranchAdminRegister />}
						/>
					</Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
