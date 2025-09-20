import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../../../redux-slices/connectionsSlice";
import UserCard from "./UserCard";

const Connections = () => {
	const dispatch = useDispatch();
	const connections = useSelector((store) => store.connections);

	const fetchConnections = async () => {
		try {
			const res = await axios.get(BASE_URL + "/user/connections", {
				withCredentials: true,
			});
			dispatch(addConnections(res.data.data));
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (!connections) {
			fetchConnections();
		}
	}, []);

	if (!connections) return;

	if (connections.length === 0)
		return (
			<div className="flex flex-col justify-center items-center my-10">
				<h1 className="text-2xl font-bold mb-20">No Connections found</h1>
				<img
					className="w-[600px] h-[600px]"
					src="/empty.png"
					alt="empty"
				/>
			</div>
		);

	return (
		<>
			<div>
				<div className="flex justify-center items-center text-2xl font-bold my-6">
					<h1>Connections ({connections.length})</h1>
				</div>
				<div className="flex justify-center flex-wrap items-center gap-4">
					{connections &&
						connections.map((connection) => (
							<div key={connection._id} className="my-6">
								<div className="bg-base-300 w-96 rounded-lg py-3">
									<div className="avatar">
										<div className="ring-primary ring-offset-base-100 w-32 rounded-full ring ring-offset-2 m-4">
											<img src={connection.photoUrl} />
										</div>
									</div>
									<div className="ml-4 pb-2">
										<h2 className="text-2xl font-bold py-2">
											{connection.firstName +
												" " +
												connection.lastName}
										</h2>
										<p className="truncate" title={connection.about}>{connection.about}</p>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</>
	);
};

export default Connections;
