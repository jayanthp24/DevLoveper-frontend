import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../../redux-slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../utils/constants";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
	const [emailId, setEmailId] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [loginForm, setLoginForm] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handlePage = () => {
		setLoginForm(!loginForm);
	};

	const handleSignUp = async () => {
		setErrorMessage("");
		try {
			const res = await axios.post(
				BASE_URL + "/signup",
				{ firstName, lastName, emailId, password },
				{ withCredentials: true }
			);
			dispatch(addUser(res.data.data));
			toast("Signed up successfully. You'll be redirected to profile page to update the details.", {
				autoClose: 4000,
				theme: "dark",
			});
			setTimeout(() => {
				navigate("/profile");
			}, 5000);
		} catch (err) {
			setErrorMessage(
				err?.response?.data?.message || "Something went wrong"
			);
		}
	};

	const handleLogin = async () => {
		setErrorMessage("");
		try {
			const res = await axios.post(
				BASE_URL + "/login",
				{
					emailId,
					password,
				},
				{ withCredentials: true }
			);
			dispatch(addUser(res.data.data));
			return navigate("/");
		} catch (err) {
			setErrorMessage(
				err?.response?.data?.message || "Something went wrong"
			);
		}
	};

	const handleEnter = (event) => {
		if(event.key === 'Enter') {
			handleLogin();
		}
	}

	return (
		<>
			<ToastContainer />
			{loginForm && (
				<div>
					<div className="join flex justify-center items-center my-36">
						<div className="join-item bg-base-300 w-[500px] h-[500px] shadow-xl flex items-center">
							<div className="card-body">
								<h2 className="card-title flex justify-center">
									Login
								</h2>
								<div className="my-4">
									<label className="input input-bordered flex items-center gap-2 my-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 16 16"
											fill="currentColor"
											className="h-4 w-4 opacity-70"
										>
											<path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
											<path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
										</svg>
										<input
											type="text"
											className="grow"
											placeholder="Email"
											value={emailId}
											onChange={(e) =>
												setEmailId(e.target.value)
											}
											onKeyDown={handleEnter}
										/>
									</label>
									<label className="input input-bordered flex items-center gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 16 16"
											fill="currentColor"
											className="h-4 w-4 opacity-70"
										>
											<path
												fillRule="evenodd"
												d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
												clipRule="evenodd"
											/>
										</svg>
										<input
											type="password"
											className="grow"
											placeholder="Password"
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
											onKeyDown={handleEnter}
										/>
									</label>
								</div>
								<p className="text-red-500">{errorMessage}</p>
								<div className="card-actions justify-center">
									<button
										className="btn btn-primary"
										onClick={handleLogin}
									>
										Login
									</button>
								</div>
								<p
									className="text-center mt-10 cursor-pointer"
									onClick={handlePage}
								>
									New User? Sign up here.
								</p>
							</div>
						</div>
						<div className="join-item w-[500px] h-[500px]">
							<img src="/Conversation.gif" alt="login" />
						</div>
					</div>
				</div>
			)}
			{!loginForm && (
				<div>
					<div className="join flex justify-center items-center my-36">
						<div className="join-item w-[500px] h-[500px]">
							<img src="/Appreciation.gif" alt="login" />
						</div>
						<div className="join-item bg-base-300 w-[500px] h-[500px] shadow-xl flex items-center">
							<div className="card-body">
								<h2 className="card-title flex justify-center">
									Signup
								</h2>
								<div className="my-4">
									<label className="input input-bordered flex items-center gap-2 my-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 16 16"
											fill="currentColor"
											className="h-4 w-4 opacity-70"
										>
											<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
										</svg>
										<input
											type="text"
											className="grow"
											placeholder="First name"
											value={firstName}
											onChange={(e) =>
												setFirstName(e.target.value)
											}
										/>
									</label>
									<label className="input input-bordered flex items-center gap-2 my-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 16 16"
											fill="currentColor"
											className="h-4 w-4 opacity-70"
										>
											<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
										</svg>
										<input
											type="text"
											className="grow"
											placeholder="Last name"
											value={lastName}
											onChange={(e) =>
												setLastName(e.target.value)
											}
										/>
									</label>
									<label className="input input-bordered flex items-center gap-2 my-4">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 16 16"
											fill="currentColor"
											className="h-4 w-4 opacity-70"
										>
											<path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
											<path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
										</svg>
										<input
											type="text"
											className="grow"
											placeholder="Email"
											value={emailId}
											onChange={(e) =>
												setEmailId(e.target.value)
											}
										/>
									</label>
									<label className="input input-bordered flex items-center gap-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 16 16"
											fill="currentColor"
											className="h-4 w-4 opacity-70"
										>
											<path
												fillRule="evenodd"
												d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
												clipRule="evenodd"
											/>
										</svg>
										<input
											type="password"
											className="grow"
											placeholder="Password"
											value={password}
											onChange={(e) =>
												setPassword(e.target.value)
											}
										/>
									</label>
								</div>
								<p className="text-red-500">{errorMessage}</p>
								<div className="card-actions justify-center">
									<button
										className="btn btn-primary"
										onClick={handleSignUp}
									>
										Signup
									</button>
								</div>
								<p
									className="text-center mt-6 cursor-pointer"
									onClick={handlePage}
								>
									Existing User? Login here.
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Login;
