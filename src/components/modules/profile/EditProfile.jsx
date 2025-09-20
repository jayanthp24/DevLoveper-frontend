import React, { useEffect, useRef, useState } from "react";
import UserCard from "../user/UserCard";
import axios from "axios";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux-slices/userSlice";
import { ToastContainer, toast } from "react-toastify";

const EditProfile = ({ userData }) => {
	const [firstName, setFirstName] = useState(userData.firstName);
	const [lastName, setLastName] = useState(userData.lastName);
	const [emailId, setEmailId] = useState(userData.emailId);
	const [photoUrl, setPhotoUrl] = useState(userData.photoUrl);
	const [age, setAge] = useState(userData.age ? userData.age : "");
	const [about, setAbout] = useState(userData.about);
	const [gender, setGender] = useState(
		userData.gender ? userData.gender : "male"
	);
	const dispatch = useDispatch();
	const [showSubmit, setShowSubmit] = useState(false);
	const isFirstRender = useRef(true);

	// To Show submit button only on input change.
	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		setShowSubmit(true);
	}, [firstName, lastName, photoUrl, age, gender, about]);

	const saveProfile = async () => {
		try {
			const res = await axios.patch(
				BASE_URL + "/profile/edit",
				{ firstName, lastName, photoUrl, age, about, gender },
				{ withCredentials: true }
			);
			dispatch(addUser(res.data.data));
			toast("Data saved successfully");
		} catch (err) {
			toast(err.response.data.message);
		}
	};
	return (
		<>
			<div className="flex items-center justify-between mx-auto">
				<div className="w-6/12 card bg-base-300 shadow-xl my-10 ml-6">
					<div className="flex items-center mx-auto">
						<figure className="w-[150px] h-[150px] object-cover mt-4 rounded-full">
							<img src={photoUrl} alt="User Picture" />
						</figure>
					</div>
					<div className="card-body flex items-center">
						<h2 className="card-title">Profile</h2>
						<div className="w-full flex justify-center items-center my-4">
							<div className="w-3/12 label justify-end items-center">
								<span className="label-text text-xl mx-4">
									First Name:
								</span>
							</div>
							<div className="w-9/12">
								<input
									type="text"
									placeholder="First Name"
									className="input input-bordered w-[75%]"
									value={firstName}
									onChange={(e) =>
										setFirstName(e.target.value)
									}
								/>
							</div>
						</div>
						<div className="w-full flex justify-center items-center my-4">
							<div className="w-3/12 label justify-end items-center">
								<span className="label-text text-xl mx-4">
									Last Name:
								</span>
							</div>
							<div className="w-9/12">
								<input
									type="text"
									placeholder="Last Name"
									className="input input-bordered w-[75%]"
									value={lastName}
									onChange={(e) =>
										setLastName(e.target.value)
									}
								/>
							</div>
						</div>
						<div className="w-full flex justify-center items-center my-4">
							<div className="w-3/12 label justify-end items-center">
								<span className="label-text text-xl mx-4">
									Email:
								</span>
							</div>
							<div className="w-9/12">
								<input
									type="email"
									placeholder="Email"
									className="input input-bordered w-[75%]"
									value={emailId}
									readOnly
								/>
							</div>
						</div>
						<div className="w-full flex justify-center items-center my-4">
							<div className="w-3/12 label justify-end items-center">
								<span className="label-text text-xl mx-4">
									Image URL:
								</span>
							</div>
							<div className="w-9/12">
								<input
									type="text"
									placeholder="Image URL"
									className="input input-bordered w-[75%]"
									value={photoUrl}
									onChange={(e) =>
										setPhotoUrl(e.target.value)
									}
								/>
							</div>
						</div>
						<div className="w-full flex justify-center items-center my-4">
							<div className="w-3/12 label justify-end items-center">
								<span className="label-text text-xl mx-4">
									Age:
								</span>
							</div>
							<div className="w-9/12">
								<input
									type="number"
									placeholder="Age"
									className="input input-bordered w-[75%]"
									value={age}
									onChange={(e) => setAge(e.target.value)}
								/>
							</div>
						</div>
						<div className="w-full flex justify-center items-center my-4">
							<div className="w-3/12 label justify-end items-center">
								<span className="label-text text-xl mx-4">
									Gender:
								</span>
							</div>
							<div className="w-9/12 flex justify-start">
								<div className="flex">
									{["Male", "Female", "Others"].map(
										(option) => (
											<label
												key={option}
												className="label cursor-pointer"
											>
												<span className="label-text mr-2">
													{option}
												</span>
												<input
													type="radio"
													name="gender"
													value={option}
													className="radio  checked:bg-blue-500"
													checked={
														option.toLowerCase() ==
														gender.toLowerCase()
													}
													onChange={(e) => {
														setGender(
															e.target.value.toLowerCase()
														);
													}}
												/>
											</label>
										)
									)}
								</div>
							</div>
						</div>
						<div className="w-full flex justify-center items-center my-4">
							<div className="w-3/12 label justify-end items-center">
								<span className="label-text text-xl mx-4">
									About:
								</span>
							</div>
							<div className="w-9/12">
								<textarea
									type="textarea"
									placeholder="Bio"
									className="textarea w-[75%]"
									value={about}
									onChange={(e) => setAbout(e.target.value)}
								/>
							</div>
						</div>
						<div>
							<button
								className="btn btn-primary"
								onClick={saveProfile}
								disabled={!showSubmit}
							>
								Save Profile
							</button>
						</div>
					</div>
				</div>
				<div className="divider divider-horizontal"></div>
				<div className="w-6/12 mx-auto">
					<div className="flex items-center justify-center">
						<h1 className="text-2xl font-bold my-8">
							Profile Preview
						</h1>
					</div>
					<div className="flex items-center justify-center">
						<UserCard
							user={{
								firstName,
								lastName,
								age,
								gender,
								about,
								photoUrl,
							}}
							preview={true}
						/>
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
};

export default EditProfile;
