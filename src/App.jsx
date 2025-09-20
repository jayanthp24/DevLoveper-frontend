import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/modules/auth/Login";
import Feed from "./components/modules/user/Feed";
import Profile from "./components/modules/profile/Profile";
import Connections from "./components/modules/user/Connections";
import Requests from "./components/modules/user/Requests";
import Signup from "./components/modules/auth/Signup";

function App() {
	return (
		<>
			<BrowserRouter basename="/">
				<Routes>
					<Route path="/" element={<Body />}>
						<Route path="/login" element={<Login />}></Route>
						<Route path="/" element={<Feed />}></Route>
						<Route path="/profile" element={<Profile />}></Route>
						<Route path="/connections" element={<Connections />}></Route>
						<Route path="/requests" element={<Requests />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
