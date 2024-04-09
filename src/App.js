import { FullProfile, NavBar } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import { Dashboard, Home, Login, Logout, Staff } from "./pages";
import { Auth } from "./Auth";

const App = () => {
  
  return (
    <Auth>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/profile" element={<FullProfile />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </Auth>
  );
};
export default App;
