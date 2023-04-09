import React, { useEffect, useState } from "react";
import {
	Modal,
	Label,
	TextInput,
	Button,
	Spinner,
	Textarea,
	Checkbox,
} from "flowbite-react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { FaFemale, FaMale } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import REST_API from "../support/services/RESTApiService";

export default function Profile(props) {
	const [date, setdate] = useState();
	const [rakir, setrakir] = useState({
		province: null,
		city: null,
		main_address: false,
	});
	const [show, setshow] = useState({
		edit: false,
		loading: false,
		changePassword: false,
		changeAddress: false,
		changeProfilePic: false,
		addAddress: false,
		oldPassword: false,
		newPassword: false,
		confirmPassword: false,
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();

	const onSubmit = async (data) => {
		setshow({ ...show, loading: true });
		try {
			await REST_API({
				url: "/user/edit",
				method: "PATCH",
				data: {
					name: data.name,
					email: data.email,
					phone_number: data.phone_number,
					gender: props.state.profile.gender,
					birthdate: props.state.profile.birthdate,
				},
			});
			toast.success("Profile updated");
			setshow({ ...show, edit: false });
			props.func.getProfile();
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setshow({ ...show, loading: false, edit: false });
		}
	};

	const onSubmitChangePassword = async (data) => {
		const err = { msg: "Please input the same password" };
		setshow({ ...show, loading: true });
		try {
			if (data.newPassword !== data.confirmNewPassword) throw err;

			await REST_API({
				url: "/user/profile/change-password",
				method: "PATCH",
				data: {
					oldPassword: data.oldPassword,
					newPassword: data.newPassword,
				},
			});
			props.func.getProfile();
			toast.success("Password changed");
		} catch (error) {
			toast.error(error.message);
		} finally {
			setshow({ ...show, loading: false, changePassword: false });
		}
	};

	const deleteAddress = async (id) => {
		try {
			await REST_API({
				url: `/user/delete-address/${id}`,
				method: "DELETE",
			});
			props.func.getProfile();
			toast.success("Address deleted");
		} catch (error) {
			console.log(error);
		}
	};
	// const editAddress = async (data) => {};
	const makeDefault = async (id) => {
		try {
			await REST_API({
				url: `/user/main-address/${id}`,
				method: "PATCH",
			});
			props.func.getProfile();
			toast.success("Main address updated");
		} catch (error) {
			console.log(error);
		}
	};
	const rakirProvince = async () => {
		try {
			const { data } = await REST_API({
				url: "/user/rakir-province",
				method: "GET",
			});
			setrakir({ ...rakir, province: data.data });
		} catch (error) {
			console.log(error);
		}
	};
	const rakirCity = async (province) => {
		try {
			const { data } = await REST_API({
				url: `/user/rakir-city?province=${province}`,
				method: "GET",
			});
			setrakir({ ...rakir, city: data.data });
		} catch (error) {
			console.log(error);
		}
	};
	const onSubmitAddAddress = async (data) => {
		setshow({ ...show, loading: true });
		try {
			await REST_API.post("/user/add-address", {
				city: data.city,
				province: data.province,
				address: data.address,
				receiver_name: data.receiver_name,
				receiver_phone: data.receiver_phone,
				main_address: rakir.main_address,
			});
			props.func.getProfile();
			toast.success("Address added");
		} catch (error) {
			console.log(error);
		} finally {
			setshow({ ...show, loading: false, addAddress: false });
		}
	};
	useEffect(() => {
		setValue("name", props.state.profile.name);
		setValue("email", props.state.profile.email);
		setValue("phone_number", props.state.profile.phone_number);
		rakirProvince();
		props.state.setselected("profile");
		// eslint-disable-next-line
	}, []);
	return (
		<>
			<div className="pt-10 flex flex-col justify-start font-tokpedFont items-start pl-10">
				<div className=" max-w-screen-sm w-full space-y-5">
					<div className="relative">
						<p className="absolute z-10 left-3 top-2 text-xs text-[#0095da] font-semibold tracking-wider">
							Full name
						</p>
						<input
							type="text"
							disabled={true}
							className="bg-gray-50 w-full border pt-6 border-gray-300 text-gray-900 text-sm rounded-lg"
							placeholder={props.state.profile.name}
						/>
					</div>
					<div className="relative">
						<p className="absolute z-10 left-3 top-2 text-xs text-[#0095da] font-semibold tracking-wider">
							Email
						</p>
						<input
							type="text"
							disabled={true}
							className="bg-gray-50 w-full border pt-6 border-gray-300 text-gray-900 text-sm rounded-lg"
							placeholder={props.state.profile.email}
						/>
					</div>
					<div className="relative">
						<p className="absolute z-10 left-3 top-2 text-xs text-[#0095da] font-semibold tracking-wider">
							Phone number
						</p>
						<input
							type="text"
							className="bg-gray-50 w-full border pt-6 border-gray-300 text-gray-900 text-sm rounded-lg"
							placeholder={props.state.profile.phone_number}
							disabled={true}
						/>
					</div>
					<div className="relative">
						<button
							onClick={() => setshow({ ...show, changePassword: true })}
							className="absolute z-10 right-3 top-5 text-xs text-[#0095da] font-semibold tracking-wider"
						>
							Change
						</button>
						<input
							type="text"
							disabled={true}
							className="bg-gray-50 w-full border py-4 border-gray-300 text-gray-900 text-sm rounded-lg"
							placeholder="Password"
						/>
					</div>
					<div className="relative">
						<p className="absolute z-10 left-3 top-2 text-xs text-[#0095da] font-semibold tracking-wider">
							Gender
						</p>
						<input
							type="text"
							disabled={true}
							className="bg-gray-50 w-full border pt-7 border-gray-300 text-gray-900 text-sm rounded-lg"
							placeholder={props.state.profile.gender}
						/>
					</div>
					<div className="relative">
						<p className="absolute z-10 left-3 top-2 text-xs text-[#0095da] font-semibold tracking-wider">
							Birthdate
						</p>
						<input
							type="text"
							disabled={true}
							className="bg-gray-50 w-full border pt-7 border-gray-300 text-gray-900 text-sm rounded-lg"
							placeholder={props.state.profile.birthdate}
						/>
					</div>
				</div>
				<div className="flex justify-end max-w-screen-sm w-full mt-2">
					<button
						onClick={() => setshow({ ...show, changeAddress: true })}
						className="text-[#0095da] rounded-lg text-sm font-semibold tracking-wider"
					>
						manage your address
					</button>
				</div>
				<div className="flex justify-start space-x-5">
					<button
						onClick={() => setshow({ ...show, edit: true })}
						className="p-2 rounded-lg bg-[#0095da] text-white"
					>
						Edit profile
					</button>
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
									<Label htmlFor="name" value="Edit your name" />
								</div>
								<TextInput
									type="text"
									required={true}
									onChange={(e) =>
										props.state.setprofile({
											...props.state.profile,
											name: e.target.value,
										})
									}
									defaultValue={props.state.profile.name}
									{...register("name")}
								/>
								<div className="mb-2 block">
									<Label htmlFor="birthdate" value="Edit your birthdate" />
								</div>
								<DatePicker
									showMonthDropdown={true}
									showYearDropdown={true}
									scrollableYearDropdown={true}
									onChange={(date) => {
										props.state.setprofile({
											...props.state.profile,
											birthdate: date.toISOString().split("T")[0],
										});
										setdate(date);
									}}
									selected={date}
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full"
								/>
								<div className="mb-2 block">
									<Label htmlFor="gender" value="Select your gender" />
									<div className="flex justify-evenly py-2">
										<div className="flex flex-col justify-center items-center">
											<FaMale
												values="Male"
												className={`text-4xl rounded-full ${
													props.state.profile.gender === "Male"
														? "bg-blue-200"
														: null
												}`}
												onClick={() =>
													props.state.setprofile({
														...props.state.profile,
														gender: "Male",
													})
												}
											/>
											<p>Male</p>
										</div>
										<div className="flex flex-col justify-center items-center">
											<FaFemale
												values="Female"
												className={`text-4xl rounded-full ${
													props.state.profile.gender === "Female"
														? "bg-blue-200"
														: null
												}`}
												onClick={() =>
													props.state.setprofile({
														...props.state.profile,
														gender: "Female",
													})
												}
											/>
											<p>Female</p>
										</div>
									</div>
								</div>
								<div className="mb-2 block">
									<Label htmlFor="email" value="Edit your email" />
								</div>
								<TextInput
									type="text"
									required={true}
									defaultValue={props.state.profile.email}
									onChange={(e) =>
										props.state.setprofile({
											...props.state.profile,
											email: e.target.value,
										})
									}
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
									defaultValue={props.state.profile.phone_number}
									onChange={(e) =>
										props.state.setprofile({
											...props.state.profile,
											phone_number: e.target.value,
										})
									}
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
								{show.loading ? (
									<button>
										<Spinner aria-label="Default status example" />
									</button>
								) : (
									<Button type="submit">Submit</Button>
								)}
							</div>
						</form>
					</Modal.Body>
				</Modal>

				<Modal
					show={show.changePassword}
					size="md"
					popup={true}
					onClose={() => setshow({ ...show, changePassword: false })}
					id="name modal"
				>
					<Modal.Header />
					<Modal.Body>
						<form
							onSubmit={handleSubmit(onSubmitChangePassword)}
							className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
						>
							<h3 className="text-xl font-medium text-gray-900 dark:text-white">
								Change your password
							</h3>
							<div className="space-y-2">
								<div className="mb-2 block">
									<Label htmlFor="password" value="Old password" />
								</div>

								<TextInput
									type={show.oldPassword ? "text" : "password"}
									{...register("oldPassword")}
								/>
								<div className="mb-2 block">
									<Label htmlFor="password" value="New password" />
								</div>
								<div className="relative">
									<TextInput
										type={show.newPassword ? "text" : "password"}
										{...register("newPassword", {
											pattern: {
												value:
													/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,16}$/,
												message:
													"Minimum password 8-16 characters and 1 capital letters",
											},
										})}
									/>
									<div className=" text-2xl absolute right-2 top-2">
										{show.newPassword ? (
											<AiFillEye
												onClick={() =>
													setshow({
														...show,
														newPassword: false,
													})
												}
											/>
										) : (
											<AiFillEyeInvisible
												onClick={() => setshow({ ...show, newPassword: true })}
											/>
										)}
									</div>
								</div>
								<div className="mb-2 block">
									<Label htmlFor="password" value="Confirm new password" />
								</div>
								<div className="relative">
									<TextInput
										type={show.confirmPassword ? "text" : "password"}
										{...register("confirmNewPassword")}
									/>
									<div className=" text-2xl absolute right-2 top-2">
										{show.confirmPassword ? (
											<AiFillEye
												onClick={() =>
													setshow({
														...show,
														confirmPassword: false,
													})
												}
											/>
										) : (
											<AiFillEyeInvisible
												onClick={() =>
													setshow({ ...show, confirmPassword: true })
												}
											/>
										)}
									</div>
								</div>
								<p className="text-sm text-red-900">
									{errors.newPassword?.message}
								</p>
							</div>
							<div className="w-full flex justify-end">
								{show.loading ? (
									<button>
										<Spinner aria-label="Default status example" />
									</button>
								) : (
									<Button type="submit">Submit</Button>
								)}
							</div>
						</form>
					</Modal.Body>
				</Modal>
				<Modal
					show={show.addAddress}
					size="md"
					popup={true}
					onClose={() => setshow({ ...show, addAddress: false })}
					id="name modal"
					className="z-50"
				>
					<Modal.Header />
					<Modal.Body>
						<form
							onSubmit={handleSubmit(onSubmitAddAddress)}
							className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8"
						>
							<h3 className="text-xl font-medium text-gray-900 dark:text-white">
								Add address
							</h3>
							<div className="space-y-2">
								<div className="mb-2 block">
									<Label htmlFor="password" value="Select province" />
								</div>
								<select
									name="province"
									className="border-gray-300 rounded-lg bg-gray-50 w-full"
									onChange={(e) => {
										rakirCity(e.target.value.split(".")[0]);
										setValue("province", e.target.value);
										console.log(e.target.value);
									}}
								>
									<option value="selected">Select province</option>
									{rakir.province?.map((value, index) => {
										return (
											<option
												value={`${value.province_id}.${value.province}`}
												key={index}
											>
												{value.province}
											</option>
										);
									})}
								</select>
								<div className="mb-2 block">
									<Label htmlFor="password" value="Select city" />
								</div>
								<select
									name="city"
									className="border-gray-300 rounded-lg bg-gray-50 w-full"
									onChange={(e) => {
										setValue("city", e.target.value);
										console.log(e.target.value);
									}}
								>
									<option value="selected">Select city</option>
									{rakir.city?.map((value, index) => {
										return (
											<option
												value={`${value.city_id}.${value.city_name}`}
												key={index}
											>
												{value.type} {value.city_name}
											</option>
										);
									})}
								</select>
								<div className="mb-2 block">
									<Label htmlFor="address" value="Address details" />
								</div>
								<Textarea
									rows="4"
									type="text"
									{...register("address")}
									required={true}
								/>
								<div className="mb-2 block">
									<Label htmlFor="conatcts" value="Contact person" />
								</div>
								<TextInput {...register("receiver_name")} />
								<div className="mb-2 block">
									<Label htmlFor="conatcts" value="Phone number" />
								</div>
								<TextInput {...register("receiver_phone")} />
								<div className="flex items-center gap-2">
									<Checkbox
										id="remember"
										onChange={() =>
											setrakir({
												...rakir,
												main_address: rakir.main_address ? false : true,
											})
										}
									/>
									<Label htmlFor="remember">Make main address</Label>
								</div>
							</div>
							<div className="w-full flex justify-end">
								{show.loading ? (
									<button>
										<Spinner aria-label="Default status example" />
									</button>
								) : (
									<Button type="submit">Submit</Button>
								)}
							</div>
						</form>
					</Modal.Body>
				</Modal>
				<Modal
					show={show.changeAddress}
					size="3xl"
					popup={true}
					onClose={() => setshow({ ...show, changeAddress: false })}
					id="name modal"
				>
					<Modal.Header />
					<Modal.Body>
						<div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
							<div className="flex justify-between">
								<h3 className="text-xl font-medium text-gray-900 dark:text-white">
									Manage your address
								</h3>
								<Button
									className="!bg-[#0095DA]"
									onClick={() =>
										setshow({ ...show, addAddress: true, changeAddress: false })
									}
								>
									Add Address
								</Button>
							</div>
							{props.state.profile.address?.main_address[0] ? (
								<div
									className={`p-3 shadow-md rounded-lg space-y-2 bg-blue-200`}
								>
									<p className="text-lg w-full font-semibold">
										{props.state.profile.address?.main_address[0]?.address}
									</p>
									<p className="text-md">
										{
											props.state.profile.address?.main_address[0]
												?.receiver_name
										}
									</p>
									<p className="text-md">
										{
											props.state.profile.address?.main_address[0]
												?.receiver_phone
										}
									</p>
									<div className="right-2 top-1">
										<p className="text-sm bg-green-500 rounded-md py-1 px-4 text-white w-fit">
											Main Address
										</p>
									</div>
								</div>
							) : (
								<div>
									<p className="">No address Found</p>
								</div>
							)}

							{props.state.profile.address
								? props.state.profile.address.address.map((value, index) => {
										return (
											<div
												className={`p-3 shadow-md rounded-lg space-y-2 ${
													value.main_address ? "bg-red-200" : null
												}`}
												key={index}
											>
												<p className="text-lg w-full font-semibold">
													{value.address}
												</p>
												<p className="text-md">{value.receiver_name}</p>
												<p className="text-md">{value.receiver_phone}</p>
												{value.main_address ? (
													<div className="right-2 top-1">
														<p className="text-sm px-2 bg-green-500 rounded-3xl w-fit">
															Main Address
														</p>
													</div>
												) : null}
												<div className="w-full flex space-x-2 pt-2">
													{show.loading ? (
														<button>
															<Spinner aria-label="Default status example" />
														</button>
													) : value.main_address ? null : (
														<>
															<Button
																size="xs"
																className="p-0"
																onClick={() => makeDefault(value.id)}
															>
																Make default
															</Button>
															<Button color="success" size="xs" className="p-0">
																Edit
															</Button>
															<Button
																size="xs"
																color="failure"
																className="p-0"
																onClick={() => deleteAddress(value.id)}
															>
																Delete
															</Button>
														</>
													)}
												</div>
											</div>
										);
								  })
								: null}
						</div>
					</Modal.Body>
				</Modal>
				<Toaster />
			</div>
		</>
	);
}
