import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import {
	addRequests,
	removeRequest,
} from "../../../redux-slices/requestsSlice";
import { ToastContainer, toast } from "react-toastify";
import { removeConnections } from "../../../redux-slices/connectionsSlice";

const Requests = () => {
	const dispatch = useDispatch();
	const requests = useSelector((store) => store.requests);

	const reviewRequest = async (status, _id) => {
		try {
			const res = await axios.post(
				BASE_URL + "/request/review/" + status + "/" + _id,
				{},
				{ withCredentials: true }
			);
			toast(`Request ${status}`);
			dispatch(removeRequest(_id));
			dispatch(removeConnections());
		} catch (err) {
			toast(err.data.data.message);
		}
	};

	const fetchRequests = async () => {
		try {
			const res = await axios.get(BASE_URL + "/user/requests/received", {
				withCredentials: true,
			});
			console.log(res.data.data);
			dispatch(addRequests(res.data.data));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (!requests) {
			fetchRequests();
		}
	}, []);

	if (!requests) return;

	if (requests.length === 0)
		return (
			<>
				<div className="flex flex-col justify-center items-center my-10">
					<h1 className="text-2xl font-bold mb-20">No requests found</h1>
					<img className="w-[600px] h-[600px]" src="/empty.png" alt="empty" />
				</div>
				<ToastContainer />
			</>
		);

	return (
		<>
			<div>
				<div className="flex justify-center items-center text-2xl font-bold my-6">
					<h1>Connection Requests ({requests.length})</h1>
				</div>
				<div className="w-6/12 flex flex-col justify-center items-center my-8 mx-auto">
					{requests.map((request) => (
						<div
							key={request._id}
							className="w-full h-full flex justify-between bg-base-300 items-center my-4"
						>
							<div className="flex justify-start items-center mx-8 my-4">
								<div className="avatar mr-8">
									<div className="ring-white ring-offset-white-100 w-20 rounded-full ring ring-offset-2">
										<img
											src={request.fromUserId.photoUrl}
										/>
									</div>
								</div>
								<div>
									<p className="text-lg font-bold">
										{request.fromUserId.firstName +
											" " +
											request.fromUserId.lastName}
									</p>
									<p className="">{request.fromUserId.about}</p>
								</div>
							</div>
							<div className="mx-4 flex justify-end">
								<button
									className="btn btn-primary rounded-3xl mx-2"
									onClick={() =>
										reviewRequest("accepted", request._id)
									}
								>
									Accept
								</button>
								<button
									className="btn btn-secondary rounded-3xl mx-2"
									onClick={() =>
										reviewRequest("rejected", request._id)
									}
								>
									Reject
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
			<ToastContainer />
		</>
	);
};

export default Requests;
