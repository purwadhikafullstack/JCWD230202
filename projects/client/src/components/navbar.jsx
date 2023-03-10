import { BiSearchAlt, BiCart, BiBell } from "react-icons/bi";
import { AiOutlineUser, AiOutlineShopping } from "react-icons/ai";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { useEffect } from "react";

export default function NavigationBar(props) {
	const navigate = useNavigate();
	useEffect(() => {}, []);
	return (
		<>
			<div className="grid grid-cols-12 fixed py-3 px-8 shadow-md max-w-screen w-full bg-white z-50">
				<button
					onClick={() => navigate("/home")}
					className=" col-span-2 font-mandalaFont font-extrabold text-xl text-red-700 xl:text-4xl"
				>
					tokonglomerat
				</button>
				<div className=" col-span-7 relative flex items-center">
					<input
						type="text"
						className=" pl-10 h-7 rounded-lg border-gray-300 w-full"
						placeholder="Cari di tokonglomerat"
					/>
					<BiSearchAlt className="text-2xl text-gray-500 absolute top-2 left-1" />
				</div>
				<div className="flex justify-center text-gray-500 gap-7">
					<button>
						<BiCart className="text-2xl" />
					</button>
					<button>
						<BiBell className="text-2xl" />
					</button>
				</div>
				{localStorage.getItem("token") ? (
					<div className="col-span-2 flex text-[#6C727C] items-center justify-end space-x-4">
						<Dropdown inline={true} label={props.state.profile.name} dismissOnClick={true}>
							<Dropdown.Item className="flex items-center px-3 space-x-2">
								<AiOutlineUser className="text-xl" />
								<Link to={"/profile"}>Profile</Link>
							</Dropdown.Item>
							<Dropdown.Item className="flex items-center px-3 space-x-2">
								<AiOutlineShopping className="text-xl" />
								<Link to={"/transaction"}>Transaction</Link>
							</Dropdown.Item>
						</Dropdown>
					</div>
				) : (
					<div className="col-span-2 grid grid-cols-2 gap-4">
						<button className="border-[2px] rounded-lg px-2 py-1">
							<p>Login</p>
						</button>
						<button className="border-[2px] rounded-lg px-2 py-1">
							<p>Register</p>
						</button>
					</div>
				)}
			</div>
			<Outlet />
		</>
	);
}
