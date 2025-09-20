import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
	const userData = useSelector((store) => store.user);

	return (
		<>
			{userData && <EditProfile userData={userData}/>}
		</>
	);
};

export default Profile;
