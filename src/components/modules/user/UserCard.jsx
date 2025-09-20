import { useDispatch } from "react-redux";
import { BASE_URL } from "../../../utils/constants";
import { removeUserFromFeed } from "../../../redux-slices/feedSlice";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";

const UserCard = ({ user, preview }) => {
	const [message, setMessage] = useState("");
	const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
	const dispatch = useDispatch();

	const feedAction = async (status, userId) => {
		if (preview) return;
		try {
			const res = await axios.post(
				BASE_URL + "/request/send/" + status + "/" + userId,
				{},
				{ withCredentials: true }
			);
			dispatch(removeUserFromFeed(userId));
			status == "interested"
				? setMessage("Connection request sent to ")
				: setMessage("Ignored the user ");
			toast(res.data.message, { autoClose: 2000, theme: "dark" });
		} catch (err) {
			toast(err);
		}
	};

	return (
		<>
			<div className="card bg-base-300 w-96 h-98 shadow-xl">
				<figure className="h-[450px] overflow-hidden">
					<img
						className="h-[450px] w-[450px] object-cover"
						src={photoUrl}
						alt="Profile photo"
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title">{firstName + " " + lastName}</h2>
					{age && gender && <p>{age + " ," + gender}</p>}
					<p>{about}</p>
					<div className="card-actions justify-between">
						<button
							className="btn btn-primary"
							onClick={() => feedAction("ignored", _id)}
						>
							Ignore
						</button>
						<button
							className="btn btn-secondary"
							onClick={() => feedAction("interested", _id)}
						>
							Interested
						</button>
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
};

export default UserCard;
