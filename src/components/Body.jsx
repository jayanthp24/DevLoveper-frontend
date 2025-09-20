import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../redux-slices/userSlice";
import { useEffect } from "react";
import { removeRequests } from "../redux-slices/requestsSlice";
import { removeConnections } from "../redux-slices/connectionsSlice";
import { removeFeed } from "../redux-slices/feedSlice";

const Body = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userData = useSelector((store) => store.user);

	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		if (userData) return;
		try {
			const user = await axios.get(BASE_URL + "/profile/view", {
				withCredentials: true,
			});
			dispatch(addUser(user.data.data));
		} catch (err) {
			if (err.response.status == 401) {
				dispatch(removeUser());
				dispatch(removeRequests());
				dispatch(removeConnections());
				dispatch(removeFeed());
				return navigate("/login");
			}
		}
	};

	return (
		<>
			<Header />
			<Outlet />
			{/* <Footer /> */}
		</>
	);
};

export default Body;
