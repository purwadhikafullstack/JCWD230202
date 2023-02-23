import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import NavigationBar from "./components/navbar";
import Profile from "./pages/profile";

function App() {
	return (
		<>
			<NavigationBar />
			<div className="relative">
				<Routes>
					<Route path="/home" element={<LandingPage />} />
					<Route path="/profile" element={<Profile />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
