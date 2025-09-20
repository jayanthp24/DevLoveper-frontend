import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../../redux-slices/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
	const feed = useSelector((store) => store.feed);
	const dispatch = useDispatch();

	const getFeed = async () => {
		if (feed) return;
		try {
			const res = await axios.get(BASE_URL + "/feed", {
				withCredentials: true,
			});
			dispatch(addFeed(res?.data.data));
		} catch (err) {}
	};

	useEffect(() => {
		getFeed();
	}, []);

	if(!feed) return;

	if (feed.length === 0)
		return (
			<div className="flex flex-col justify-center items-center my-10">
				<h1 className="text-2xl font-bold mb-20">Feed is empty.</h1>
				<img
					className="w-[600px] h-[600px]"
					src="/empty.png"
					alt="empty"
				/>
			</div>
		);

	return (
		<>
			<div className="flex flex-col justify-center items-center my-10">
				<h1 className="text-2xl font-bold">
					Welcome to 🫂Devlovepers. find your perfect match.
				</h1>
				{feed && (
					<div className="flex justify-center items-center mt-10">
						<UserCard user={feed[0]} preview={false}/>
					</div>
				)}
			</div>
		</>
	);
};

export default Feed;
