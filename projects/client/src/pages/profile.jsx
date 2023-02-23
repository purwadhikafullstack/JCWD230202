import React, { useEffect, useState } from "react";
import { Modal, Label, TextInput, Button } from "flowbite-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaFemale, FaMale } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import REST_API from "../support/services/RESTApiService";

export default function Profile() {
	const [date, setdate] = useState();
	const [show, setshow] = useState({
		edit: false,
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

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = async (data) => {
		try {
			await axios.patch(
				"http://localhost:8000/user/edit",
				{
					name: data.name,
					birthdate: profile.birthdate,
					gender: profile.gender,
					email: data.email,
					phone_number: data.phone_number,
				},
				{
					headers: {
						token: "60d910de-9fff-4ee1-902d-6314bae51aae",
					},
				}
			);
		} catch (error) {
			console.log(error);
		}
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
	useEffect(() => {
		// getProfile();
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
		})();
	}, []);
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
							<td>: {`${profile.name} `}</td>
						</tr>
						<tr>
							<th className="py-5">Birthdate</th>
							<td>: {`${profile.birthdate ? profile.birthdate : " "} `}</td>
						</tr>
						<tr>
							<th className="py-5">Gender</th>
							<td>: {`${profile.gender ? profile.gender : " "} `}</td>
						</tr>
						<tr>
							<th className="py-5">Email</th>
							<td>: {`${profile.email} `}</td>
						</tr>
						<tr>
							<th className="py-5">Phone</th>
							<td>: {`${profile.phone_number} `}</td>
						</tr>
					</table>
					<div className="flex justify-end space-x-5">
						<button
							onClick={() => setshow({ ...show, edit: true })}
							className="border border-black p-2 rounded-lg bg-red-700 text-white"
						>
							Edit profile
						</button>
					</div>
				</div>
			</div>
			<Modal
				show={show.edit}
				size="md"
				popup={true}
				onClose={() => setshow({ ...show, edit: false })}
				id="name modal"
			>
				<Modal.Header />
				<Modal.Body>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
					>
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Change your profile
						</h3>
						<div className="space-y-2">
							<div className="mb-2 block">
								<Label htmlFor="password" value="Edit your name" />
							</div>
							<TextInput
								type="text"
								required={true}
								defaultValue={profile.name}
								{...register("name")}
							/>
							<div className="mb-2 block">
								<Label htmlFor="password" value="Edit your birthdate" />
							</div>
							<DatePicker
								{...register("birthdate")}
								showMonthDropdown={true}
								showYearDropdown={true}
								scrollableYearDropdown={true}
								onChange={(date) => {
									setprofile({
										...profile,
										birthdate: date.toISOString().split("T")[0],
									});
									setdate(date);
								}}
								selected={date}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full"
							/>
							<div className="mb-2 block">
								<Label htmlFor="password" value="Select your gender" />
								<div className="flex justify-evenly py-2">
									<div className="flex flex-col justify-center items-center">
										<FaMale
											values="Male"
											className={`text-4xl rounded-full ${
												profile.gender === "Male" ? "bg-blue-200" : null
											}`}
											onClick={() => setprofile({ ...profile, gender: "Male" })}
										/>
										<p>Male</p>
									</div>
									<div className="flex flex-col justify-center items-center">
										<FaFemale
											values="Female"
											className={`text-4xl rounded-full ${
												profile.gender === "Female" ? "bg-blue-200" : null
											}`}
											onClick={() =>
												setprofile({ ...profile, gender: "Female" })
											}
										/>
										<p>Female</p>
									</div>
								</div>
							</div>
							<div className="mb-2 block">
								<Label htmlFor="password" value="Edit your email" />
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
							<p>{errors.email?.message}</p>
							<div className="mb-2 block">
								<Label htmlFor="password" value="Edit your phone number" />
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
							<p>{errors.phone_number?.message}</p>
						</div>
						<div className="w-full flex justify-end">
							<Button type="submit">Submit</Button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		</div>
	);
}
