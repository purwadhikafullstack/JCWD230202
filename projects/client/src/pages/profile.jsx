import React, { useEffect, useState } from "react";
import { Modal, Label, TextInput, Button } from "flowbite-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaFemale, FaMale } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import REST_API from "../support/services/RESTApiService";s

export default function Profile() {
	const [show, setshow] = useState({
		name: false,
		birthdate: false,
		gender: false,
		email: false,
		phone_number: false,
		changePassword: false,
		changeAddress: false,
		changeProfilePic: false,
	});
	const [profile, setprofile] = useState({
		name: "",
		birthdate: "",
		gender: "",
		email: "",
		phone_number: "",
	});
	const [dbprofile, setdbprofile] = useState({
		name: "",
		birthdate: "",
		gender: "",
		email: "",
		phone_number: "",
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		data.name
			? setprofile({ ...profile, name: data.name })
			: data.birthdate
			? setprofile({ ...profile, birthdate: data.birthdate })
			: data.email
			? setprofile({ ...profile, email: data.email })
			: setprofile({ ...profile, phone_number: data.phone_number });
	};
	// const getProfile = async () => {
	// 	const { data } = await REST_API().get("/user/profile", {
	// 		token: localStorage.getItem("token"),
	// 	});
	// 	setprofile({
	// 		...profile,
	// 		name: data.data.name,
	// 		birthdate: data.data.birthdate,
	// 		gender: data.data.gender,
	// 		email: data.data.email,
	// 		phone: data.data.phone_number,
	// 	});
	// };
	const editProfile = async (dataProfile) => {
		try {
			const data = await axios.patch(
				"http://localhost:8000/user/edit",
				dataProfile,
				{
					headers: {
						token: "60d910de-9fff-4ee1-902d-6314bae51aae",
					},
				}
			);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		(async () => {
			const { data } = await axios.get("http://localhost:8000/user/profile", {
				headers: {
					token: "60d910de-9fff-4ee1-902d-6314bae51aae",
				},
			});
			setprofile({
				...profile,
				name: data.data.name,
				birthdate: data.data.birthdate,
				gender: data.data.gender,
				email: data.data.email,
				phone_number: data.data.phone_number,
			});
			setdbprofile({
				...dbprofile,
				name: data.data.name,
				birthdate: data.data.birthdate,
				gender: data.data.gender,
				email: data.data.email,
				phone_number: data.data.phone_number,
			});
		})();
	}, [dbprofile, profile]);
	return (
		<div className="pt-20 flex justify-center font-tokpedFont items-center h-screen">
			<div className=" max-w-screen-xl w-full grid grid-cols-3 shadow-md h-[600px]">
				<div className=" col-span-1 shadow-md m-5">
					<div className="flex justify-center p-5">
						<img src="" alt="Profile" className="h-80 w-80 shadow-md" />
					</div>
					<div className="flex flex-col justify-center py-3 px-5 space-y-5">
						<button
							onClick={() => setshow({ ...show, changeProfilePic: true })}
							className="border border-black rounded-lg px-2 py-1 w-full"
						>
							Change Profile Picture
						</button>
						<button
							onClick={() => setshow({ ...show, changePassword: true })}
							className="border border-black rounded-lg px-2 py-1 w-full"
						>
							Change Password
						</button>
						<button
							onClick={() => setshow({ ...show, changeAddress: true })}
							className="border border-black rounded-lg px-2 py-1 w-full"
						>
							Change Addresses
						</button>
					</div>
				</div>
				<div className=" col-span-2 m-5 p-5 shadow-md">
					<div>
						<h3 className="text-2xl">Change Profile</h3>
					</div>
					<table className="w-full mt-5 text-left">
						<tr>
							<th className="py-5">Name</th>
							<td>
								: {`${profile.name} `}
								<button
									onClick={() => setshow({ ...show, name: true })}
									className="text-red-700 font-semibold"
								>
									edit
								</button>
							</td>
						</tr>
						<tr>
							<th className="py-5">Birthdate</th>
							<td>
								: {`${profile.birthdate ? profile.birthdate : " "} `}
								<button
									onClick={() => setshow({ ...show, birthdate: true })}
									className="text-red-700 font-semibold"
								>
									edit
								</button>
							</td>
						</tr>
						<tr>
							<th className="py-5">Gender</th>
							<td>
								: {`${profile.gender ? profile.gender : " "} `}
								<button
									onClick={() => setshow({ ...show, gender: true })}
									className="text-red-700 font-semibold"
								>
									edit
								</button>
							</td>
						</tr>
						<tr>
							<th className="py-5">Email</th>
							<td>
								: {`${profile.email} `}
								<button
									onClick={() => setshow({ ...show, email: true })}
									className="text-red-700 font-semibold"
								>
									edit
								</button>
							</td>
						</tr>
						<tr>
							<th className="py-5">Phone</th>
							<td>
								: {`${profile.phone_number} `}
								<button
									onClick={() => setshow({ ...show, phone_number: true })}
									className="text-red-700 font-semibold"
								>
									edit
								</button>
							</td>
						</tr>
					</table>
					<div className="flex justify-end">
						{JSON.stringify(profile) === JSON.stringify(dbprofile) ? null : (
							<button
								onClick={() => editProfile(profile)}
								className="border border-black p-2 rounded-lg"
							>
								Submit Changes
							</button>
						)}
					</div>
				</div>
			</div>
			<Modal
				show={show.name}
				size="md"
				popup={true}
				onClose={() => setshow({ ...show, name: false })}
				id="name modal"
			>
				<Modal.Header />
				<Modal.Body>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
					>
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Change your name
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="password" value="Edit your name here" />
							</div>
							<TextInput
								type="text"
								required={true}
								defaultValue={profile.name}
								{...register("name")}
							/>
						</div>
						<div className="w-full flex justify-end">
							<Button
								type="submit"
								onClick={() => setshow({ ...show, name: false })}
							>
								Submit
							</Button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
			<Modal
				show={show.birthdate}
				size="md"
				popup={true}
				onClose={() => setshow({ ...show, birthdate: false })}
				id="birthdate modal"
			>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
						<div className="relative max-w-sm">
							<p className="pb-5 font-semibold text-lg">
								Select your birthdate
							</p>
							<DatePicker
								showMonthDropdown={true}
								scrollableYearDropdown={true}
								showYearDropdown={true}
								onChange={(date) =>
									setprofile({
										...profile,
										birthdate: date.toISOString().split("T")[0],
									})
								}
								className="w-full rounded-xl"
							/>
							<div className="flex absolute bottom-3 right-0 items-center pr-3 pointer-events-none">
								<svg
									aria-hidden="true"
									className="w-5 h-5 text-gray-500 dark:text-gray-400"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
										clipRule="evenodd"
									></path>
								</svg>
							</div>
						</div>

						<div className="w-full flex justify-end">
							<Button onClick={() => setshow({ ...show, birthdate: false })}>
								Submit
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
			<Modal
				show={show.gender}
				size="md"
				popup={true}
				onClose={() => setshow({ ...show, gender: false })}
				id="gender modal"
			>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
						<div className="flex justify-center space-x-14">
							<button
								onClick={() => {
									setshow({ ...show, gender: false });
									setprofile({ ...profile, gender: "Male" });
								}}
								className="space-y-4"
							>
								<FaMale className="text-7xl" />
								<p className="font-semibold">Male</p>
							</button>
							<button
								onClick={() => {
									setshow({ ...show, gender: false });
									setprofile({ ...profile, gender: "Female" });
								}}
								className="space-y-4"
							>
								<FaFemale className="text-7xl" />
								<p className="font-semibold">Female</p>
							</button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
			<Modal
				show={show.email}
				size="md"
				popup={true}
				onClose={() => setshow({ ...show, email: false })}
				id="email modal"
			>
				<Modal.Header />
				<Modal.Body>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
					>
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Change your email
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="password" value="Edit your email here" />
							</div>
							<TextInput
								type="text"
								required={true}
								defaultValue={profile.email}
								{...register("email", {
									pattern: {
										value:
											/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
										message: "Please input a valid email",
									},
								})}
							/>
							<h2 className="pt-5 text-lg font-semibold text-red-700">
								{errors.email?.message}
							</h2>
						</div>
						<div className="w-full flex justify-end">
							<Button
								type="submit"
								onClick={() =>
									errors.email ? null : setshow({ ...show, email: false })
								}
							>
								Submit
							</Button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
			<Modal
				show={show.phone_number}
				size="md"
				popup={true}
				onClose={() => setshow({ ...show, phone_number: false })}
				id="phone modal"
			>
				<Modal.Header />
				<Modal.Body>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
					>
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Change your phone number
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="password" value="Edit your phone number here" />
							</div>
							<TextInput
								type="text"
								required={true}
								defaultValue={profile.phone_number}
								{...register("phone_number", {
									pattern: {
										value: /^[0-9]*$/,
										message: "Please input a valid phone number",
									},
								})}
							/>
							<h2 className="pt-5 text-lg font-semibold text-red-700">
								{errors.phone_number?.message}
							</h2>
						</div>
						<div className="w-full flex justify-end">
							<Button
								type="submit"
								onClick={() =>
									errors.phone_number
										? null
										: setshow({ ...show, phone_number: false })
								}
							>
								Submit
							</Button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
			<Modal
				show={show.changePassword}
				size="md"
				popup={true}
				onClose={() => setshow({ ...show, changePassword: false })}
				id="change password modal"
			>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Sign in to our platform
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="email" value="Your email" />
							</div>
							<TextInput placeholder="name@company.com" required={true} />
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="password" value="Your password" />
							</div>
							<TextInput type="password" required={true} />
						</div>
						<div className="w-full">
							<Button>Log in to your account</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
			<Modal
				show={show.changeAddress}
				size="md"
				popup={true}
				onClose={() => setshow({ ...show, changeAddress: false })}
				id="address modal"
			>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Sign in to our platform
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="email" value="Your email" />
							</div>
							<TextInput placeholder="name@company.com" required={true} />
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="password" value="Your password" />
							</div>
							<TextInput type="password" required={true} />
						</div>
						<div className="w-full">
							<Button>Log in to your account</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
			<Modal
				show={show.changeAddress}
				size="md"
				popup={true}
				onClose={() => setshow({ ...show, changeAddress: false })}
				id="address modal"
			>
				<Modal.Header />
				<Modal.Body>
					<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Sign in to our platform
						</h3>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="email" value="Your email" />
							</div>
							<TextInput placeholder="name@company.com" required={true} />
						</div>
						<div>
							<div className="mb-2 block">
								<Label htmlFor="password" value="Your password" />
							</div>
							<TextInput type="password" required={true} />
						</div>
						<div className="w-full">
							<Button>Log in to your account</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</div>
	);
}
