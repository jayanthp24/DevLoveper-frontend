import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../redux-slices/userSlice";
import { removeRequests } from "../redux-slices/requestsSlice";
import { removeConnections } from "../redux-slices/connectionsSlice";
import { removeFeed } from "../redux-slices/feedSlice";
import ThemeSelector from "../ThemeSelector";

const Header = () => {
	const user = useSelector((store) => store.user);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			await axios.post(
				BASE_URL + "/logout",
				{},
				{
					withCredentials: true,
				}
			);
			dispatch(removeUser());
			dispatch(removeRequests());
			dispatch(removeConnections());
			dispatch(removeFeed());
			return navigate("/login");
		} catch (err) {}
	};

	return (
		<>
			<div className="navbar bg-base-300 border border-gray-500 sticky top-0 z-50">
				<div className="flex-1">
					<Link to="/" className="btn btn-ghost text-3xl">
						🫂Devlovepers
					</Link>
				</div>
				{user && (
					<div className="flex-none gap-6">
						<ThemeSelector />
						<div className="form-control">
							{/* <input
							type="text"
							placeholder="Search"
							className="input input-bordered w-24 md:w-auto"
						/> */}
							<p className="w-full">Welcome, {user.firstName}</p>
						</div>
						<div className="dropdown dropdown-end">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle avatar"
							>
								<div className="w-10 rounded-full">
									<img alt="Profile" src={user.photoUrl} />
								</div>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
							>
								<li>
									<Link to="/" className="justify-between">
										Feed
									</Link>
								</li>
								<li>
									<Link
										to="/profile"
										className="justify-between"
									>
										Profile
									</Link>
								</li>
								<li>
									<Link
										to="/connections"
										className="justify-between"
									>
										Connections
									</Link>
								</li>
								<li>
									<Link
										to="/requests"
										className="justify-between"
									>
										Requests
										<span className="badge">New</span>
									</Link>
								</li>
								<li onClick={handleLogout}>
									<a>Logout</a>
								</li>
							</ul>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Header;
